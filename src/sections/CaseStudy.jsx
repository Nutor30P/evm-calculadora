import React from "react";
import Section from "../components/Section";
import { MetricCard, InterpretationBadge } from "../EVMCalculator";
import { computeEvm, buildInterpretation, fmtMoney, fmtIndex, fmtMonths } from "../evm";

const PROJECT = {
  name: "Construcción de un tramo vial de 5 km",
  bac: 500000000,
  vp: 250000000,
  vg: 200000000,
  cr: 230000000,
  dtp: 12,
  tt: 6,
};

const INPUT_CARDS = [
  { label: "BAC — presupuesto total", value: fmtMoney(PROJECT.bac), text: "Aprobado para las 5 km de vía." },
  { label: "Duración planificada", value: `${PROJECT.dtp} meses`, text: "Plazo contractual de la obra." },
  { label: "Corte de control", value: `Mes ${PROJECT.tt}`, text: "Mitad del plazo planificado." },
  { label: "VP — valor planificado", value: fmtMoney(PROJECT.vp), text: "Se esperaba tener el 50% del presupuesto ejecutado en trabajo." },
  { label: "VG — valor ganado", value: fmtMoney(PROJECT.vg), text: "El equipo de obra reporta solo un 40% de avance físico real." },
  { label: "CR — costo real", value: fmtMoney(PROJECT.cr), text: "Lo efectivamente pagado a la fecha a contratistas y proveedores." },
];

export default function CaseStudy({ theme }) {
  const results = computeEvm(PROJECT);
  const { vc, vs, idc, ids, idhc, ecc, etc } = results;
  const messages = buildInterpretation({ ...results, bac: PROJECT.bac, dtp: PROJECT.dtp, tt: PROJECT.tt });
  const remainingPlanned = PROJECT.dtp - PROJECT.tt;

  return (
    <Section
      id="caso-de-estudio"
      theme={theme}
      tone="surface"
      kicker="Caso de estudio guiado"
      title={PROJECT.name}
      subtitle="Un corte de control a mitad de obra revela una historia distinta a la que cuenta el presupuesto por sí solo."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: theme.textSecondary }}>
          1. Datos del corte de control
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          {INPUT_CARDS.map((card) => (
            <div
              key={card.label}
              style={{
                background: theme.page,
                border: `1px solid ${theme.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 12, color: theme.textMuted }}>{card.label}</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary }}>{card.value}</span>
              <span style={{ fontSize: 12.5, color: theme.textSecondary, lineHeight: 1.4 }}>{card.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: theme.textSecondary }}>
          2. Resultados del análisis
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
          }}
        >
          <MetricCard label="VC — Variación del costo" value={fmtMoney(vc)} tone={vc >= 0 ? "good" : "bad"} theme={theme} />
          <MetricCard label="VS — Variación del cronograma" value={fmtMoney(vs)} tone={vs >= 0 ? "good" : "bad"} theme={theme} />
          <MetricCard label="IDC — Índice de costo" value={fmtIndex(idc)} tone={idc >= 1 ? "good" : "bad"} theme={theme} />
          <MetricCard label="IDS — Índice de cronograma" value={fmtIndex(ids)} tone={ids >= 1 ? "good" : "bad"} theme={theme} />
          <MetricCard label="ECC — Costo estimado al cierre" value={fmtMoney(ecc)} tone={ecc <= PROJECT.bac ? "good" : "bad"} theme={theme} />
          <MetricCard label="ETC — Tiempo estimado restante" value={fmtMonths(etc)} tone={etc <= remainingPlanned ? "good" : "bad"} theme={theme} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: theme.textSecondary }}>
          3. Lectura de la gerencia
        </h3>
        {messages.map((m, i) => (
          <InterpretationBadge key={i} text={m.text} tone={m.tone} theme={theme} />
        ))}
      </div>

      <div
        style={{
          background: theme.criticalBg,
          border: `1px solid ${theme.critical}33`,
          borderRadius: 12,
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: theme.critical, textTransform: "uppercase", letterSpacing: 0.4 }}>
          4. Decisión sugerida
        </span>
        <p style={{ margin: 0, fontSize: 14.5, color: theme.textPrimary, lineHeight: 1.6 }}>
          El proyecto está simultáneamente atrasado (IDS {fmtIndex(ids)}) y sobrecostado (IDC {fmtIndex(idc)}):
          a mitad de plazo solo se ha completado el 40% del alcance, gastando ya el 46% del
          presupuesto. Si nada cambia, la obra costaría cerca de {fmtMoney(ecc)} (15% más del BAC)
          y terminaría {fmtMonths(etc)} después de la fecha planificada de cierre. Con este panorama, la
          gerencia debería auditar el rendimiento de los frentes de trabajo más lentos y renegociar
          el ritmo de facturación con los contratistas antes del siguiente corte, en vez de esperar
          a que la desviación crezca.
        </p>
      </div>
    </Section>
  );
}
