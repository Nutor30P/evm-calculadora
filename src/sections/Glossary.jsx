import React from "react";
import Section from "../components/Section";

const GROUPS = [
  {
    title: "Variables base",
    icon: "🧩",
    terms: [
      { abbr: "BAC", name: "Budget At Completion", text: "Presupuesto total aprobado para todo el proyecto.", kid: "Es como la mesada total que te dan para todo el trabajo, de principio a fin." },
      { abbr: "VP", name: "Valor Planificado", text: "Cuánto trabajo, en dinero, debería estar hecho a la fecha según el cronograma.", kid: "Lo que prometiste tener listo hoy, según el plan." },
      { abbr: "VG", name: "Valor Ganado", text: "Cuánto vale, en dinero de la línea base, el trabajo realmente terminado a la fecha.", kid: "Lo que en verdad ya construiste o terminaste hoy." },
      { abbr: "CR", name: "Costo Real", text: "Cuánto dinero se ha gastado de verdad a la fecha para producir ese trabajo.", kid: "El dinero que ya gastaste de verdad hasta hoy." },
      { abbr: "DTP", name: "Duración Total Planificada", text: "Meses (u otra unidad de tiempo) que se estimó que duraría todo el proyecto.", kid: "Cuántos meses tienes en total para terminar todo." },
      { abbr: "TT", name: "Tiempo Transcurrido", text: "Meses que ya pasaron desde el inicio del proyecto hasta la fecha de corte.", kid: "Cuántos meses ya pasaron desde que empezaste." },
    ],
  },
  {
    title: "Variaciones",
    icon: "⚖️",
    terms: [
      { abbr: "VC", name: "Variación del Costo", text: "VG − CR. Diferencia entre lo que vale el trabajo hecho y lo que costó producirlo.", kid: "¿Gastaste más o menos de lo que vale lo que hiciste?" },
      { abbr: "VS", name: "Variación del Cronograma", text: "VG − VP. Diferencia entre el trabajo hecho y el trabajo que debía estar hecho.", kid: "¿Vas más rápido o más lento de lo que prometiste?" },
    ],
  },
  {
    title: "Índices de desempeño",
    icon: "🚦",
    terms: [
      { abbr: "IDC", name: "Índice de Desempeño del Costo", text: "VG ÷ CR. Cuánto valor se genera por cada unidad monetaria gastada.", kid: "Por cada peso que gastas, ¿cuánto trabajo real estás logrando?" },
      { abbr: "IDS", name: "Índice de Desempeño del Cronograma", text: "VG ÷ VP. Qué tan cerca está el avance real del avance planificado.", kid: "¿Qué tan rápido vas, comparado con el plan?" },
      { abbr: "IDHC", name: "Índice de Desempeño Hasta la Conclusión", text: "(BAC − VG) ÷ (BAC − CR). Eficiencia que se necesita de ahora en adelante para cerrar dentro del BAC.", kid: "Qué tan bien tienes que hacerlo de ahora en adelante para no gastar de más." },
    ],
  },
  {
    title: "Pronósticos",
    icon: "🔮",
    terms: [
      { abbr: "ECC", name: "Estimado de Costo para Concluir", text: "BAC ÷ IDC. Costo total proyectado del proyecto si el desempeño de costo se mantiene.", kid: "Cuánto crees que costará todo al final, si sigues igual." },
      { abbr: "ETC", name: "Estimado de Tiempo para Concluir", text: "(DTP − TT) ÷ IDS. Tiempo adicional proyectado para terminar, dado el ritmo actual.", kid: "Cuánto tiempo extra crees que vas a necesitar." },
    ],
  },
];

export default function Glossary({ theme }) {
  return (
    <Section
      id="conceptos"
      theme={theme}
      tone="surface"
      icon="📖"
      kicker="Glosario"
      title="Las piezas del análisis"
      subtitle="Todo el modelo EVM se construye a partir de tres variables medidas en campo; el resto son combinaciones de ellas. Cada tarjeta incluye también la versión 'en simple'."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {GROUPS.map((group) => (
          <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 600,
                color: theme.textMuted,
                textTransform: "uppercase",
                letterSpacing: 0.4,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span aria-hidden="true">{group.icon}</span>
              {group.title}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 12,
              }}
            >
              {group.terms.map((term) => (
                <div
                  key={term.abbr}
                  className="evm-card-hover"
                  style={{
                    background: theme.page,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 10,
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: theme.seriesPlanned }}>{term.abbr}</span>
                    <span style={{ fontSize: 12.5, color: theme.textMuted }}>{term.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: theme.textSecondary, lineHeight: 1.5 }}>{term.text}</p>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      alignItems: "flex-start",
                      background: theme.seriesBlueBg,
                      borderRadius: 8,
                      padding: "8px 10px",
                    }}
                  >
                    <span style={{ fontSize: 13 }} aria-hidden="true">🧒</span>
                    <span style={{ fontSize: 12.5, color: theme.textPrimary, lineHeight: 1.45 }}>
                      <strong>En simple:</strong> {term.kid}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
