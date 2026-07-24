import { createPrivateKey, randomBytes, sign } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COINBASE_API_HOST = "api.coinbase.com";
const COINBASE_ACCOUNTS_PATH = "/api/v3/brokerage/accounts";
const MAX_PAGES = 20;
const PAGE_LIMIT = 250;

type CoinbaseAccount = {
  uuid?: string;
  name?: string;
  currency?: string;
  available_balance?: CoinbaseMoney;
  hold?: CoinbaseMoney;
  default?: boolean;
  active?: boolean;
  type?: string;
  ready?: boolean;
};

type CoinbaseMoney = {
  value?: string;
  currency?: string;
};

type CoinbaseAccountsResponse = {
  accounts?: CoinbaseAccount[];
  has_next?: boolean;
  cursor?: string;
};

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n").trim();
}

function derToJoseSignature(signature: Buffer) {
  let offset = 0;

  if (signature[offset++] !== 0x30) {
    throw new Error("Invalid ECDSA signature format.");
  }

  const sequenceLength = signature[offset++];

  if (sequenceLength + 2 !== signature.length) {
    throw new Error("Invalid ECDSA signature length.");
  }

  if (signature[offset++] !== 0x02) {
    throw new Error("Invalid ECDSA signature integer.");
  }

  const rLength = signature[offset++];
  const r = signature.subarray(offset, offset + rLength);
  offset += rLength;

  if (signature[offset++] !== 0x02) {
    throw new Error("Invalid ECDSA signature integer.");
  }

  const sLength = signature[offset++];
  const s = signature.subarray(offset, offset + sLength);

  return Buffer.concat([normalizeInteger(r), normalizeInteger(s)]);
}

function normalizeInteger(integer: Buffer) {
  const positiveInteger = integer[0] === 0 ? integer.subarray(1) : integer;

  if (positiveInteger.length > 32) {
    return positiveInteger.subarray(positiveInteger.length - 32);
  }

  if (positiveInteger.length < 32) {
    return Buffer.concat([Buffer.alloc(32 - positiveInteger.length), positiveInteger]);
  }

  return positiveInteger;
}

function createCoinbaseJwt(method: string, requestPath: string) {
  const keyName = process.env.COINBASE_ADVANCED_API_KEY;
  const privateKey = process.env.COINBASE_ADVANCED_PRIVATE_KEY;

  if (!keyName || !privateKey) {
    throw new Error(
      "Coinbase Advanced API is not configured. Add COINBASE_ADVANCED_API_KEY and COINBASE_ADVANCED_PRIVATE_KEY."
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const uri = `${method.toUpperCase()} ${COINBASE_API_HOST}${requestPath}`;
  const header = {
    alg: "ES256",
    kid: keyName,
    nonce: randomBytes(16).toString("hex"),
    typ: "JWT"
  };
  const payload = {
    exp: now + 120,
    iat: now,
    iss: "cdp",
    nbf: now,
    sub: keyName,
    uri
  };
  const tokenBody = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(payload)
  )}`;
  const keyObject = createPrivateKey(normalizePrivateKey(privateKey));
  const derSignature = sign("SHA256", Buffer.from(tokenBody), keyObject);
  const joseSignature = derToJoseSignature(derSignature);

  return `${tokenBody}.${base64UrlEncode(joseSignature)}`;
}

function getBearerToken(requestPath: string) {
  return createCoinbaseJwt("GET", requestPath);
}

function getSafeAccount(account: CoinbaseAccount) {
  return {
    uuid: account.uuid,
    name: account.name,
    currency: account.currency,
    availableBalance: account.available_balance,
    hold: account.hold,
    default: account.default,
    active: account.active,
    type: account.type,
    ready: account.ready
  };
}

async function fetchCoinbaseAccounts() {
  const accounts: CoinbaseAccount[] = [];
  let cursor: string | undefined;
  let page = 0;

  do {
    const query = new URLSearchParams({ limit: String(PAGE_LIMIT) });

    if (cursor) {
      query.set("cursor", cursor);
    }

    const requestPath = `${COINBASE_ACCOUNTS_PATH}?${query.toString()}`;
    const response = await fetch(`https://${COINBASE_API_HOST}${requestPath}`, {
      headers: {
        Authorization: `Bearer ${getBearerToken(requestPath)}`,
        "Content-Type": "application/json"
      },
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Coinbase balances request failed with status ${response.status}: ${errorBody}`
      );
    }

    const data = (await response.json()) as CoinbaseAccountsResponse;
    accounts.push(...(data.accounts || []));
    cursor = data.has_next ? data.cursor : undefined;
    page += 1;
  } while (cursor && page < MAX_PAGES);

  return accounts;
}

function isAuthorized(request: NextRequest) {
  const accessToken = process.env.COINBASE_BALANCES_ACCESS_TOKEN;

  if (!accessToken) {
    return true;
  }

  return request.headers.get("authorization") === `Bearer ${accessToken}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const accounts = await fetchCoinbaseAccounts();

    return NextResponse.json({
      accounts: accounts.map(getSafeAccount),
      count: accounts.length,
      fetchedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Coinbase balances error", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message.includes("not configured")
            ? error.message
            : "Coinbase balances could not be retrieved."
      },
      { status: 500 }
    );
  }
}
