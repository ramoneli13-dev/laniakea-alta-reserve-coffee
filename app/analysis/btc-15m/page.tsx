"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TradePoint = { time: number; price: number; size: number; side: string };
type PricePoint = { time: number; price: number };
type Signal = "No entrar" | "Débil" | "Moderada" | "Fuerte";
type PredictionResult = "pending" | "yes" | "no";

type PredictionRecord = {
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
  signal: Signal;
  result: PredictionResult;
};

type PredictionStats = {
  total: number;
  resolved: number;
  wins: number;
  losses: number;
  accuracy: number;
  hypotheticalProfit: number;
  afterFeesProfit: number;
  maxDrawdown: number;
};

const DEFAULT_STATS: PredictionStats = {
  total: 0,
  resolved: 0,
  wins: 0,
  losses: 0,
  accuracy: 0,
  hypotheticalProfit: 0,
  afterFeesProfit: 0,
  maxDrawdown: 0
};

function formatUsd(value: number) {
  return Number.isFinite(value)
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
    : "—";
}

function formatPercent(value: number) {
  return Number.isFinite(value) ? `${(value * 100).toFixed(2)}%` : "—";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getWindowReturn(points: PricePoint[], minutes: number, currentPrice: number) {
  const cutoff = Date.now() - minutes * 60_000;
  const start = points.find((point) => point.time >= cutoff) || points[0];

  if (!start || !currentPrice) {
    return 0;
  }

  return (currentPrice - start.price) / start.price;
}

function getVolatility(points: PricePoint[]) {
  if (points.length < 3) {
    return 0;
  }

  const returns = points.slice(1).map((point, index) => {
    const previous = points[index];
    return Math.log(point.price / previous.price);
  });
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + (value - mean) ** 2, 0) / returns.length;

  return Math.sqrt(variance);
}

