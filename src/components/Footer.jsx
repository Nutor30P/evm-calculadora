import React from "react";

export default function Footer({ theme }) {
  return (
    <footer style={{ background: theme.page, borderTop: `1px solid ${theme.border}` }}>
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "28px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 13, color: theme.textMuted }}>
          Material didáctico — Gestión del Valor Ganado (EVM), Gerencia de Proyectos.
        </span>
        <a href="#top" style={{ fontSize: 13, color: theme.seriesPlanned, textDecoration: "none" }}>
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
}
