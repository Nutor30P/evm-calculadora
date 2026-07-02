import React, { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import SegmentedBar from "../components/SegmentedBar";
import Confetti from "../components/Confetti";
import { safeDiv, fmtIndex } from "../evm";

function Slider({ label, emoji, value, onChange, max = 100, theme, accent }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13.5, color: theme.textSecondary, display: "flex", justifyContent: "space-between" }}>
        <span>{emoji} {label}</span>
        <strong style={{ color: theme.textPrimary }}>{value}%</strong>
      </span>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: accent, width: "100%", height: 22 }}
      />
    </label>
  );
}

export default function KidsSimulator({ theme }) {
  const [plan, setPlan] = useState(50);
  const [avance, setAvance] = useState(35);
  const [gasto, setGasto] = useState(55);

  const scheduleDiff = avance - plan;
  const costDiff = avance - gasto;
  const isGreat = scheduleDiff >= 0 && costDiff >= 0;

  const [burstKey, setBurstKey] = useState(0);
  const wasGreat = useRef(false);
  useEffect(() => {
    if (isGreat && !wasGreat.current) setBurstKey((k) => k + 1);
    wasGreat.current = isGreat;
  }, [isGreat]);

  let reaction;
  if (scheduleDiff >= 0 && costDiff >= 0) {
    reaction = { emoji: "🤩", text: "¡Genial! Vas más rápido de lo prometido y no estás gastando de más." };
  } else if (scheduleDiff < 0 && costDiff >= 0) {
    reaction = { emoji: "😅", text: "Vas un poco atrasado con la construcción, pero al menos no gastas de más. ¡Se puede recuperar el tiempo!" };
  } else if (scheduleDiff >= 0 && costDiff < 0) {
    reaction = { emoji: "😬", text: "Vas rápido construyendo, pero estás gastando más dinero del que deberías." };
  } else {
    reaction = { emoji: "😢", text: "Cuidado: vas atrasado con la construcción Y estás gastando más de lo que vale lo que llevas hecho." };
  }

  const idsApprox = safeDiv(avance, plan);
  const idcApprox = safeDiv(avance, gasto);

  return (
    <Section
      id="simulador"
      theme={theme}
      icon="🧱"
      kicker="Aprende jugando"
      title="Construye la pared y descubre si vas bien"
      subtitle="Mueve las tres barritas como si estuvieras construyendo una pared de bloques. Nosotros te decimos si vas bien, atrasado o gastando de más — sin fórmulas, solo mirando los bloques."
    >
      <div
        style={{
          background: theme.surface,
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: "24px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          <Slider label="Lo que prometiste hacer hoy" emoji="📋" value={plan} onChange={setPlan} theme={theme} accent={theme.seriesPlanned} />
          <Slider label="Lo que en verdad hiciste" emoji="🧱" value={avance} onChange={setAvance} theme={theme} accent={theme.good} />
          <Slider label="Lo que gastaste" emoji="💰" value={gasto} onChange={setGasto} max={150} theme={theme} accent={theme.critical} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <SegmentedBar
            label="📋 Plan de hoy"
            valueLabel={`${plan}%`}
            percent={plan}
            color={theme.seriesPlanned}
            theme={theme}
          />
          <SegmentedBar
            label="🧱 Pared que realmente construiste"
            valueLabel={`${avance}%`}
            percent={avance}
            markerPercent={plan}
            color={scheduleDiff >= 0 ? theme.good : theme.critical}
            theme={theme}
          />
          <SegmentedBar
            label="💰 Dinero que gastaste"
            valueLabel={`${gasto}%`}
            percent={gasto}
            markerPercent={avance}
            color={costDiff >= 0 ? theme.good : theme.critical}
            theme={theme}
          />
          <span style={{ fontSize: 12, color: theme.textMuted }}>
            🚩 La banderita marca la barra anterior, para que compares de un vistazo.
          </span>
        </div>

        <div
          key={burstKey}
          style={{
            position: "relative",
            background: isGreat ? theme.goodBg : scheduleDiff < 0 && costDiff < 0 ? theme.criticalBg : theme.warningBg,
            border: `1px solid ${theme.border}`,
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            animation: "evm-pop 0.35s ease",
          }}
        >
          {isGreat && <Confetti />}
          <span style={{ fontSize: 34 }} aria-hidden="true">{reaction.emoji}</span>
          <p style={{ margin: 0, fontSize: 15, color: theme.textPrimary, lineHeight: 1.5 }}>{reaction.text}</p>
        </div>

        <p style={{ margin: 0, fontSize: 12.5, color: theme.textMuted, lineHeight: 1.5 }}>
          En el lenguaje técnico de la gerencia de proyectos, esto mismo se llama <strong>IDS</strong> (≈{" "}
          {fmtIndex(idsApprox)}) e <strong>IDC</strong> (≈ {fmtIndex(idcApprox)}). Míralos de cerca en la sección
          de <a href="#interpretacion" style={{ color: theme.seriesPlanned }}>Interpretación</a>.
        </p>
      </div>
    </Section>
  );
}
