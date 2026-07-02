import React from "react";
import Section from "../components/Section";

const GROUPS = [
  {
    title: "Variaciones",
    cards: [
      { abbr: "VC", formula: "VG − CR", meaning: "Positiva: gastaste menos de lo que vale el trabajo hecho. Negativa: sobrecosto." },
      { abbr: "VS", formula: "VG − VP", meaning: "Positiva: vas adelantado. Negativa: vas atrasado respecto al plan." },
    ],
  },
  {
    title: "Índices de desempeño",
    cards: [
      { abbr: "IDC", formula: "VG ÷ CR", meaning: "Mayor a 1: eficiente en costo. Menor a 1: cada peso gastado rinde menos de lo esperado." },
      { abbr: "IDS", formula: "VG ÷ VP", meaning: "Mayor a 1: adelantado en cronograma. Menor a 1: atrasado en cronograma." },
      { abbr: "IDHC", formula: "(BAC − VG) ÷ (BAC − CR)", meaning: "Eficiencia necesaria de aquí en adelante para cerrar dentro del presupuesto." },
    ],
  },
  {
    title: "Pronósticos",
    cards: [
      { abbr: "ECC", formula: "BAC ÷ IDC", meaning: "Costo final proyectado si el ritmo de gasto actual se mantiene." },
      { abbr: "ETC", formula: "(DTP − TT) ÷ IDS", meaning: "Tiempo adicional proyectado para terminar, al ritmo actual." },
    ],
  },
];

export default function Formulas({ theme }) {
  return (
    <Section
      id="formulas"
      theme={theme}
      kicker="Fórmulas"
      title="Cómo se calcula cada indicador"
      subtitle="Todas se derivan de las tres variables base (VP, VG, CR) y de la línea base del proyecto (BAC, DTP, TT)."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {GROUPS.map((group) => (
          <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
              {group.title}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 14,
              }}
            >
              {group.cards.map((card) => (
                <div
                  key={card.abbr}
                  style={{
                    background: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 12,
                    padding: "18px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: theme.seriesPlanned, letterSpacing: 0.4 }}>
                    {card.abbr}
                  </span>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: theme.textPrimary,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {card.formula}
                  </span>
                  <p style={{ margin: 0, fontSize: 13.5, color: theme.textSecondary, lineHeight: 1.5 }}>{card.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
