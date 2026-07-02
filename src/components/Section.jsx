import React from "react";
import { useReveal } from "../useReveal";

export default function Section({ id, icon, kicker, title, subtitle, children, theme, tone = "page" }) {
  const { ref, visible } = useReveal();

  return (
    <section
      id={id}
      ref={ref}
      style={{
        background: tone === "surface" ? theme.surface : theme.page,
        borderTop: tone === "surface" ? `1px solid ${theme.border}` : "none",
        borderBottom: tone === "surface" ? `1px solid ${theme.border}` : "none",
        scrollMarginTop: 72,
      }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "64px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {(kicker || title || subtitle) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720 }}>
            {(icon || kicker) && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {icon && (
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      minWidth: 36,
                      borderRadius: "50%",
                      background: theme.seriesBlueBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                )}
                {kicker && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: theme.seriesPlanned,
                    }}
                  >
                    {kicker}
                  </span>
                )}
              </div>
            )}
            {title && (
              <h2 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: theme.textPrimary, lineHeight: 1.2 }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{ margin: 0, fontSize: 16, color: theme.textSecondary, lineHeight: 1.6 }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
