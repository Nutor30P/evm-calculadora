import React from "react";
import Section from "../components/Section";

const ROWS = [
  { indicator: "VC", condition: "> 0", tone: "good", label: "Favorable", text: "El trabajo entregado vale más de lo que costó (subejecución de costo)." },
  { indicator: "VC", condition: "= 0", tone: "neutral", label: "En línea", text: "El costo real coincide exactamente con el valor del trabajo entregado." },
  { indicator: "VC", condition: "< 0", tone: "bad", label: "Desfavorable", text: "El proyecto gastó más de lo que vale el trabajo entregado (sobrecosto)." },
  { indicator: "VS", condition: "> 0", tone: "good", label: "Favorable", text: "El proyecto va adelantado respecto al cronograma planificado." },
  { indicator: "VS", condition: "= 0", tone: "neutral", label: "En línea", text: "El avance real coincide exactamente con lo planificado." },
  { indicator: "VS", condition: "< 0", tone: "bad", label: "Desfavorable", text: "El proyecto va atrasado respecto al cronograma planificado." },
  { indicator: "IDC", condition: "> 1", tone: "good", label: "Eficiente", text: "Cada unidad monetaria gastada genera más de una unidad de valor." },
  { indicator: "IDC", condition: "= 1", tone: "neutral", label: "En presupuesto", text: "El proyecto rinde exactamente lo esperado por cada peso gastado." },
  { indicator: "IDC", condition: "< 1", tone: "bad", label: "Ineficiente", text: "Cada unidad monetaria gastada genera menos de una unidad de valor." },
  { indicator: "IDS", condition: "> 1", tone: "good", label: "Adelantado", text: "El ritmo de avance real supera al ritmo planificado." },
  { indicator: "IDS", condition: "= 1", tone: "neutral", label: "A tiempo", text: "El ritmo de avance real iguala al ritmo planificado." },
  { indicator: "IDS", condition: "< 1", tone: "bad", label: "Atrasado", text: "El ritmo de avance real es más lento que el planificado." },
];

function ToneDot({ tone, theme }) {
  const color = tone === "good" ? theme.good : tone === "bad" ? theme.critical : theme.textMuted;
  return <span style={{ width: 8, height: 8, minWidth: 8, borderRadius: "50%", background: color, display: "inline-block" }} />;
}

export default function Interpretation({ theme }) {
  return (
    <Section
      id="interpretacion"
      theme={theme}
      tone="surface"
      kicker="Interpretación"
      title="Qué significa cada resultado"
      subtitle="La misma regla aplica siempre: valores por encima de la referencia (0 o 1) son favorables; por debajo, desfavorables."
    >
      <div style={{ overflowX: "auto", border: `1px solid ${theme.border}`, borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: theme.page }}>
          <thead>
            <tr>
              {["Indicador", "Condición", "Lectura", "Significado"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    padding: "12px 16px",
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={`${row.indicator}-${row.condition}`} style={{ background: i % 2 === 1 ? theme.surface : "transparent" }}>
                <td style={{ padding: "10px 16px", fontSize: 14, fontWeight: 700, color: theme.seriesPlanned, borderBottom: `1px solid ${theme.border}` }}>
                  {row.indicator}
                </td>
                <td style={{ padding: "10px 16px", fontSize: 14, color: theme.textPrimary, fontVariantNumeric: "tabular-nums", borderBottom: `1px solid ${theme.border}` }}>
                  {row.condition}
                </td>
                <td style={{ padding: "10px 16px", fontSize: 14, color: theme.textPrimary, borderBottom: `1px solid ${theme.border}` }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ToneDot tone={row.tone} theme={theme} />
                    {row.label}
                  </span>
                </td>
                <td style={{ padding: "10px 16px", fontSize: 13.5, color: theme.textSecondary, lineHeight: 1.5, borderBottom: `1px solid ${theme.border}` }}>
                  {row.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
