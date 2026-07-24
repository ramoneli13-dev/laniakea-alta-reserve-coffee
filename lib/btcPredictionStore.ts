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
  wti: {
    price: number;
    oneMinuteReturn: number;
    fiveMinuteReturn: number;
    fifteenMinuteReturn: number;
    percentChange: number;
    volatility: number;
    weight: number;
    correlation: number;
  };
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
  wtiWeight: number;
  wtiImprovesAccuracy: boolean;
};

const DATABASE_DIR = path.join(process.cwd(), ".data");
const DATABASE_FILE = path.join(DATABASE_DIR, "btc-15m-predictions.json");
const FEE_RATE = 0.02;
const DEFAULT_WTI_WEIGHT = 0.08;
const HIGH_WTI_WEIGHT = 0.18;
const LOW_WTI_WEIGHT = 0.04;

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

export function getAdaptiveWtiWeight(predictions: BtcPredictionRecord[]) {
  const resolvedWithWti = predictions.filter(
    (prediction) => prediction.result !== "pending" && prediction.wti
  );

  if (resolvedWithWti.length < 10) {
    return { wtiWeight: DEFAULT_WTI_WEIGHT, wtiImprovesAccuracy: false };
  }

  const baseWins = resolvedWithWti.filter((prediction) => {
    const predictedYes = prediction.estimatedYesProbability >= 0.5;
    return (predictedYes && prediction.result === "yes") || (!predictedYes && prediction.result === "no");
  }).length;
  const wtiWins = resolvedWithWti.filter((prediction) => {
    const wtiBullish = prediction.wti.fifteenMinuteReturn >= 0;
    return (wtiBullish && prediction.result === "yes") || (!wtiBullish && prediction.result === "no");
  }).length;
  const wtiImprovesAccuracy = wtiWins / resolvedWithWti.length > baseWins / resolvedWithWti.length;

  return {
    wtiWeight: wtiImprovesAccuracy ? HIGH_WTI_WEIGHT : LOW_WTI_WEIGHT,
    wtiImprovesAccuracy
  };
}

export function calculateStats(predictions: BtcPredictionRecord[]): BtcPredictionStats {
  const resolved = predictions.filter((prediction) => prediction.result !== "pending");
  const { wtiWeight, wtiImprovesAccuracy } = getAdaptiveWtiWeight(predictions);
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
    maxDrawdown,
    wtiWeight,
    wtiImprovesAccuracy
  };
}
