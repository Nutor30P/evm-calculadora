import React, { useMemo } from "react";

const PIECES = ["🎉", "✨", "🎊", "⭐"];

// Small celebratory burst shown when the simulated/computed performance is
// favorable. Purely decorative — re-mounted by a `key` change on the caller
// side so the fall animation replays each time the good state is reached.
export default function Confetti({ count = 14 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.round(Math.random() * 250),
        emoji: PIECES[i % PIECES.length],
        size: 14 + Math.round(Math.random() * 10),
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            fontSize: p.size,
            animation: `evm-confetti-fall 1.1s ease-in ${p.delay}ms forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
