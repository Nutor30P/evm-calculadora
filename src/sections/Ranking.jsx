import React, { useEffect, useState } from "react";
import Section from "../components/Section";
import { getScores, clearScores, SCORE_EVENT } from "../quizStorage";

const dateFormatter = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

const MEDAL = ["🥇", "🥈", "🥉"];

export default function Ranking({ theme }) {
  const [scores, setScores] = useState(() => getScores());

  useEffect(() => {
    const refresh = () => setScores(getScores());
    window.addEventListener(SCORE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SCORE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const ranked = [...scores].sort((a, b) => {
    const ratioDiff = b.score / b.total - a.score / a.total;
    if (ratioDiff !== 0) return ratioDiff;
    return new Date(b.date) - new Date(a.date);
  });

  function handleClear() {
    if (!window.confirm("¿Borrar todo el historial de puntajes guardado en este navegador?")) return;
    clearScores();
  }

  return (
    <Section
      id="ranking"
      theme={theme}
      icon="🏆"
      kicker="Top Ranks"
      title="Tabla de puntajes"
      subtitle="Guardado localmente en este navegador: cada dispositivo tiene su propio historial de intentos del quiz."
    >
      {ranked.length === 0 ? (
        <p style={{ margin: 0, fontSize: 14.5, color: theme.textSecondary }}>
          Todavía no hay puntajes guardados. Completa el{" "}
          <a href="#quiz" style={{ color: theme.seriesPlanned }}>
            Quiz
          </a>{" "}
          y guarda tu nombre para aparecer aquí.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ overflowX: "auto", border: `1px solid ${theme.border}`, borderRadius: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: theme.surface }}>
              <thead>
                <tr>
                  {["#", "Nombre", "Puntaje", "Fecha"].map((h) => (
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
                {ranked.map((entry, i) => (
                  <tr key={`${entry.name}-${entry.date}-${i}`} style={{ background: i % 2 === 1 ? theme.page : "transparent" }}>
                    <td style={{ padding: "10px 16px", fontSize: 14, color: theme.textPrimary, borderBottom: `1px solid ${theme.border}` }}>
                      {MEDAL[i] ?? i + 1}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 14, fontWeight: 600, color: theme.textPrimary, borderBottom: `1px solid ${theme.border}` }}>
                      {entry.name}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 14, color: theme.seriesPlanned, fontVariantNumeric: "tabular-nums", borderBottom: `1px solid ${theme.border}` }}>
                      {entry.score} / {entry.total}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, color: theme.textMuted, borderBottom: `1px solid ${theme.border}` }}>
                      {dateFormatter.format(new Date(entry.date))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <button
              type="button"
              onClick={handleClear}
              style={{
                background: "transparent",
                color: theme.textMuted,
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              🗑️ Borrar mi historial
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
