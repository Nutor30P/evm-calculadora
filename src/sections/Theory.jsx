import React from "react";
import Section from "../components/Section";

const STEPS = [
  {
    n: "01",
    title: "Definir la línea base",
    text: "Se fija el presupuesto total (BAC) y el cronograma planificado, repartiendo el valor del proyecto en el tiempo.",
  },
  {
    n: "02",
    title: "Medir en un corte de control",
    text: "En una fecha dada se registran tres cifras: cuánto se planeó gastar (VP), cuánto vale el trabajo realmente hecho (VG) y cuánto se gastó de verdad (CR).",
  },
  {
    n: "03",
    title: "Calcular variaciones e índices",
    text: "Comparando VP, VG y CR entre sí se obtienen variaciones (VC, VS) e índices de eficiencia (IDC, IDS).",
  },
  {
    n: "04",
    title: "Pronosticar el cierre",
    text: "Con el desempeño actual se proyecta cuánto costará terminar el proyecto (ECC) y cuánto tiempo adicional tomará (ETC).",
  },
  {
    n: "05",
    title: "Decidir",
    text: "El equipo de gerencia usa esas cifras para decidir si continúa igual, corrige el rumbo o escala el problema.",
  },
];

export default function Theory({ theme }) {
  return (
    <Section
      id="introduccion"
      theme={theme}
      icon="🧠"
      kicker="¿Qué problema resuelve?"
      title="El presupuesto solo no dice si el proyecto va bien"
      subtitle="Comparar lo gastado contra lo presupuestado ignora una pregunta clave: ¿cuánto trabajo se completó realmente con ese dinero?"
    >
      <div
        style={{
          background: theme.neutralBg,
          border: `1px solid ${theme.neutralBorder}33`,
          borderRadius: 12,
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: theme.seriesPlanned, textTransform: "uppercase", letterSpacing: 0.4 }}>
          Ejemplo del problema clásico
        </span>
        <p style={{ margin: 0, fontSize: 15, color: theme.textPrimary, lineHeight: 1.65 }}>
          Un proyecto puede haber gastado exactamente lo presupuestado a la fecha (Costo Real =
          Valor Planificado) y aun así estar gravemente atrasado, si el trabajo realmente
          completado (Valor Ganado) es mucho menor de lo esperado. El seguimiento tradicional
          de "gastado vs. presupuestado" no puede ver esa diferencia — el EVM sí, porque
          introduce una tercera variable: <strong>cuánto vale, en términos del presupuesto original, el
          trabajo que ya está terminado.</strong>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {STEPS.map((step) => (
          <div
            key={step.n}
            style={{
              display: "flex",
              gap: 18,
              alignItems: "flex-start",
              padding: "4px 0",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: theme.textMuted,
                minWidth: 28,
                paddingTop: 2,
              }}
            >
              {step.n}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 15.5, fontWeight: 600, color: theme.textPrimary }}>{step.title}</span>
              <span style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.55 }}>{step.text}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
