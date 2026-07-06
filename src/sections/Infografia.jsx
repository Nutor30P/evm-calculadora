import React from "react";
import Section from "../components/Section";
import { computeEvm, fmtIndex, fmtMoney, fmtMonths } from "../evm";

const BENEFITS_TOP = [
  { icon: "🔍", text: "Detecta problemas temprano" },
  { icon: "🧩", text: "Integra alcance, tiempo y costo" },
  { icon: "📈", text: "Permite pronósticos confiables" },
  { icon: "✅", text: "Facilita decisiones informadas" },
];

const VARIABLES = [
  {
    abbr: "VP",
    name: "Valor Planificado",
    sub: "Planned Value",
    icon: "🗓️",
    tone: "blue",
    text: "Cuánto trabajo, en dinero, debería estar hecho a la fecha según el cronograma.",
    kid: "Lo que prometiste tener listo hoy, según el plan.",
  },
  {
    abbr: "VG",
    name: "Valor Ganado",
    sub: "Earned Value",
    icon: "🧱",
    tone: "good",
    text: "Cuánto vale, en dinero de la línea base, el trabajo realmente terminado a la fecha.",
    kid: "Lo que en verdad ya construiste o terminaste hoy.",
  },
  {
    abbr: "CR",
    name: "Costo Real",
    sub: "Actual Cost",
    icon: "💰",
    tone: "warning",
    text: "Cuánto dinero se ha gastado de verdad a la fecha para producir ese trabajo.",
    kid: "El dinero que ya gastaste de verdad hasta hoy.",
  },
];

const STEPS = [
  "Definir la línea base",
  "Medir en un corte de control",
  "Calcular variaciones e índices",
  "Pronosticar el cierre",
  "Decidir",
];

const QUICK_READ = [
  {
    abbr: "IDC",
    label: "Costo",
    formula: "VG ÷ CR",
    rows: [
      { cond: "> 1", tone: "good", text: "Gastas menos de lo esperado" },
      { cond: "= 1", tone: "neutral", text: "En presupuesto" },
      { cond: "< 1", tone: "bad", text: "Gastas más de lo esperado" },
    ],
  },
  {
    abbr: "IDS",
    label: "Cronograma",
    formula: "VG ÷ VP",
    rows: [
      { cond: "> 1", tone: "good", text: "Vas más rápido de lo planificado" },
      { cond: "= 1", tone: "neutral", text: "Vas según el plan" },
      { cond: "< 1", tone: "bad", text: "Vas más lento de lo planificado" },
    ],
  },
  {
    abbr: "VC",
    label: "Costo ($)",
    formula: "VG − CR",
    rows: [
      { cond: "> 0", tone: "good", text: "Hay ahorro" },
      { cond: "= 0", tone: "neutral", text: "En presupuesto" },
      { cond: "< 0", tone: "bad", text: "Hay sobrecosto" },
    ],
  },
  {
    abbr: "VS",
    label: "Cronograma ($)",
    formula: "VG − VP",
    rows: [
      { cond: "> 0", tone: "good", text: "Adelantado" },
      { cond: "= 0", tone: "neutral", text: "En el plan" },
      { cond: "< 0", tone: "bad", text: "Atrasado" },
    ],
  },
];

const WHY_EVM = [
  { icon: "👁️", title: "Visibilidad real", text: "Muestra el desempeño del trabajo realizado, no solo del dinero gastado." },
  { icon: "⚠️", title: "Detección temprana", text: "Identifica desviaciones y problemas antes de que sean críticos." },
  { icon: "✅", title: "Toma de decisiones", text: "Ofrece datos sólidos para decidir acciones correctivas a tiempo." },
  { icon: "📊", title: "Proyecciones confiables", text: "Permite estimar el costo y la fecha de cierre con más precisión." },
  { icon: "💬", title: "Comunicación clara", text: "Da un lenguaje común y sencillo para todos los involucrados." },
  { icon: "🔄", title: "Mejora continua", text: "Ayuda a aprender del desempeño para mejorar proyectos futuros." },
];

const EXAMPLE = { bac: 1000000, vp: 400000, vg: 500000, cr: 350000, dtp: 12, tt: 6 };

