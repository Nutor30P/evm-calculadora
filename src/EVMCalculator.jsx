import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useColorScheme } from "./theme";
import Confetti from "./components/Confetti";
import {
  buildCurveData,
  buildInterpretation,
  computeEvm,
  fmtCompact,
  fmtIndex,
  fmtMoney,
  fmtMonths,
} from "./evm";

const FACE = { good: "🙂", neutral: "😐", bad: "🙁" };

// ---- Small presentational pieces -----------------------------------------
export function MetricCard({ label, value, tone, theme }) {
  const toneColor =
    tone === "good" ? theme.good : tone === "bad" ? theme.critical : theme.textPrimary;
  return (
    <div
      className="evm-card-hover"
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: 12, color: theme.textMuted, letterSpacing: 0.2, display: "flex", justifyContent: "space-between" }}>
        {label}
        <span aria-hidden="true">{FACE[tone] ?? FACE.neutral}</span>
      </span>
      <span style={{ fontSize: 22, fontWeight: 600, color: toneColor, lineHeight: 1.1 }}>
        {value}
      </span>
    </div>
  );
}

export function InterpretationBadge({ text, tone, theme }) {
  const bg = tone === "good" ? theme.goodBg : tone === "bad" ? theme.criticalBg : theme.neutralBg;
  const border = tone === "good" ? theme.good : tone === "bad" ? theme.critical : theme.neutralBorder;
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        background: bg,
        border: `1px solid ${border}33`,
        borderRadius: 8,
        padding: "10px 12px",
      }}
    >
      <span style={{ fontSize: 15 }} aria-hidden="true">{FACE[tone] ?? FACE.neutral}</span>
      <span style={{ fontSize: 14, color: theme.textPrimary, lineHeight: 1.4 }}>{text}</span>
    </div>
  );
}

function NumberField({ label, value, onChange, theme, step = "1" }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, color: theme.textSecondary }}>{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={onChange}
        style={{
          background: theme.surface,
          color: theme.textPrimary,
          border: `1px solid ${theme.border}`,
          borderRadius: 8,
          padding: "8px 10px",
          fontSize: 15,
          outline: "none",
        }}
      />
    </label>
  );
}

function ChartTooltip({ active, payload, label, theme }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 8,
        padding: "8px 10px",
        fontSize: 13,
        color: theme.textPrimary,
      }}
    >
      <div style={{ color: theme.textMuted, marginBottom: 4 }}>Mes {Number(label).toFixed(1)}</div>
      <div>Valor planificado acumulado: {fmtMoney(payload[0]?.value)}</div>
    </div>
  );
}

