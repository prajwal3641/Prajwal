"use client";

import { cafeConfig } from "@/lib/cafes/coffee-studios/config";

interface Props {
  size?: number;
  showName?: boolean;
  className?: string;
  /** "dark" = espresso icon on cream bg (navbar default); "light" = cream icon on espresso bg (footer) */
  variant?: "dark" | "light";
}

export function CafeLogo({ size = 52, showName = true, className = "", variant = "dark" }: Props) {
  const { logo, name, tagline } = cafeConfig;

  const iconColor  = variant === "light" ? "#f5ede8" : "#3b2019";
  const textColor  = variant === "light" ? "#f5ede8" : "#3b2019";
  const subColor   = variant === "light" ? "rgba(245,237,232,0.6)" : "rgba(59,32,25,0.55)";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Badge */}
      {logo.image ? (
        <img src={logo.image} alt={name} width={size} height={size} className="object-contain" style={{ width: size, height: size }} />
      ) : (
        <CafeIcon size={size} color={iconColor} />
      )}

      {/* Name text */}
      {showName && (
        <div className="leading-none">
          <div
            className="font-display font-bold tracking-tight"
            style={{ fontSize: size * 0.38, color: textColor, lineHeight: 1.1 }}
          >
            {name}
          </div>
          <div
            className="mt-0.5 font-sans font-semibold uppercase tracking-[0.22em]"
            style={{ fontSize: size * 0.2, color: subColor }}
          >
            {tagline}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Cafe-themed SVG icon ───────────────────────────────────────────────────
   A pour-over dripper with steam — universally recognisable café symbol.
   All strokes are drawn in a single color so it adapts to any bg.
────────────────────────────────────────────────────────────────────────────── */
function CafeIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* ── Steam wisps ── */}
      <path
        d="M18 11 C18 8, 21 8, 21 5"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.45"
      />
      <path
        d="M26 12 C26 9, 29 9, 29 6"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.65"
      />
      <path
        d="M34 11 C34 8, 37 8, 37 5"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.45"
      />

      {/* ── Pour-over cone (dripper) ── */}
      {/* Outer cone shape */}
      <path
        d="M12 17 L26 38 L40 17 Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none"
      />
      {/* Rib lines inside cone */}
      <line x1="26" y1="17" x2="26" y2="35" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="19" y1="17" x2="22" y2="30" stroke={color} strokeWidth="1" opacity="0.2" />
      <line x1="33" y1="17" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.2" />

      {/* Rim of the dripper */}
      <rect x="10" y="14" width="32" height="4" rx="2" fill={color} opacity="0.9" />

      {/* ── Cup body ── */}
      <path
        d="M20 40 Q26 44 32 40"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"
      />
      {/* Cup sides */}
      <line x1="20" y1="40" x2="18" y2="47" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="32" y1="40" x2="34" y2="47" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Cup bottom */}
      <path d="M17 47 Q26 50 35 47" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Cup handle */}
      <path
        d="M34 43 C40 43, 40 48, 34 48"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
    </svg>
  );
}
