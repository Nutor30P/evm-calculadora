import React, { useState } from "react";
import Section from "../components/Section";
import Confetti from "../components/Confetti";
import { QUESTION_BANK } from "../quizBank";
import { addScore } from "../quizStorage";

const QUESTIONS_PER_ROUND = 5;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRound() {
  return shuffle(QUESTION_BANK)
    .slice(0, QUESTIONS_PER_ROUND)
    .map((q) => {
      const options = shuffle(q.options.map((text, idx) => ({ text, idx })));
      return { ...q, options, correctPosition: options.findIndex((o) => o.idx === q.correct) };
    });
}

function scoreMessage(score, total) {
  const ratio = score / total;
  if (ratio === 1) return { emoji: "🏆", text: "¡Perfecto! Dominas el Valor Ganado." };
  if (ratio >= 0.8) return { emoji: "🤩", text: "¡Muy bien! Tienes un manejo sólido de los conceptos." };
  if (ratio >= 0.6) return { emoji: "🙂", text: "Buen intento. Repasa un par de conceptos y lo dominarás." };
  if (ratio >= 0.4) return { emoji: "😅", text: "Vas por buen camino, pero conviene repasar el glosario y las fórmulas." };
  return { emoji: "📚", text: "Toca repasar. Revisa las secciones de Conceptos y Fórmulas y vuelve a intentarlo." };
}

export default function Quiz({ theme }) {
  const [round, setRound] = useState(() => pickRound());
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const current = round[step];
  const isLast = step === round.length - 1;
  const result = finished ? scoreMessage(score, round.length) : null;

  function handleSelect(position) {
    if (selected !== null) return;
    setSelected(position);
    if (position === current.correctPosition) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
  }

  function handleRestart() {
    setRound(pickRound());
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setName("");
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) return;
    addScore({ name, score, total: round.length });
    setSaved(true);
  }

  return (
    <Section
      id="quiz"
      theme={theme}
      tone="surface"
      icon="🧠"
      kicker="Ponte a prueba"
      title="Quiz de Valor Ganado"
      subtitle="5 preguntas al azar, elegidas de un banco de 30, para que cada intento sea distinto. Al final puedes guardar tu nombre y puntaje en el Top Ranks."
    >
      <div
        style={{
          background: theme.page,
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: "24px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {!finished ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>
                Pregunta {step + 1} de {round.length}
              </span>
              <span style={{ fontSize: 13, color: theme.textMuted }}>Puntaje: {score}</span>
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              {round.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 4,
                    background: i <= step ? theme.seriesPlanned : theme.border,
                  }}
                />
              ))}
            </div>

            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: theme.textPrimary, lineHeight: 1.4 }}>
              {current.question}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {current.options.map((option, position) => {
                const isSelected = selected === position;
                const isCorrect = position === current.correctPosition;
                let background = theme.surface;
                let border = theme.border;
                if (selected !== null) {
                  if (isCorrect) {
                    background = theme.goodBg;
                    border = theme.good;
                  } else if (isSelected) {
                    background = theme.criticalBg;
                    border = theme.critical;
                  }
                }
                return (
                  <button
                    key={position}
                    type="button"
                    onClick={() => handleSelect(position)}
                    disabled={selected !== null}
                    style={{
                      textAlign: "left",
                      background,
                      border: `1px solid ${border}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 14.5,
                      color: theme.textPrimary,
                      cursor: selected === null ? "pointer" : "default",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "background 0.15s ease, border-color 0.15s ease",
                    }}
                  >
                    {selected !== null && (
                      <span aria-hidden="true">{isCorrect ? "✅" : isSelected ? "❌" : "▫️"}</span>
                    )}
                    {option.text}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div
                style={{
                  background: theme.seriesBlueBg,
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                <span aria-hidden="true">💡</span>
                <p style={{ margin: 0, fontSize: 13.5, color: theme.textPrimary, lineHeight: 1.5 }}>
                  {current.explanation}
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleNext}
                disabled={selected === null}
                style={{
                  background: selected === null ? theme.border : theme.seriesPlanned,
                  color: selected === null ? theme.textMuted : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: selected === null ? "default" : "pointer",
                }}
              >
                {isLast ? "Ver resultado" : "Siguiente"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                position: "relative",
                background: score / round.length >= 0.8 ? theme.goodBg : theme.warningBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: "20px 22px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {score / round.length >= 0.8 && <Confetti />}
              <span style={{ fontSize: 36 }} aria-hidden="true">{result.emoji}</span>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: theme.textPrimary }}>
                  {score} de {round.length} correctas
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: theme.textSecondary, lineHeight: 1.5 }}>
                  {result.text}
                </p>
              </div>
            </div>

            {!saved ? (
              <form onSubmit={handleSave} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escribe tu nombre"
                  maxLength={24}
                  required
                  style={{
                    flex: "1 1 200px",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: `1px solid ${theme.border}`,
                    background: theme.surface,
                    color: theme.textPrimary,
                    fontSize: 14,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: theme.seriesPlanned,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 18px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Guardar mi puntaje
                </button>
              </form>
            ) : (
              <p style={{ margin: 0, fontSize: 14, color: theme.good, fontWeight: 600 }}>
                ✅ ¡Guardado! Revisa el{" "}
                <a href="#ranking" style={{ color: theme.seriesPlanned }}>
                  Top Ranks
                </a>{" "}
                para ver tu puesto.
              </p>
            )}

            <div>
              <button
                type="button"
                onClick={handleRestart}
                style={{
                  background: "transparent",
                  color: theme.seriesPlanned,
                  border: `1px solid ${theme.seriesPlanned}`,
                  borderRadius: 8,
                  padding: "10px 18px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                🔄 Intentar con otras preguntas
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
