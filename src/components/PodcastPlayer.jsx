import React, { useEffect, useRef, useState } from "react";

const BAR_COUNT = 48;

function formatTime(s) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function PodcastPlayer({ theme, src, vttSrc, title, subtitle }) {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const rafRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [caption, setCaption] = useState("");

  const barColors = [theme.seriesPlanned, theme.good, theme.warning];

  // Wire up the <track> cuechange events to drive the big "karaoke" caption line.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = audio.textTracks && audio.textTracks[0];
    if (!track) return;
    track.mode = "hidden";
    const onCueChange = () => {
      const active = track.activeCues && track.activeCues[0];
      setCaption(active ? active.text : "");
    };
    track.addEventListener("cuechange", onCueChange);
    return () => track.removeEventListener("cuechange", onCueChange);
  }, []);

  const ensureAudioGraph = () => {
    if (sourceNodeRef.current) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const source = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.82;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    sourceNodeRef.current = source;
  };

  const drawIdleBars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const barWidth = width / BAR_COUNT;
    for (let i = 0; i < BAR_COUNT; i++) {
      const h = 3;
      ctx.fillStyle = barColors[i % barColors.length];
      ctx.globalAlpha = 0.35;
      ctx.fillRect(i * barWidth + 1, height - h, barWidth - 2, h);
    }
    ctx.globalAlpha = 1;
  };

  const drawFrame = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const bufferLength = analyser.frequencyBinCount;
    const data = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(data);

    ctx.clearRect(0, 0, width, height);
    const barWidth = width / BAR_COUNT;
    for (let i = 0; i < BAR_COUNT; i++) {
      const dataIndex = Math.floor((i / BAR_COUNT) * bufferLength);
      const value = data[dataIndex] / 255;
      const h = Math.max(3, value * height);
      ctx.fillStyle = barColors[i % barColors.length];
      ctx.fillRect(i * barWidth + 1, height - h, barWidth - 2, h);
    }

    rafRef.current = requestAnimationFrame(drawFrame);
  };

  useEffect(() => {
    drawIdleBars();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureAudioGraph();
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    drawFrame();
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    drawIdleBars();
  };

  const skip = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + delta), duration || audio.duration || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolume = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: "20px 22px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handlePause}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        style={{ display: "none" }}
      >
        {vttSrc && <track kind="subtitles" src={vttSrc} srcLang="es" label="Español" default />}
      </audio>

      {/* Episode header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            minWidth: 56,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${theme.seriesPlanned}, ${theme.good})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
          aria-hidden="true"
        >
          🎧
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>{title}</span>
          <span style={{ fontSize: 12.5, color: theme.textMuted }}>{subtitle}</span>
        </div>
      </div>

      {/* Reactive visualizer */}
      <canvas
        ref={canvasRef}
        width={640}
        height={110}
        style={{ width: "100%", height: 110, display: "block", borderRadius: 8 }}
        aria-hidden="true"
      />

      {/* Karaoke-style caption line */}
      <div
        style={{
          minHeight: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: theme.neutralBg,
          border: `1px solid ${theme.neutralBorder}33`,
          borderRadius: 10,
          padding: "10px 16px",
        }}
      >
        <p
          key={caption}
          style={{
            margin: 0,
            fontSize: 14.5,
            fontWeight: 600,
            color: theme.textPrimary,
            lineHeight: 1.5,
            animation: "evm-fade-up 0.35s ease",
          }}
        >
          {caption || "▶ Presiona play para escuchar el podcast con subtítulos en vivo."}
        </p>
      </div>

      {/* Scrubber */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          style={{ width: "100%", accentColor: theme.seriesPlanned, height: 20 }}
          aria-label="Progreso del podcast"
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: theme.textMuted, fontVariantNumeric: "tabular-nums" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <button
          type="button"
          onClick={() => skip(-10)}
          aria-label="Retroceder 10 segundos"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: theme.textSecondary,
          }}
        >
          ⏪
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: theme.seriesPlanned,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => skip(10)}
          aria-label="Adelantar 10 segundos"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: theme.textSecondary,
          }}
        >
          ⏩
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 12 }}>
          <span style={{ fontSize: 15 }} aria-hidden="true">🔊</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolume}
            style={{ width: 80, accentColor: theme.seriesPlanned, height: 18 }}
            aria-label="Volumen"
          />
        </div>
      </div>
    </div>
  );
}
