import React from "react";
import Section from "../components/Section";

const GROUPS = [
  {
    title: "Variables base",
    terms: [
      { abbr: "BAC", name: "Budget At Completion", text: "Presupuesto total aprobado para todo el proyecto." },
      { abbr: "VP", name: "Valor Planificado", text: "Cuánto trabajo, en dinero, debería estar hecho a la fecha según el cronograma." },
      { abbr: "VG", name: "Valor Ganado", text: "Cuánto vale, en dinero de la línea base, el trabajo realmente terminado a la fecha." },
      { abbr: "CR", name: "Costo Real", text: "Cuánto dinero se ha gastado de verdad a la fecha para producir ese trabajo." },
      { abbr: "DTP", name: "Duración Total Planificada", text: "Meses (u otra unidad de tiempo) que se estimó que duraría todo el proyecto." },
      { abbr: "TT", name: "Tiempo Transcurrido", text: "Meses que ya pasaron desde el inicio del proyecto hasta la fecha de corte." },
    ],
  },
  {
    title: "Variaciones",
    terms: [
      { abbr: "VC", name: "Variación del Costo", text: "VG − CR. Diferencia entre lo que vale el trabajo hecho y lo que costó producirlo." },
      { abbr: "VS", name: "Variación del Cronograma", text: "VG − VP. Diferencia entre el trabajo hecho y el trabajo que debía estar hecho." },
    ],
  },
  {
    title: "Índices de desempeño",
    terms: [
      { abbr: "IDC", name: "Índice de Desempeño del Costo", text: "VG ÷ CR. Cuánto valor se genera por cada unidad monetaria gastada." },
      { abbr: "IDS", name: "Índice de Desempeño del Cronograma", text: "VG ÷ VP. Qué tan cerca está el avance real del avance planificado." },
      { abbr: "IDHC", name: "Índice de Desempeño Hasta la Conclusión", text: "(BAC − VG) ÷ (BAC − CR). Eficiencia que se necesita de ahora en adelante para cerrar dentro del BAC." },
    ],
  },
  {
    title: "Pronósticos",
    terms: [
      { abbr: "ECC", name: "Estimado de Costo para Concluir", text: "BAC ÷ IDC. Costo total proyectado del proyecto si el desempeño de costo se mantiene." },
      { abbr: "ETC", name: "Estimado de Tiempo para Concluir", text: "(DTP − TT) ÷ IDS. Tiempo adicional proyectado para terminar, dado el ritmo actual." },
    ],
  },
];

export default function Glossary({ theme }) {
  return (
    <Section
      id="conceptos"
      theme={theme}
      tone="surface"
      kicker="Glosario"
      title="Las piezas del análisis"
      subtitle="Todo el modelo EVM se construye a partir de tres variables medidas en campo; el resto son combinaciones de ellas."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {GROUPS.map((group) => (
          <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
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
                  style={{
                    background: theme.page,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 10,
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: theme.seriesPlanned }}>{term.abbr}</span>
                    <span style={{ fontSize: 12.5, color: theme.textMuted }}>{term.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: theme.textSecondary, lineHeight: 1.5 }}>{term.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
