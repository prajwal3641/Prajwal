"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { SCENES, type SceneConfig, type LinkHotspot, type InfoHotspot } from "@/lib/cafes/scenes";

declare global {
  interface Window { Marzipano: any; }
}

interface Props {
  scene: SceneConfig;
  onNavigate: (targetId: string) => void;
  onReady?: () => void;
}

function createLinkHotspotElement(hotspot: LinkHotspot, targetName: string, onClick: () => void): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px;margin:-10px;";

  const iconWrap = document.createElement("div");
  iconWrap.style.cssText = "transition:transform 0.18s ease,filter 0.18s ease;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.75));";
  iconWrap.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" style="display:block;transform:rotate(${hotspot.rotation}rad)">
      <circle cx="26" cy="26" r="24" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.45)" stroke-width="1"/>
      <circle cx="26" cy="26" r="18" fill="rgba(0,0,0,0.58)" stroke="#fbbf24" stroke-width="1.8"/>
      <path d="M26 36 L26 16 M19.5 22.5 L26 16 L32.5 22.5" stroke="#fbbf24" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`;

  const label = document.createElement("div");
  label.textContent = targetName;
  label.style.cssText = "background:rgba(0,0,0,0.62);color:#fbbf24;font-size:10px;font-family:system-ui,sans-serif;font-weight:500;letter-spacing:0.09em;padding:2px 7px;border-radius:9px;white-space:nowrap;pointer-events:none;border:1px solid rgba(251,191,36,0.22);";

  wrapper.addEventListener("mouseenter", () => { iconWrap.style.filter = "drop-shadow(0 2px 14px rgba(251,191,36,0.75))"; iconWrap.style.transform = "scale(1.12)"; });
  wrapper.addEventListener("mouseleave", () => { iconWrap.style.filter = "drop-shadow(0 2px 8px rgba(0,0,0,0.75))"; iconWrap.style.transform = "scale(1)"; });
  wrapper.addEventListener("click", (e) => { e.stopPropagation(); onClick(); });
  wrapper.addEventListener("mousedown", (e) => e.stopPropagation());
  wrapper.addEventListener("touchstart", (e) => e.stopPropagation(), { passive: true });
  wrapper.appendChild(iconWrap);
  wrapper.appendChild(label);
  return wrapper;
}

function createInfoHotspotElement(hotspot: InfoHotspot, onShow: (info: { title: string; text: string }) => void): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "cursor:pointer;display:flex;align-items:center;justify-content:center;padding:8px;margin:-8px;";

  const icon = document.createElement("div");
  icon.style.cssText = "transition:transform 0.18s ease;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.7));";
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" style="display:block">
      <circle cx="15" cy="15" r="13" fill="rgba(0,0,0,0.62)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="15" y="20" text-anchor="middle" font-size="14" font-family="Georgia,serif" font-weight="bold" fill="#fbbf24">i</text>
    </svg>`;

  wrapper.addEventListener("mouseenter", () => { icon.style.transform = "scale(1.18)"; });
  wrapper.addEventListener("mouseleave", () => { icon.style.transform = "scale(1)"; });
  wrapper.addEventListener("click", (e) => { e.stopPropagation(); onShow({ title: hotspot.title, text: hotspot.text }); });
  wrapper.addEventListener("mousedown", (e) => e.stopPropagation());
  wrapper.addEventListener("touchstart", (e) => e.stopPropagation(), { passive: true });
  wrapper.appendChild(icon);
  return wrapper;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeIn3(t: number) { return t * t * t; }
function easeOut3(t: number) { return 1 - Math.pow(1 - t, 3); }

