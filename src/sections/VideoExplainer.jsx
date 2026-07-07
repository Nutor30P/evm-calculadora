import React, { useRef, useState } from "react";
import Section from "../components/Section";
import PodcastPlayer from "../components/PodcastPlayer";

const TABS = [
  { id: "video", label: "🎥 Video" },
  { id: "podcast", label: "🎧 Podcast" },
];

export default function VideoExplainer({ theme }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [tab, setTab] = useState("video");

  const handlePlay = () => {
    videoRef.current?.play();
  };

  return (
    <Section
      id="video"
      theme={theme}
      tone="surface"
      icon="🎥"
      kicker="Míralo o escúchalo"
      title="Un repaso animado de todo el proceso EVM"
      subtitle="Los mismos conceptos de esta página, explicados en un par de minutos: como video, o como podcast con subtítulos en vivo para escuchar tranquilo."
    >
      <div
        role="tablist"
        aria-label="Formato de contenido"
        style={{ display: "inline-flex", gap: 6, background: theme.page, border: `1px solid ${theme.border}`, borderRadius: 999, padding: 4 }}
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                border: "none",
                cursor: "pointer",
                borderRadius: 999,
                padding: "8px 18px",
                fontSize: 13.5,
                fontWeight: 600,
                background: active ? theme.seriesPlanned : "transparent",
                color: active ? "#fff" : theme.textSecondary,
                transition: "background 0.15s ease, color 0.15s ease",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "video" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              position: "relative",
              background: "#000",
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            }}
          >
            <video
              ref={videoRef}
              controls
              preload="metadata"
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              style={{
                display: "block",
                width: "100%",
                aspectRatio: "16 / 9",
                background: "#000",
              }}
            >
              <source src={`${import.meta.env.BASE_URL}assets/video-evm.mp4`} type="video/mp4" />
              <track kind="subtitles" src={`${import.meta.env.BASE_URL}assets/subtitulos-evm.vtt`} srcLang="es" label="Español" default />
              Tu navegador no puede reproducir este video. Puedes{" "}
              <a href={`${import.meta.env.BASE_URL}assets/video-evm.mp4`}>descargarlo aquí</a>.
            </video>

            {!playing && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Reproducir video"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.28)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <span
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: theme.seriesPlanned,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    color: "#fff",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
                  }}
                  aria-hidden="true"
                >
                  ▶
                </span>
              </button>
            )}
          </div>

          <p style={{ margin: 0, fontSize: 13, color: theme.textMuted, textAlign: "center" }}>
            🔊 Recuerda activar el sonido — dura unos minutos.
          </p>
        </div>
      ) : (
        <PodcastPlayer
          theme={theme}
          src={`${import.meta.env.BASE_URL}assets/podcast-evm.mp3`}
          vttSrc={`${import.meta.env.BASE_URL}assets/podcast-evm.vtt`}
          title="Micro podcast: Análisis del Valor Ganado"
          subtitle="Episodio único · ~4 min · Español · Mezcla: Leonardo Estupiñán"
        />
      )}
    </Section>
  );
}
