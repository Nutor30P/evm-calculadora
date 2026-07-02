import React from "react";

// A chunky, game-like progress bar made of rounded segments (instead of a
// plain filled rectangle) — reads clearly for kids and animates on change.
export default function SegmentedBar({ percent, segments = 20, color, theme, markerPercent, label, valueLabel }) {
  const clamped = Math.max(0, Math.min(150, percent));
  const filled = Math.round((clamped / 100) * segments);
  const markerIndex =
    markerPercent === undefined || markerPercent === null
      ? null
      : Math.round((Math.max(0, Math.min(150, markerPercent)) / 100) * segments);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: theme.textPrimary }}>{label}</span>
        <span style={{ fontSize: 13, color: theme.textMuted, fontVariantNumeric: "tabular-nums" }}>{valueLabel}</span>
      </div>
      <div style={{ position: "relative", paddingTop: markerIndex !== null ? 14 : 0 }}>
        {markerIndex !== null && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: `calc(${(markerIndex / segments) * 100}% - 6px)`,
              fontSize: 13,
              transition: "left 0.4s ease",
            }}
          >
            🚩
          </span>
        )}
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: segments }).map((_, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: 16,
                borderRadius: 4,
                background: i < filled ? color : theme.grid,
                transition: "background 0.35s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