function animate(ms: number, tick: (t: number) => void, ease = easeOut3): Promise<void> {
  return new Promise((resolve) => {
    const t0 = performance.now();
    function frame(now: number) {
      const raw = Math.min((now - t0) / ms, 1);
      tick(ease(raw));
      if (raw < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });
}

function buildMzScene(viewer: any, cfg: SceneConfig, initialFov: number | null, onLink: (hs: LinkHotspot, target: SceneConfig) => void, onInfo: (info: { title: string; text: string }) => void): any {
  const M = window.Marzipano;
  const source = M.ImageUrlSource.fromString(
    `/cafes/coffee-studios/tiles/${cfg.id}/{z}/{f}/{y}/{x}.jpg`,
    { cubeMapPreviewUrl: `/cafes/coffee-studios/tiles/${cfg.id}/preview.jpg` }
  );
  const geometry = new M.CubeGeometry(cfg.levels);
  const limiter = M.RectilinearView.limit.traditional(cfg.faceSize, (100 * Math.PI) / 180, (120 * Math.PI) / 180);
  const viewParams = initialFov != null ? { ...cfg.initialViewParameters, fov: initialFov } : cfg.initialViewParameters;
  const view = new M.RectilinearView(viewParams, limiter);
  const mzScene = viewer.createScene({ source, geometry, view });

  cfg.linkHotspots.forEach((hs) => {
    const target = SCENES.find((s) => s.id === hs.target);
    if (!target) return;
    mzScene.hotspotContainer().createHotspot(createLinkHotspotElement(hs, target.name, () => onLink(hs, target)), { yaw: hs.yaw, pitch: hs.pitch });
  });

  cfg.infoHotspots.forEach((hs) => {
    mzScene.hotspotContainer().createHotspot(createInfoHotspotElement(hs, onInfo), { yaw: hs.yaw, pitch: hs.pitch });
  });

  return mzScene;
}

export function PanoramaViewer({ scene, onNavigate, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const autorotateRef = useRef<any>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentSceneIdRef = useRef("");
  const isTransitioningRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [infoCard, setInfoCard] = useState<{ title: string; text: string } | null>(null);

  function scheduleAutorotate() {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => { viewerRef.current?.startMovement(autorotateRef.current); }, 4000);
  }

  function pauseAutorotate() {
    viewerRef.current?.stopMovement();
    scheduleAutorotate();
  }

  async function navigateWithTransition(_hotspot: LinkHotspot, targetCfg: SceneConfig) {
    if (isTransitioningRef.current || !viewerRef.current) return;
    isTransitioningRef.current = true;
    viewerRef.current.stopMovement();
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);

    const currentMz = viewerRef.current.scene();
    const view = currentMz?.view();
    if (!view) { isTransitioningRef.current = false; return; }

    const startFov = view.fov();
    const startYaw = view.yaw();
    const startPitch = view.pitch();
    const peakFov = 0.30;

    await animate(220, (e) => { view.setParameters({ yaw: startYaw, pitch: startPitch, fov: lerp(startFov, peakFov, e) }); }, easeIn3);

    const newMz = buildMzScene(viewerRef.current, targetCfg, peakFov, (hs, tgt) => navigateWithTransition(hs, tgt), setInfoCard);
    const newView = newMz.view();
    newView.setParameters({ fov: peakFov });

    currentSceneIdRef.current = targetCfg.id;
    newMz.switchTo({ transitionDuration: 350 });
    onNavigate(targetCfg.id);
    setInfoCard(null);

    await animate(520, (e) => { newView.setParameters({ fov: lerp(peakFov, startFov, e) }); }, easeOut3);

    isTransitioningRef.current = false;
    scheduleAutorotate();
  }

  function initScene(cfg: SceneConfig) {
    if (!viewerRef.current) return;
    const mzScene = buildMzScene(viewerRef.current, cfg, null, (hs, tgt) => navigateWithTransition(hs, tgt), setInfoCard);
    currentSceneIdRef.current = cfg.id;
    mzScene.switchTo({ transitionDuration: 900 });
    setInfoCard(null);
  }

  useEffect(() => { if (window.Marzipano) setReady(true); }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;
    if (!viewerRef.current) {
      viewerRef.current = new window.Marzipano.Viewer(containerRef.current);
      autorotateRef.current = window.Marzipano.autorotate({ yawSpeed: 0.04, targetPitch: 0, targetFov: Math.PI / 2 });
      onReady?.();
    }
    initScene(scene);
    scheduleAutorotate();
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!ready || !viewerRef.current) return;
    if (currentSceneIdRef.current === scene.id) return;
    if (isTransitioningRef.current) return;
    initScene(scene);
    scheduleAutorotate();
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black">
      <Script
        src="/cafes/coffee-studios/vendor/marzipano.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />

      <div
        ref={containerRef}
        className="w-full h-full"
        onMouseDown={pauseAutorotate}
        onTouchStart={pauseAutorotate}
      />

      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-stone-400 text-sm tracking-widest uppercase">Loading tour</p>
        </div>
      )}

      {infoCard && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-72 bg-stone-900/92 backdrop-blur-sm border border-stone-700 rounded-2xl p-5 shadow-2xl z-20">
          <button onClick={() => setInfoCard(null)} className="absolute top-3 right-3 text-stone-500 hover:text-white transition-colors" aria-label="Close">✕</button>
          <h3 className="text-amber-400 font-semibold mb-1.5 pr-5">{infoCard.title}</h3>
          <p className="text-stone-300 text-sm leading-relaxed">{infoCard.text}</p>
        </div>
      )}
    </div>
  );
}