function getTimeRemaining(expiresAt: string) {
  const expires = new Date(expiresAt).getTime();
  const remaining = expires - Date.now();

  if (!Number.isFinite(expires) || remaining <= 0) {
    return "Expired";
  }

  const minutes = Math.floor(remaining / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

function getSignal(edge: number, probability: number): Signal {
  if (edge < 0.03 || probability < 0.52) {
    return "No entrar";
  }

  if (edge < 0.06) {
    return "Débil";
  }

  if (edge < 0.1) {
    return "Moderada";
  }

  return "Fuerte";
}

export default function Btc15MinuteAnalysisPage() {
  const [connectionStatus, setConnectionStatus] = useState("Connecting");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [pricePoints, setPricePoints] = useState<PricePoint[]>([]);
  const [trades, setTrades] = useState<TradePoint[]>([]);
  const [bestBid, setBestBid] = useState(0);
  const [bestAsk, setBestAsk] = useState(0);
  const [bidDepth, setBidDepth] = useState(0);
  const [askDepth, setAskDepth] = useState(0);
  const [heartbeatAt, setHeartbeatAt] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [yesPrice, setYesPrice] = useState("0.50");
  const [noPrice, setNoPrice] = useState("0.50");
  const [result, setResult] = useState<PredictionResult>("pending");
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [stats, setStats] = useState<PredictionStats>(DEFAULT_STATS);
  const bookRef = useRef({ bids: new Map<number, number>(), asks: new Map<number, number>() });

  useEffect(() => {
    const socket = new WebSocket("wss://advanced-trade-ws.coinbase.com");
    const channels = ["ticker", "market_trades", "level2", "candles", "heartbeats"];

    socket.addEventListener("open", () => {
      setConnectionStatus("Live");
      for (const channel of channels) {
        socket.send(
          JSON.stringify({
            type: "subscribe",
            product_ids: channel === "heartbeats" ? undefined : ["BTC-USD"],
            channel
          })
        );
      }
    });

    socket.addEventListener("close", () => setConnectionStatus("Disconnected"));
    socket.addEventListener("error", () => setConnectionStatus("Error"));
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data as string) as {
        channel?: string;
        events?: Array<{
          tickers?: Array<{ price?: string }>;
          trades?: Array<{ price?: string; size?: string; side?: string }>;
          updates?: Array<{ price_level?: string; new_quantity?: string; side?: string }>;
          current_time?: string;
        }>;
      };
      const now = Date.now();

      if (message.channel === "heartbeats") {
        setHeartbeatAt(new Date().toLocaleTimeString());
      }

      for (const wsEvent of message.events || []) {
        for (const ticker of wsEvent.tickers || []) {
          const price = Number(ticker.price);

          if (Number.isFinite(price)) {
            setCurrentPrice(price);
            setPricePoints((points) => [...points, { time: now, price }].filter((p) => p.time > now - 16 * 60_000));
          }
        }

        for (const trade of wsEvent.trades || []) {
          const price = Number(trade.price);
          const size = Number(trade.size);

          if (Number.isFinite(price) && Number.isFinite(size)) {
            setTrades((items) =>
              [...items, { time: now, price, size, side: trade.side || "UNKNOWN" }].filter(
                (item) => item.time > now - 15 * 60_000
              )
            );
          }
        }

        for (const update of wsEvent.updates || []) {
          const price = Number(update.price_level);
          const quantity = Number(update.new_quantity);
          const side = update.side?.toLowerCase();

          if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
            continue;
          }

          const bookSide = side === "bid" ? bookRef.current.bids : bookRef.current.asks;

          if (quantity === 0) {
            bookSide.delete(price);
          } else {
            bookSide.set(price, quantity);
          }
        }
      }

      const bids = [...bookRef.current.bids.entries()].sort((a, b) => b[0] - a[0]).slice(0, 10);
      const asks = [...bookRef.current.asks.entries()].sort((a, b) => a[0] - b[0]).slice(0, 10);
      setBestBid(bids[0]?.[0] || 0);
      setBestAsk(asks[0]?.[0] || 0);
      setBidDepth(bids.reduce((sum, [, quantity]) => sum + quantity, 0));
      setAskDepth(asks.reduce((sum, [, quantity]) => sum + quantity, 0));
    });

    return () => socket.close();
  }, []);

  useEffect(() => {
    fetch("/api/btc-15m-predictions")
      .then((response) => response.json())
      .then((data: { predictions: PredictionRecord[]; stats: PredictionStats }) => {
        setPredictions(data.predictions || []);
        setStats(data.stats || DEFAULT_STATS);
      });
  }, []);

  const indicators = useMemo(() => {
    const startingPrice = Number(initialPrice) || currentPrice;
    const oneMinuteReturn = getWindowReturn(pricePoints, 1, currentPrice);
    const fiveMinuteReturn = getWindowReturn(pricePoints, 5, currentPrice);
    const fifteenMinuteReturn = getWindowReturn(pricePoints, 15, currentPrice);
    const returnFromStart = startingPrice ? (currentPrice - startingPrice) / startingPrice : 0;
    const volatility = getVolatility(pricePoints);
    const buyerVolume = trades.filter((trade) => trade.side === "BUY").reduce((sum, trade) => sum + trade.size, 0);
    const sellerVolume = trades.filter((trade) => trade.side === "SELL").reduce((sum, trade) => sum + trade.size, 0);
    const volumeImbalance = buyerVolume + sellerVolume ? (buyerVolume - sellerVolume) / (buyerVolume + sellerVolume) : 0;
    const bookImbalance = bidDepth + askDepth ? (bidDepth - askDepth) / (bidDepth + askDepth) : 0;
    const momentum = oneMinuteReturn * 0.45 + fiveMinuteReturn * 0.35 + fifteenMinuteReturn * 0.2;
    const impliedYesProbability = clamp(Number(yesPrice) / (Number(yesPrice) + Number(noPrice)), 0, 1) || 0.5;
    const score = returnFromStart * 9 + momentum * 22 + volumeImbalance * 0.15 + bookImbalance * 0.12 - volatility * 8;
    const estimatedYesProbability = clamp(0.5 + score, 0.05, 0.95);
    const modelEdge = estimatedYesProbability - impliedYesProbability;

    return {
      oneMinuteReturn,
      fiveMinuteReturn,
      fifteenMinuteReturn,
      returnFromStart,
      volatility,
      buyerVolume,
      sellerVolume,
      volumeImbalance,
      bookImbalance,
      momentum,
      impliedYesProbability,
      estimatedYesProbability,
      modelEdge,
      signal: getSignal(modelEdge, estimatedYesProbability)
    };
  }, [askDepth, bidDepth, currentPrice, initialPrice, noPrice, pricePoints, trades, yesPrice]);

  async function saveCurrentPrediction() {
    const response = await fetch("/api/btc-15m-predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expiresAt,
        initialPrice: Number(initialPrice),
        currentPrice,
        yesPrice: Number(yesPrice),
        noPrice: Number(noPrice),
        indicators,
        estimatedYesProbability: indicators.estimatedYesProbability,
        impliedYesProbability: indicators.impliedYesProbability,
        modelEdge: indicators.modelEdge,
        signal: indicators.signal,
        result
      })
    });
    const data = (await response.json()) as { prediction?: PredictionRecord; stats?: PredictionStats };

    if (data.prediction) {
      setPredictions((items) => [data.prediction as PredictionRecord, ...items]);
    }

    if (data.stats) {
      setStats(data.stats);
    }
  }

  const startingPrice = Number(initialPrice) || 0;
  const usdDifference = startingPrice ? currentPrice - startingPrice : 0;

  return (
    <main className="min-h-screen bg-coffee-black px-5 py-10 text-coffee-cream md:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">BTC 15m prediction market analysis</p>
        <h1 className="mt-4 max-w-5xl font-serif text-4xl leading-tight md:text-6xl">
          Señales informativas para mercados BTC de 15 minutos.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-coffee-cream/75">
          Este dashboard analiza Coinbase BTC-USD en tiempo real y registra predicciones para backtesting. No coloca órdenes, apuestas ni operaciones automáticamente.
        </p>
        <div className="mt-6 border border-coffee-gold/45 bg-coffee-espresso/70 p-4 text-sm leading-7 text-coffee-gold">
          Aviso: la resolución oficial de muchos contratos BTC usa CF Benchmarks BRTI y puede diferir del precio spot de Coinbase BTC-USD. Usa estas señales solo como información.
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 border border-coffee-gold/30 bg-coffee-espresso p-5 shadow-luxury">
          <h2 className="font-serif text-3xl">Contrato manual</h2>
          <label className="block text-sm uppercase tracking-[0.16em] text-coffee-gold">Precio inicial</label>
          <input value={initialPrice} onChange={(event) => setInitialPrice(event.target.value)} className="w-full bg-coffee-black px-4 py-3 text-coffee-cream" placeholder="Ej. 65000" />
          <label className="block text-sm uppercase tracking-[0.16em] text-coffee-gold">Expiración</label>
          <input type="datetime-local" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} className="w-full bg-coffee-black px-4 py-3 text-coffee-cream" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm uppercase tracking-[0.16em] text-coffee-gold">Precio Sí</label>
              <input value={yesPrice} onChange={(event) => setYesPrice(event.target.value)} className="w-full bg-coffee-black px-4 py-3 text-coffee-cream" />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-[0.16em] text-coffee-gold">Precio No</label>
              <input value={noPrice} onChange={(event) => setNoPrice(event.target.value)} className="w-full bg-coffee-black px-4 py-3 text-coffee-cream" />
            </div>
          </div>
          <label className="block text-sm uppercase tracking-[0.16em] text-coffee-gold">Resultado final para backtesting</label>
          <select value={result} onChange={(event) => setResult(event.target.value as PredictionResult)} className="w-full bg-coffee-black px-4 py-3 text-coffee-cream">
            <option value="pending">Pendiente</option>
            <option value="yes">Sí / Arriba</option>
            <option value="no">No / Abajo</option>
          </select>
          <button type="button" onClick={saveCurrentPrediction} className="min-h-12 w-full bg-coffee-gold px-5 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-coffee-cream">
            Guardar predicción
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ["Conexión", connectionStatus],
            ["Precio actual", formatUsd(currentPrice)],
            ["Precio inicial", startingPrice ? formatUsd(startingPrice) : "—"],
            ["Diferencia USD", formatUsd(usdDifference)],
            ["Diferencia %", formatPercent(indicators.returnFromStart)],
            ["Tiempo restante", getTimeRemaining(expiresAt)],
            ["Prob. Sí / Arriba", formatPercent(indicators.estimatedYesProbability)],
            ["Prob. implícita", formatPercent(indicators.impliedYesProbability)],
            ["Ventaja modelo", formatPercent(indicators.modelEdge)],
            ["Señal", indicators.signal],
            ["Best bid / ask", `${formatUsd(bestBid)} / ${formatUsd(bestAsk)}`],
            ["Heartbeat", heartbeatAt || "—"]
          ].map(([label, value]) => (
            <article key={label} className="border border-coffee-gold/25 bg-coffee-espresso/75 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-coffee-gold">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-coffee-parchment">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-3">
        {[
          ["Tendencia 1m", formatPercent(indicators.oneMinuteReturn)],
          ["Tendencia 5m", formatPercent(indicators.fiveMinuteReturn)],
          ["Tendencia 15m", formatPercent(indicators.fifteenMinuteReturn)],
          ["Volatilidad", indicators.volatility.toFixed(5)],
          ["Volumen comprador", indicators.buyerVolume.toFixed(4)],
          ["Volumen vendedor", indicators.sellerVolume.toFixed(4)],
          ["Momentum", indicators.momentum.toFixed(5)],
          ["Imbalance trades", formatPercent(indicators.volumeImbalance)],
          ["Imbalance libro", formatPercent(indicators.bookImbalance)]
        ].map(([label, value]) => (
          <article key={label} className="border border-coffee-gold/20 bg-coffee-black p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-coffee-gold">{label}</p>
            <p className="mt-2 text-xl text-coffee-cream">{value}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border border-coffee-gold/30 bg-coffee-espresso p-5">
          <h2 className="font-serif text-3xl">Backtesting</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <p>Total: {stats.total}</p>
            <p>Resueltas: {stats.resolved}</p>
            <p>Aciertos: {stats.wins}</p>
            <p>Fallos: {stats.losses}</p>
            <p>Accuracy: {formatPercent(stats.accuracy)}</p>
            <p>Beneficio hipotético: {stats.hypotheticalProfit.toFixed(3)}</p>
            <p>Después de comisiones: {stats.afterFeesProfit.toFixed(3)}</p>
            <p>Max drawdown: {stats.maxDrawdown.toFixed(3)}</p>
          </div>
        </div>

        <div className="overflow-hidden border border-coffee-gold/30 bg-coffee-espresso">
          <div className="border-b border-coffee-gold/20 p-5">
            <h2 className="font-serif text-3xl">Predicciones guardadas</h2>
          </div>
          <div className="max-h-[440px] overflow-auto">
            {predictions.map((prediction) => (
              <article key={prediction.id} className="border-b border-coffee-gold/15 p-5 text-sm leading-7">
                <p className="text-coffee-gold">{new Date(prediction.timestamp).toLocaleString()} · {prediction.signal}</p>
                <p>Prob. modelo: {formatPercent(prediction.estimatedYesProbability)} · Implícita: {formatPercent(prediction.impliedYesProbability)} · Edge: {formatPercent(prediction.modelEdge)}</p>
                <p>Inicial: {formatUsd(prediction.initialPrice)} · Actual: {formatUsd(prediction.currentPrice)} · Sí/No: {prediction.yesPrice.toFixed(2)} / {prediction.noPrice.toFixed(2)}</p>
                <p>Resultado: {prediction.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
