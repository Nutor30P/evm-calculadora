// Persistencia local (por navegador) de los puntajes del quiz de EVM.
// No hay backend: cada dispositivo guarda su propio historial en localStorage.

const STORAGE_KEY = "evm-quiz-scores";
export const SCORE_EVENT = "evm-quiz-score-updated";

export function getScores() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addScore({ name, score, total }) {
  const entry = { name: name.trim().slice(0, 24), score, total, date: new Date().toISOString() };
  const scores = [...getScores(), entry];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // localStorage lleno o no disponible: la sesión sigue funcionando sin guardar.
  }
  window.dispatchEvent(new Event(SCORE_EVENT));
  return entry;
}

export function clearScores() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
  window.dispatchEvent(new Event(SCORE_EVENT));
}