function toneColors(theme, tone) {
  if (tone === "blue") return { fg: theme.seriesPlanned, bg: theme.seriesBlueBg, border: theme.seriesPlanned };
  if (tone === "good") return { fg: theme.good, bg: theme.goodBg, border: theme.good };
  if (tone === "warning") return { fg: theme.warning, bg: theme.warningBg, border: theme.warning };
  if (tone === "bad") return { fg: theme.critical, bg: theme.criticalBg, border: theme.critical };
  return { fg: theme.textMuted, bg: theme.neutralBg, border: theme.neutralBorder };
}

function Pill({ children, theme }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 600,
        color: theme.textPrimary,
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 999,
        padding: "8px 14px",
      }}
    >
      {children}
    </span>
  );
}

export default function Infografia({ theme }) {
  const results = computeEvm(EXAMPLE);
  const { vc, vs, idc, ids, ecc, etc } = results;

  return (
    <Section
      id="infografia"
      theme={theme}
      icon="🗺️"
      kicker="En una imagen"
      title="La infografía completa del Valor Ganado"
      subtitle="Todo el análisis EVM resumido para repasar rápido, imprimir o compartir con tu equipo. Cada bloque se explica a fondo más abajo."
    >
      {/* Top benefit strip */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {BENEFITS_TOP.map((b) => (
          <Pill key={b.text} theme={theme}>
            <span aria-hidden="true">{b.icon}</span>
            {b.text}
          </Pill>
        ))}
      </div>

      {/* 3 base variables */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
          Las 3 variables base
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {VARIABLES.map((v) => {
            const c = toneColors(theme, v.tone);
            return (
              <div
                key={v.abbr}
                className="evm-card-hover"
                style={{
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderTop: `4px solid ${c.fg}`,
                  borderRadius: 12,
                  padding: "18px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontSize: 20,
                      width: 36,
                      height: 36,
                      minWidth: 36,
                      borderRadius: "50%",
                      background: c.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden="true"
                  >
                    {v.icon}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: c.fg }}>{v.abbr}</span>
                    <span style={{ fontSize: 12, color: theme.textMuted }}>{v.name} · {v.sub}</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: theme.textSecondary, lineHeight: 1.5 }}>{v.text}</p>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-start", background: c.bg, borderRadius: 8, padding: "8px 10px" }}>
                  <span style={{ fontSize: 13 }} aria-hidden="true">🧒</span>
                  <span style={{ fontSize: 12.5, color: theme.textPrimary, lineHeight: 1.45 }}>
                    <strong>En simple:</strong> {v.kid}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5 step process, compact */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
          El proceso EVM en 5 pasos
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {STEPS.map((step, i) => (
            <div
              key={step}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: theme.page,
                border: `1px solid ${theme.border}`,
                borderRadius: 999,
                padding: "8px 14px 8px 8px",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  minWidth: 22,
                  borderRadius: "50%",
                  background: theme.seriesPlanned,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 13.5, color: theme.textPrimary, fontWeight: 500 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick read cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
          Interpretación rápida
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
          {QUICK_READ.map((q) => (
            <div
              key={q.abbr}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: "16px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: theme.seriesPlanned }}>
                  {q.abbr} <span style={{ fontSize: 12, fontWeight: 400, color: theme.textMuted }}>({q.label})</span>
                </span>
                <span style={{ fontSize: 13, color: theme.textMuted, fontVariantNumeric: "tabular-nums" }}>{q.formula}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {q.rows.map((r) => {
                  const c = toneColors(theme, r.tone);
                  return (
                    <div key={r.cond} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
                      <span style={{ width: 8, height: 8, minWidth: 8, borderRadius: "50%", background: c.fg }} />
                      <span style={{ fontWeight: 700, color: theme.textPrimary, minWidth: 30, fontVariantNumeric: "tabular-nums" }}>{r.cond}</span>
                      <span style={{ color: theme.textSecondary }}>{r.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: theme.neutralBg,
            border: `1px solid ${theme.neutralBorder}33`,
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 13,
            color: theme.textPrimary,
          }}
        >
          <strong>Regla general:</strong> IDC e IDS &gt; 1 → vas bien 🙂 &nbsp;·&nbsp; = 1 → vas justo 😐 &nbsp;·&nbsp; &lt; 1 → atención 🙁
        </div>
      </div>

      {/* Quick worked example, matches the printed infographic */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
          Ejemplo rápido (corte actual)
        </h3>
        <div style={{ overflowX: "auto", border: `1px solid ${theme.border}`, borderRadius: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: theme.page, minWidth: 480 }}>
            <thead>
              <tr>
                {["BAC", "VP", "VG", "CR", "DTP", "TT"].map((h) => (
                  <th key={h} style={{ textAlign: "left", fontSize: 11.5, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", padding: "10px 14px", borderBottom: `1px solid ${theme.border}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 14px", fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{fmtMoney(EXAMPLE.bac)}</td>
                <td style={{ padding: "10px 14px", fontSize: 14, color: theme.textPrimary }}>{fmtMoney(EXAMPLE.vp)}</td>
                <td style={{ padding: "10px 14px", fontSize: 14, color: theme.textPrimary }}>{fmtMoney(EXAMPLE.vg)}</td>
                <td style={{ padding: "10px 14px", fontSize: 14, color: theme.textPrimary }}>{fmtMoney(EXAMPLE.cr)}</td>
                <td style={{ padding: "10px 14px", fontSize: 14, color: theme.textPrimary }}>{EXAMPLE.dtp} meses</td>
                <td style={{ padding: "10px 14px", fontSize: 14, color: theme.textPrimary }}>{EXAMPLE.tt} meses</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          {[
            { label: "VC", value: fmtMoney(vc), tone: vc >= 0 ? "good" : "bad" },
            { label: "VS", value: fmtMoney(vs), tone: vs >= 0 ? "good" : "bad" },
            { label: "IDC", value: fmtIndex(idc), tone: idc >= 1 ? "good" : "bad" },
            { label: "IDS", value: fmtIndex(ids), tone: ids >= 1 ? "good" : "bad" },
            { label: "ECC", value: fmtMoney(ecc), tone: ecc <= EXAMPLE.bac ? "good" : "bad" },
            { label: "ETC", value: fmtMonths(etc), tone: etc <= EXAMPLE.dtp - EXAMPLE.tt ? "good" : "bad" },
          ].map((m) => {
            const c = toneColors(theme, m.tone);
            return (
              <div key={m.label} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 11.5, color: theme.textMuted, textTransform: "uppercase" }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: c.fg }}>{m.value}</div>
              </div>
            );
          })}
        </div>
        <p style={{ margin: 0, fontSize: 13.5, color: theme.textSecondary, lineHeight: 1.6 }}>
          <strong>Lectura:</strong> el proyecto va bien — se ha hecho más trabajo del planeado (adelantado)
          y se ha gastado menos de lo que vale ese trabajo (ahorro). Si se mantiene este desempeño,
          terminará por debajo del presupuesto y antes del tiempo planificado.
        </p>
      </div>

      {/* Why use EVM */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
          ¿Por qué usar EVM?
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {WHY_EVM.map((w) => (
            <div
              key={w.title}
              className="evm-card-hover"
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: "16px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 22 }} aria-hidden="true">{w.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{w.title}</span>
              <span style={{ fontSize: 12.5, color: theme.textSecondary, lineHeight: 1.5 }}>{w.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Closing banner */}
      <div
        style={{
          background: theme.seriesBlueBg,
          border: `1px solid ${theme.seriesPlanned}33`,
          borderRadius: 12,
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: theme.textPrimary }}>
          En resumen: EVM no es solo números, es tomar mejores decisiones basadas en la realidad del proyecto.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center", fontSize: 13.5, fontWeight: 600, color: theme.seriesPlanned }}>
          <span>🔍 Medir</span>
          <span aria-hidden="true">→</span>
          <span>📊 Analizar</span>
          <span aria-hidden="true">→</span>
          <span>🔮 Predecir</span>
          <span aria-hidden="true">→</span>
          <span>🎯 Decidir</span>
          <span aria-hidden="true">→</span>
          <span>🚀 Mejorar</span>
        </div>
      </div>

      <a
        href={`${import.meta.env.BASE_URL}assets/infografia-evm.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13.5,
          fontWeight: 600,
          color: theme.seriesPlanned,
          textDecoration: "none",
          border: `1px solid ${theme.border}`,
          borderRadius: 999,
          padding: "9px 16px",
        }}
      >
        📄 Ver / descargar la infografía original en PDF
      </a>
    </Section>
  );
}
