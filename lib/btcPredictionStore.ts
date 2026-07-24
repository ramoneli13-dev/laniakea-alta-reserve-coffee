import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type PredictionResult = "yes" | "no" | "pending";

export type BtcPredictionRecord = {
  id: string;
  timestamp: string;
  expiresAt: string;
  initialPrice: number;
  currentPrice: number;
  yesPrice: number;
  noPrice: number;
  indicators: Record<string, number>;
  estimatedYesProbability: number;
  impliedYesProbability: number;
  modelEdge: number;
  signal: "No entrar" | "Débil" | "Moderada" | "Fuerte";
  result: PredictionResult;
};

export type BtcPredictionStats = {
  total: number;
  resolved: number;
  wins: number;
  losses: number;
  accuracy: number;
  hypotheticalProfit: number;
  afterFeesProfit: number;
  maxDrawdown: number;
};

const DATABASE_DIR = path.join(process.cwd(), ".data");
const DATABASE_FILE = path.join(DATABASE_DIR, "btc-15m-predictions.json");
const FEE_RATE = 0.02;

export async function readPredictions() {
  try {
    const raw = await readFile(DATABASE_FILE, "utf8");
    return JSON.parse(raw) as BtcPredictionRecord[];
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function savePrediction(record: BtcPredictionRecord) {
  const predictions = await readPredictions();
  predictions.unshift(record);
  await mkdir(DATABASE_DIR, { recursive: true });
  await writeFile(DATABASE_FILE, JSON.stringify(predictions, null, 2));
  return record;
}

export function calculateStats(predictions: BtcPredictionRecord[]): BtcPredictionStats {
  const resolved = predictions.filter((prediction) => prediction.result !== "pending");
  let equity = 0;
  let peak = 0;
  let maxDrawdown = 0;
  let wins = 0;

  for (const prediction of resolved.toReversed()) {
    const predictedYes = prediction.estimatedYesProbability >= 0.5;
    const won =
      (predictedYes && prediction.result === "yes") || (!predictedYes && prediction.result === "no");
    const contractPrice = predictedYes ? prediction.yesPrice : prediction.noPrice;
    const gross = won ? 1 - contractPrice : -contractPrice;
    const net = gross - FEE_RATE;

    if (won) {
      wins += 1;
    }

    equity += net;
    peak = Math.max(peak, equity);
    maxDrawdown = Math.max(maxDrawdown, peak - equity);
  }

  const hypotheticalProfit = resolved.reduce((sum, prediction) => {
    const predictedYes = prediction.estimatedYesProbability >= 0.5;
    const won =
      (predictedYes && prediction.result === "yes") || (!predictedYes && prediction.result === "no");
    const contractPrice = predictedYes ? prediction.yesPrice : prediction.noPrice;
    return sum + (won ? 1 - contractPrice : -contractPrice);
  }, 0);

  return {
    total: predictions.length,
    resolved: resolved.length,
    wins,
    losses: resolved.length - wins,
    accuracy: resolved.length ? wins / resolved.length : 0,
    hypotheticalProfit,
    afterFeesProfit: equity,
    maxDrawdown
  };
}
