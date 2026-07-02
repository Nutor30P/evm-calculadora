import React from "react";

const LINKS = [
  { href: "#introduccion", label: "Introducción" },
  { href: "#conceptos", label: "Conceptos" },
  { href: "#formulas", label: "Fórmulas" },
  { href: "#interpretacion", label: "Interpretación" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#caso-de-estudio", label: "Caso de estudio" },
];

export default function Nav({ theme }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: `${theme.page}e6`,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <a
          href="#top"
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: theme.textPrimary,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Valor Ganado (EVM)
        </a>
        <nav style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 14,
                color: theme.textSecondary,
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
