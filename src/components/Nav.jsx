import React, { useEffect, useState } from "react";

const LINKS = [
  { href: "#video", label: "🎥 Video" },
  { href: "#introduccion", label: "Introducción" },
  { href: "#infografia", label: "🗺️ Infografía" },
  { href: "#simulador", label: "🧱 Simulador" },
  { href: "#conceptos", label: "Conceptos" },
  { href: "#formulas", label: "Fórmulas" },
  { href: "#interpretacion", label: "Interpretación" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#caso-de-estudio", label: "Caso de estudio" },
  { href: "#quiz", label: "🧠 Quiz" },
  { href: "#ranking", label: "🏆 Top Ranks" },
];

export default function Nav({ theme }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          🧱 Valor Ganado (EVM)
        </a>
        <nav style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? theme.seriesPlanned : theme.textSecondary,
                  textDecoration: "none",
                  borderBottom: isActive ? `2px solid ${theme.seriesPlanned}` : "2px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
