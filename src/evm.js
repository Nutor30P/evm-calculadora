// Pure EVM (Earned Value Management) calculation logic, shared by the
// interactive calculator and the guided case study.

// Safe division: returns null instead of NaN/Infinity when the denominator is 0.
export const safeDiv = (numerator, denominator) => {
  if (!isFinite(denominator) || denominator === 0) return null;
  const result = numerator / denominator;
  return isFinite(result) ? result : null;
};

const round0 = (value) => (value === null ? null : Math.round(value));
const round2 = (value) => (value === null ? null : Math.round(value * 100) / 100);

// Logistic (S-curve) shape, normalized so month 0 -> 0 and month dtp -> bac.
export const sigmoid = (x) => 1 / (1 + Math.exp(-10 * (x - 0.5)));

export function computeEvm({ bac, vp, vg, cr, dtp, tt }) {
  const vc = vg - cr;
  const vs = vg - vp;
  const idc = safeDiv(vg, cr);
  const ids = safeDiv(vg, vp);
  const idhc = safeDiv(bac - vg, bac - cr);
  const ecc = idc === null || idc === 0 ? null : safeDiv(bac, idc);
  const etc = ids === null || ids === 0 ? null : safeDiv(dtp - tt, ids);

  return {
    vc: round0(vc),
    vs: round0(vs),
    idc: round2(idc),
    ids: round2(ids),
    idhc: round2(idhc),
    ecc: round0(ecc),
    etc: etc === null ? null : Math.round(etc * 10) / 10,
  };
}

export function buildCurveData(bac, dtp) {
  if (!dtp || dtp <= 0) return [];
  const s0 = sigmoid(0);
  const s1 = sigmoid(1);
  const denom = s1 - s0;
  const plannedValue = (month) =>
    denom === 0 ? 0 : (bac * (sigmoid(month / dtp) - s0)) / denom;

  const steps = 60;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const month = (i / steps) * dtp;
    points.push({ month, planned: plannedValue(month) });
  }
  return points;
}

// ---- Formatters ----------------------------------------------------------
const moneyFormatter = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
const compactMoneyFormatter = new Intl.NumberFormat("es-CO", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const fmtMoney = (value) =>
  value === null || value === undefined || !isFinite(value) ? "—" : `$ ${moneyFormatter.format(value)}`;
export const fmtCompact = (value) =>
  value === null || value === undefined || !isFinite(value) ? "—" : `$ ${compactMoneyFormatter.format(value)}`;
export const fmtIndex = (value) =>
  value === null || value === undefined || !isFinite(value) ? "—" : value.toFixed(2);
export const fmtMonths = (value) =>
  value === null || value === undefined || !isFinite(value) ? "—" : `${value.toFixed(1)} m`;

// ---- Interpretation messages ----------------------------------------------
// Builds the same badge list the calculator shows, from a result set + inputs.
export function buildInterpretation({ vc, vs, idc, ids, idhc, ecc, etc, bac, dtp, tt }) {
  const list = [];

  list.push(
    vc >= 0
      ? { tone: "good", text: `Subejecución de costo: el trabajo entregado vale ${fmtMoney(vc)} más de lo gastado.` }
      : { tone: "bad", text: `Sobreejecución de costo: el proyecto ha gastado ${fmtMoney(Math.abs(vc))} más de lo que vale el trabajo entregado.` }
  );

  list.push(
    vs >= 0
      ? { tone: "good", text: `Adelanto en cronograma: el valor ganado supera lo planificado en ${fmtMoney(vs)}.` }
      : { tone: "bad", text: `Atraso en cronograma: el valor ganado es ${fmtMoney(Math.abs(vs))} menor a lo planificado.` }
  );

  if (idc === null) {
    list.push({ tone: "neutral", text: "IDC no calculable: el costo real es 0." });
  } else {
    list.push(
      idc >= 1
        ? { tone: "good", text: `Eficiencia en el uso del presupuesto: por cada $1 gastado se generan $${fmtIndex(idc)} de valor.` }
        : { tone: "bad", text: `Ineficiencia en el uso del presupuesto: por cada $1 gastado solo se generan $${fmtIndex(idc)} de valor.` }
    );
  }

  if (ids === null) {
    list.push({ tone: "neutral", text: "IDS no calculable: el valor planificado es 0." });
  } else {
    list.push(
      ids >= 1
        ? { tone: "good", text: `Adelanto del ${((ids - 1) * 100).toFixed(1)}% respecto al cronograma planificado.` }
        : { tone: "bad", text: `Atraso del ${((1 - ids) * 100).toFixed(1)}% respecto al cronograma planificado.` }
    );
  }

  if (ecc === null || etc === null) {
    list.push({ tone: "neutral", text: "Pronóstico no calculable con los valores actuales (revisa que CR, VP e IDC no sean 0)." });
  } else {
    list.push({
      tone: "neutral",
      text: `Pronóstico: de mantenerse el desempeño actual, el proyecto costará aproximadamente ${fmtMoney(ecc)} (BAC: ${fmtMoney(bac)}) y requerirá ${fmtMonths(etc)} adicionales para concluir, para una duración total estimada de ≈ ${(tt + etc).toFixed(1)} meses frente a los ${dtp} planificados.`,
    });
  }

  if (idhc !== null) {
    list.push({
      tone: idhc <= (idc ?? Infinity) ? "good" : "bad",
      text: `Índice de desempeño requerido para terminar dentro del presupuesto (IDHC): ${fmtIndex(idhc)}. ${
        idhc > 1
          ? "El equipo debe rendir mejor que hasta ahora para no exceder el BAC."
          : "El desempeño actual es suficiente para cerrar dentro del presupuesto."
      }`,
    });
  }

  return list;
}
