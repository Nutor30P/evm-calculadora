import React from "react";

export default function Section({ id, kicker, title, subtitle, children, theme, tone = "page" }) {
  return (
    <section
      id={id}
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
        }}
      >
        {(kicker || title || subtitle) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720 }}>
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
