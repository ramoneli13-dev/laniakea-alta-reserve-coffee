import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>;
          volume?: Array<number | null>;
        }>;
      };
    }>;
  };
};

function getReturn(points: Array<{ time: number; price: number }>, minutes: number) {
  const latest = points.at(-1);
  const cutoff = Date.now() - minutes * 60_000;
  const start = points.find((point) => point.time >= cutoff) || points[0];

  if (!latest || !start) {
    return 0;
  }

  return (latest.price - start.price) / start.price;
}

function getVolatility(points: Array<{ time: number; price: number }>) {
  if (points.length < 3) {
    return 0;
  }

  const returns = points.slice(1).map((point, index) => Math.log(point.price / points[index].price));
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + (value - mean) ** 2, 0) / returns.length;

  return Math.sqrt(variance);
}

export async function GET() {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/CL=F?range=1d&interval=1m",
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "WTI Crude Oil price could not be retrieved." },
        { status: 502 }
      );
    }

    const data = (await response.json()) as YahooChartResponse;
    const result = data.chart?.result?.[0];
    const timestamps = result?.timestamp || [];
    const closes = result?.indicators?.quote?.[0]?.close || [];
    const points = timestamps
      .map((timestamp, index) => ({ time: timestamp * 1000, price: Number(closes[index]) }))
      .filter((point) => Number.isFinite(point.price));
    const latest = points.at(-1);

    return NextResponse.json({
      symbol: "CL=F",
      name: "WTI Crude Oil",
      price: latest?.price || 0,
      points,
      oneMinuteReturn: getReturn(points, 1),
      fiveMinuteReturn: getReturn(points, 5),
      fifteenMinuteReturn: getReturn(points, 15),
      percentChange: getReturn(points, 15),
      volatility: getVolatility(points),
      fetchedAt: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      { error: "WTI Crude Oil price provider is temporarily unavailable." },
      { status: 502 }
    );
  }
}