// ---- Main component --------------------------------------------------------
export default function EVMCalculator() {
  const [inputs, setInputs] = useState({
    bac: 1000000,
    vp: 300000,
    vg: 200000,
    cr: 250000,
    dtp: 10,
    tt: 3,
  });

  const { theme } = useColorScheme();

  const handleChange = (key) => (e) => {
    const raw = e.target.value;
    setInputs((prev) => ({ ...prev, [key]: raw === "" ? "" : Number(raw) }));
  };

  const numeric = useMemo(
    () => ({
      bac: Number(inputs.bac) || 0,
      vp: Number(inputs.vp) || 0,
      vg: Number(inputs.vg) || 0,
      cr: Number(inputs.cr) || 0,
      dtp: Number(inputs.dtp) || 0,
      tt: Number(inputs.tt) || 0,
    }),
    [inputs]
  );

  const results = useMemo(() => computeEvm(numeric), [numeric]);
  const curveData = useMemo(
    () => buildCurveData(numeric.bac, numeric.dtp),
    [numeric.bac, numeric.dtp]
  );

  const { vc, vs, idc, ids, idhc, ecc, etc } = results;
  const { bac, vp, vg, cr, dtp, tt } = numeric;

  const messages = useMemo(
    () => buildInterpretation({ vc, vs, idc, ids, idhc, ecc, etc, bac, dtp, tt }),
    [vc, vs, idc, ids, idhc, ecc, etc, bac, dtp, tt]
  );

  const remainingPlanned = dtp - tt;

  const isGreat = idc !== null && ids !== null && idc >= 1 && ids >= 1;
  const [burstKey, setBurstKey] = useState(0);
  const wasGreat = useRef(false);
  useEffect(() => {
    if (isGreat && !wasGreat.current) setBurstKey((k) => k + 1);
    wasGreat.current = isGreat;
  }, [isGreat]);

  return (
    <div
      style={{
        background: theme.page,
        color: theme.textPrimary,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        padding: 24,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div style={{ position: "relative" }}>
        {isGreat && <Confetti key={burstKey} />}
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          🧮 Calculadora de Gestión del Valor Ganado (EVM)
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: theme.textSecondary }}>
          Ingresa los parámetros del proyecto para ver variaciones, índices y pronósticos en tiempo real.
        </p>
        {isGreat && (
          <p style={{ margin: "6px 0 0", fontSize: 13, color: theme.good, fontWeight: 600 }}>
            🎉 ¡Este proyecto va muy bien: adelantado y dentro del presupuesto!
          </p>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        <NumberField label="BAC — presupuesto total" value={inputs.bac} onChange={handleChange("bac")} theme={theme} step="1000" />
        <NumberField label="VP — valor planificado a la fecha" value={inputs.vp} onChange={handleChange("vp")} theme={theme} step="1000" />
        <NumberField label="VG — valor ganado a la fecha" value={inputs.vg} onChange={handleChange("vg")} theme={theme} step="1000" />
        <NumberField label="CR — costo real a la fecha" value={inputs.cr} onChange={handleChange("cr")} theme={theme} step="1000" />
        <NumberField label="Duración total planificada (meses)" value={inputs.dtp} onChange={handleChange("dtp")} theme={theme} step="1" />
        <NumberField label="Tiempo transcurrido (meses)" value={inputs.tt} onChange={handleChange("tt")} theme={theme} step="1" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
        }}
      >
        <MetricCard label="VC — Variación del costo" value={fmtMoney(vc)} tone={vc >= 0 ? "good" : "bad"} theme={theme} />
        <MetricCard label="VS — Variación del cronograma" value={fmtMoney(vs)} tone={vs >= 0 ? "good" : "bad"} theme={theme} />
        <MetricCard label="IDC — Índice de desempeño de costo" value={fmtIndex(idc)} tone={idc === null ? "neutral" : idc >= 1 ? "good" : "bad"} theme={theme} />
        <MetricCard label="IDS — Índice de desempeño de cronograma" value={fmtIndex(ids)} tone={ids === null ? "neutral" : ids >= 1 ? "good" : "bad"} theme={theme} />
        <MetricCard label="ECC — Estimado de costo para concluir" value={fmtMoney(ecc)} tone={ecc === null ? "neutral" : ecc <= bac ? "good" : "bad"} theme={theme} />
        <MetricCard label="ETC — Estimado de tiempo para concluir" value={fmtMonths(etc)} tone={etc === null ? "neutral" : etc <= remainingPlanned ? "good" : "bad"} theme={theme} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: theme.textSecondary }}>
          Interpretación
        </h3>
        {messages.map((m, i) => (
          <InterpretationBadge key={i} text={m.text} tone={m.tone} theme={theme} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: theme.textSecondary }}>
          Curva S — valor acumulado
        </h3>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 13,
            color: theme.textSecondary,
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 2, background: theme.seriesPlanned, display: "inline-block" }} />
            Curva planificada (VP acumulado)
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: theme.good, display: "inline-block" }} />
            VG (valor ganado, mes {tt})
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: theme.critical, display: "inline-block" }} />
            CR (costo real, mes {tt})
          </span>
        </div>
        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer>
            <LineChart data={curveData} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid stroke={theme.grid} vertical={false} />
              <XAxis
                dataKey="month"
                type="number"
                domain={[0, dtp > 0 ? dtp : 1]}
                tickFormatter={(v) => v.toFixed(0)}
                stroke={theme.axis}
                tick={{ fill: theme.textMuted, fontSize: 12 }}
                label={{ value: "Meses", position: "insideBottom", offset: -6, fill: theme.textMuted, fontSize: 12 }}
              />
              <YAxis
                tickFormatter={fmtCompact}
                stroke={theme.axis}
                tick={{ fill: theme.textMuted, fontSize: 12 }}
                width={70}
              />
              <Tooltip content={<ChartTooltip theme={theme} />} />
              <Line
                type="monotone"
                dataKey="planned"
                name="Curva planificada"
                stroke={theme.seriesPlanned}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              <ReferenceDot
                x={tt}
                y={vg}
                r={6}
                fill={theme.good}
                stroke={theme.surface}
                strokeWidth={2}
                isFront
              />
              <ReferenceDot
                x={tt}
                y={cr}
                r={6}
                fill={theme.critical}
                stroke={theme.surface}
                strokeWidth={2}
                isFront
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
