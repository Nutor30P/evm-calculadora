import React from "react";

const STATS = [
  {
    label: "3 variables base",
    value: "VP · VG · CR",
    text: "Valor planificado, valor ganado y costo real: la línea base de todo el análisis.",
  },
  {
    label: "Detecta desviaciones",
    value: "A tiempo",
    text: "Muestra si un proyecto está atrasado o sobrecostado antes de que sea irreversible.",
  },
  {
    label: "Proyecta el cierre",
    value: "ECC · ETC",
    text: "Estima cuánto costará realmente el proyecto y cuánto tiempo adicional tomará.",
  },
];

export default function Hero({ theme }) {
  return (
    <section id="top" style={{ background: theme.page }}>
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "72px 24px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: theme.seriesPlanned,
            }}
          >
            Gerencia de proyectos · Material didáctico
          </span>
          <h1 style={{ margin: 0, fontSize: 42, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.15 }}>
            Gestión del Valor Ganado (Earned Value Management)
          </h1>
          <p style={{ margin: 0, fontSize: 17, color: theme.textSecondary, lineHeight: 1.6 }}>
            Una metodología que integra alcance, tiempo y costo en un solo análisis, para
            responder la pregunta que el presupuesto por sí solo no puede contestar:
            <strong style={{ color: theme.textPrimary }}> ¿cuánto trabajo real se ha completado por lo que se ha gastado?</strong>
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 12, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
                {stat.label}
              </span>
              <span style={{ fontSize: 22, fontWeight: 700, color: theme.seriesPlanned }}>{stat.value}</span>
              <span style={{ fontSize: 13.5, color: theme.textSecondary, lineHeight: 1.5 }}>{stat.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
