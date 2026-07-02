import { useEffect, useState } from "react";

export const THEME = {
  light: {
    surface: "#fcfcfb",
    page: "#f9f9f7",
    textPrimary: "#0b0b0b",
    textSecondary: "#52514e",
    textMuted: "#898781",
    grid: "#e1e0d9",
    axis: "#c3c2b7",
    border: "rgba(11,11,11,0.10)",
    seriesPlanned: "#2a78d6",
    seriesBlueBg: "#eaf1fb",
    good: "#0ca30c",
    goodBg: "#e6f6e6",
    critical: "#d03b3b",
    criticalBg: "#fbeaea",
    warning: "#c98500",
    warningBg: "#fdf3e0",
    neutralBg: "#eef2f8",
    neutralBorder: "#2a78d6",
  },
  dark: {
    surface: "#1a1a19",
    page: "#0d0d0d",
    textPrimary: "#ffffff",
    textSecondary: "#c3c2b7",
    textMuted: "#898781",
    grid: "#2c2c2a",
    axis: "#383835",
    border: "rgba(255,255,255,0.10)",
    seriesPlanned: "#3987e5",
    seriesBlueBg: "#132133",
    good: "#0ca30c",
    goodBg: "#123312",
    critical: "#e66767",
    criticalBg: "#3a1414",
    warning: "#c98500",
    warningBg: "#332707",
    neutralBg: "#132133",
    neutralBorder: "#3987e5",
  },
};

export function useColorScheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e) => setIsDark(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return { isDark, theme: isDark ? THEME.dark : THEME.light };
}
