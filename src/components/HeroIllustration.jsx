import React from "react";

// Hand-drawn inline illustration (no external image assets) — a small crane
// stacking colorful blocks, echoing the "building progress" analogy used
// throughout the page. Kept purely decorative and aria-hidden.
export default function HeroIllustration({ theme }) {
  return (
    <svg
      viewBox="0 0 360 260"
      role="img"
      aria-hidden="true"
      style={{ width: "100%", height: "auto", maxWidth: 320 }}
    >
      <circle cx="180" cy="130" r="128" fill={theme.seriesBlueBg} />
      <circle cx="272" cy="56" r="26" fill="#eda100" opacity="0.9" />
      <rect x="40" y="206" width="280" height="14" rx="7" fill={theme.axis} opacity="0.5" />

      {/* crane */}
      <rect x="52" y="60" width="8" height="146" rx="4" fill={theme.textMuted} />
      <rect x="52" y="60" width="120" height="8" rx="4" fill={theme.textMuted} />
      <line x1="150" y1="68" x2="150" y2="118" stroke={theme.textMuted} strokeWidth="3" />
      <rect x="138" y="118" width="26" height="18" rx="4" fill="#e34948" />

      {/* stacked blocks */}
      <rect x="120" y="176" width="70" height="30" rx="6" fill="#2a78d6" />
      <rect x="130" y="146" width="70" height="30" rx="6" fill="#1baf7a" />
      <rect x="140" y="116" width="70" height="30" rx="6" fill="#eda100" />
      <rect x="150" y="86" width="46" height="30" rx="6" fill="#4a3aa7" />

      {/* flag */}
      <line x1="196" y1="86" x2="196" y2="52" stroke={theme.textMuted} strokeWidth="3" />
      <path d="M196 52 L228 60 L196 68 Z" fill="#e34948" />
    </svg>
  );
}
