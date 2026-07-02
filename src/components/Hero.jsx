import React from "react";
import HeroIllustration from "./HeroIllustration";

const STATS = [
  {
    icon: "🧱",
    label: "3 variables base",
    value: "VP · VG · CR",
    text: "Valor planificado, valor ganado y costo real: la línea base de todo el análisis.",
  },
  {
    icon: "🔍",
    label: "Detecta desviaciones",
    value: "A tiempo",
    text: "Muestra si un proyecto está atrasado o sobrecostado antes de que sea irreversible.",
  },
  {
    icon: "🔮",
    label: "Proyecta el cierre",
    value: "ECC · ETC",
    text: "Estima cuánto costará realmente el proyecto y cuánto tiempo adicional tomará.",
  },
];

export default function Hero({ theme }) {
  return (
    <section id="top" style={{ background: theme.page, overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "56px 24px 56px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: theme.seriesPlanned,
            }}
          >
            🎓 Gerencia de proyectos · Aprende jugando
          </span>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.15 }}>
            Gestión del Valor Ganado (Earned Value Management)
          </h1>
          <p style={{ margin: 0, fontSize: 17, color: theme.textSecondary, lineHeight: 1.6 }}>
            Una metodología que integra alcance, tiempo y costo en un solo análisis, para
            responder la pregunta que el presupuesto por sí solo no puede contestar:
            <strong style={{ color: theme.textPrimary }}> ¿cuánto trabajo real se ha completado por lo que se ha gastado?</strong>
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
            <a
              href="#simulador"
              style={{
                background: theme.seriesPlanned,
                color: "#ffffff",
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: "none",
                padding: "11px 20px",
                borderRadius: 999,
              }}
            >
              🧩 Pruébalo jugando
            </a>
            <a
              href="#calculadora"
              style={{
                background: "transparent",
                color: theme.textPrimary,
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: "none",
                padding: "11px 20px",
                borderRadius: 999,
                border: `1px solid ${theme.border}`,
              }}
            >
              Ir a la calculadora →
            </a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <HeroIllustration theme={theme} />
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px 56px" }}>
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
              className="evm-card-hover"
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <span style={{ fontSize: 22 }} aria-hidden="true">{stat.icon}</span>
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
