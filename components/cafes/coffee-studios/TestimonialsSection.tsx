"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

/* ─── Floating face images (Unsplash) ───────────────── */
const FACES = [
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", alt: "Sofia L." },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", alt: "Marcus T." },
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", alt: "Priya N." },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", alt: "Owen B." },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", alt: "Emma R." },
  { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80", alt: "Daniel K." },
  { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", alt: "James W." },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80", alt: "Aria M." },
  { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80", alt: "Charles H." },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80", alt: "Lea V." },
  { src: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=200&q=80", alt: "Nora K." },
  { src: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80", alt: "Brett O." },
];

/* Each face has a fixed position + its own drift direction */
const POSITIONS = [
  { top: "6%",    left: "6%",   size: "w-20 h-20", rotate: -8,  dx: 10,  dy: -12 },
  { top: "12%",   left: "24%",  size: "w-16 h-16", rotate: 5,   dx: -8,  dy: -10 },
  { top: "4%",    left: "50%",  size: "w-14 h-14", rotate: -4,  dx: 7,   dy: -14 },
  { top: "8%",    right: "22%", size: "w-18 h-18", rotate: 7,   dx: -10, dy: -8  },
  { top: "6%",    right: "5%",  size: "w-22 h-22", rotate: -6,  dx: 8,   dy: -10 },
  { top: "42%",   right: "4%",  size: "w-20 h-20", rotate: 5,   dx: 10,  dy: -12 },
  { top: "44%",   left: "4%",   size: "w-24 h-24", rotate: -7,  dx: -9,  dy: -10 },
  { bottom: "6%", left: "14%",  size: "w-18 h-18", rotate: 6,   dx: 8,   dy: 12  },
  { bottom: "10%",left: "38%",  size: "w-14 h-14", rotate: -3,  dx: -7,  dy: 10  },
  { bottom: "5%", right: "32%", size: "w-20 h-20", rotate: 8,   dx: 9,   dy: 12  },
  { bottom: "8%", right: "10%", size: "w-16 h-16", rotate: -5,  dx: -8,  dy: 12  },
  { top: "28%",   left: "10%",  size: "w-14 h-14", rotate: 4,   dx: -10, dy: -8  },
];

function FloatingFace({ face, pos, index }: { face: typeof FACES[0]; pos: typeof POSITIONS[0]; index: number }) {
  const duration = 5 + (index % 4);
  const delay    = index * 0.18;

  return (
    <motion.div
      className={`absolute ${pos.size} rounded-2xl overflow-hidden shadow-xl border-2 border-espresso/10`}
      style={{
        top: pos.top, left: pos.left,
        right: (pos as any).right, bottom: (pos as any).bottom,
        rotate: pos.rotate,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, pos.dx, 0],
        y: [0, pos.dy, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        x: { duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay },
        y: { duration: duration * 1.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay },
      }}
      whileHover={{ scale: 1.12, rotate: 0, zIndex: 20, transition: { duration: 0.2 } }}
    >
      <img src={face.src} alt={face.alt} className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
}

export function TestimonialsSection() {
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-sand/30 py-36 px-4"
      style={{ minHeight: "600px" }}
    >
      {/* Floating faces */}
      {FACES.map((face, i) => (
        <FloatingFace key={i} face={face} pos={POSITIONS[i]} index={i} />
      ))}

      {/* Radial fade so faces blend into background at edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 50%, transparent 30%, oklch(0.89 0.04 70 / 0.85) 80%)" }}
      />

      {/* Central content */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="rounded-full border border-mocha/30 bg-cream px-4 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-mocha shadow-sm">
          Kind Words
        </span>

        <h2 className="mt-5 font-display font-black leading-none tracking-tight text-espresso" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Our regulars<br />
          <span className="text-mocha">say it best</span>
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-espresso/65 md:text-base">
          Over 2,000 cups served weekly. Loved by locals, discovered by visitors, and remembered by everyone who sits down.
        </p>

        {/* Star row */}
        <div className="mt-5 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5 fill-mocha text-mocha" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm font-bold text-espresso">4.9</span>
          <span className="ml-1 text-xs text-espresso/50">· 340+ reviews</span>
        </div>

        {/* Featured quote */}
        <blockquote className="mt-6 rounded-2xl border border-espresso/10 bg-cream/80 px-6 py-5 text-sm leading-relaxed text-espresso/80 shadow-lg backdrop-blur-sm">
          "The flat white here ruined every other café for me. The latte art alone is worth the visit — but the flavor is what keeps me coming back."
          <footer className="mt-3 text-[11px] font-bold uppercase tracking-wider text-mocha">— Emma R., Regular since 2022</footer>
        </blockquote>
      </motion.div>
    </section>
  );
}
