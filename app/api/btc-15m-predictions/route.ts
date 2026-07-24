import { NextResponse } from "next/server";
import {
  BtcPredictionRecord,
  calculateStats,
  readPredictions,
  savePrediction
} from "@/lib/btcPredictionStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toNumber(value: unknown) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

export async function GET() {
  const predictions = await readPredictions();

  return NextResponse.json({
    predictions,
    stats: calculateStats(predictions)
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<BtcPredictionRecord>;
  const initialPrice = toNumber(body.initialPrice);
  const currentPrice = toNumber(body.currentPrice);
  const yesPrice = toNumber(body.yesPrice);
  const noPrice = toNumber(body.noPrice);
  const estimatedYesProbability = toNumber(body.estimatedYesProbability);
  const impliedYesProbability = toNumber(body.impliedYesProbability);
  const modelEdge = toNumber(body.modelEdge);

  if (
    initialPrice === undefined ||
    currentPrice === undefined ||
    yesPrice === undefined ||
    noPrice === undefined ||
    estimatedYesProbability === undefined ||
    impliedYesProbability === undefined ||
    modelEdge === undefined ||
    !body.expiresAt ||
    !body.signal
  ) {
    return NextResponse.json({ error: "Invalid prediction payload." }, { status: 400 });
  }

  const record: BtcPredictionRecord = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    expiresAt: body.expiresAt,
    initialPrice,
    currentPrice,
    yesPrice,
    noPrice,
    indicators: body.indicators || {},
    estimatedYesProbability,
    impliedYesProbability,
    modelEdge,
    signal: body.signal,
    result: body.result || "pending"
  };

  await savePrediction(record);
  const predictions = await readPredictions();

  return NextResponse.json({ prediction: record, stats: calculateStats(predictions) });
}
