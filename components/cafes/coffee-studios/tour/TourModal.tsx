"use client";

import { useState, useEffect } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { SCENES } from "@/lib/cafes/scenes";
import { PanoramaViewer } from "./PanoramaViewer";
import { MiniMap } from "./MiniMap";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function TourModal({ open, onClose }: Props) {
  const [activeId, setActiveId] = useState(SCENES[0].id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const activeScene = SCENES.find((s) => s.id === activeId) ?? SCENES[0];

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black animate-tour-in">
      {/* ── Panorama ── */}
      <PanoramaViewer scene={activeScene} onNavigate={setActiveId} />

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-400/80">Virtual Tour</p>
          <p className="text-white font-semibold text-lg leading-tight">{activeScene.name}</p>
          <p className="text-stone-400 text-xs">{activeScene.description}</p>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Scene pills */}
          <div className="hidden sm:flex gap-1.5 mr-3">
            {SCENES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all duration-200 ${
                  activeId === s.id
                    ? "bg-amber-400 text-black"
                    : "bg-black/50 text-stone-300 border border-stone-700 hover:border-amber-400/50 hover:text-white"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="grid h-9 w-9 place-items-center rounded-full bg-black/50 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 transition-colors"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-black/50 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 transition-colors"
            aria-label="Close tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── MiniMap ── */}
      <MiniMap activeSceneId={activeId} onNavigate={setActiveId} />

      {/* ── Drag hint (fades after a moment) ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 animate-hint-fade pointer-events-none">
        <div className="flex gap-1">
          {["←", "↑", "↓", "→"].map((a) => (
            <span key={a} className="grid h-6 w-6 place-items-center rounded bg-black/50 border border-stone-700 text-stone-400 text-[11px]">{a}</span>
          ))}
        </div>
        <p className="text-stone-500 text-[10px] tracking-wider uppercase">Drag or use arrows to look around</p>
      </div>
    </div>
  );
}
