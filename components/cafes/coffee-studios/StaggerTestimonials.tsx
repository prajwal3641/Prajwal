"use client";

import React, { useEffect, useRef, useState } from "react";

const SQRT_5000 = Math.sqrt(5000);
const SPEED     = 0.00016; // cards per ms → ~1 card every 6 seconds

const ESPRESSO = "#3b2019";
const CREAM    = "#f5ede8";

const TESTIMONIALS = [
  { id: 0,  quote: "The flat white here ruined every other café for me. The latte art alone is worth the trip.",             by: "Emma R., Regular since 2022",    img: "https://i.pravatar.cc/150?img=1"  },
  { id: 1,  quote: "You can actually taste the difference single-origin Colombian beans make. Remarkable.",                   by: "Marcus T., Coffee enthusiast",   img: "https://i.pravatar.cc/150?img=2"  },
  { id: 2,  quote: "Best Turkish coffee in the neighbourhood. I write three chapters here every week.",                       by: "Sofía L., Local writer",         img: "https://i.pravatar.cc/150?img=3"  },
  { id: 3,  quote: "Stumbled in for an espresso and stayed for three. A real coffee education.",                              by: "Daniel K., Visited from Lisbon", img: "https://i.pravatar.cc/150?img=4"  },
  { id: 4,  quote: "Their cold brew is dangerously smooth. My weekend ritual is officially booked here.",                     by: "Priya N., Saturday regular",     img: "https://i.pravatar.cc/150?img=5"  },
  { id: 5,  quote: "Reliable Wi-Fi, quiet mornings, and the cappuccino is always perfect. My second studio.",                 by: "Owen B., Remote designer",       img: "https://i.pravatar.cc/150?img=6"  },
  { id: 6,  quote: "If I could give 6 stars, I'd give 7. The espresso bar alone justifies the visit.",                       by: "André C., Head of Design",       img: "https://i.pravatar.cc/150?img=7"  },
  { id: 7,  quote: "Took some convincing, but now we're here, we're never going back. Never.",                               by: "Pam D., Marketing Director",     img: "https://i.pravatar.cc/150?img=8"  },
  { id: 8,  quote: "The rooftop seating and the maple pecan latte? Honestly life-changing combination.",                      by: "Naomi F., Freelance architect",  img: "https://i.pravatar.cc/150?img=9"  },
  { id: 9,  quote: "Switched five years ago and haven't looked elsewhere since. It's just the best.",                         by: "James W., DevOps engineer",      img: "https://i.pravatar.cc/150?img=10" },
  { id: 10, quote: "The baristas walk you through every origin on the menu. That care shows in every cup.",                   by: "Aria M., UX researcher",         img: "https://i.pravatar.cc/150?img=11" },
  { id: 11, quote: "House-made pastries baked every morning. The almond croissant is pure perfection.",                       by: "Lea V., Food blogger",           img: "https://i.pravatar.cc/150?img=12" },
];

const N = TESTIMONIALS.length;

export function StaggerTestimonials() {
  const [cardSize, setCardSize]  = useState(365);
  const cardSizeRef              = useRef(365);
  const cardRefs                 = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef                = useRef(false);
  const offsetRef                = useRef(0);

  /* Responsive card width */
  useEffect(() => {
    const update = () => {
      const size = window.matchMedia("(min-width:640px)").matches ? 365 : 290;
      setCardSize(size);
      cardSizeRef.current = size;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* rAF animation loop — bypasses React to keep 60 fps smooth */
  useEffect(() => {
    let animId: number;
    let lastT: number | null = null;

    const tick = (t: number) => {
      const dt = lastT !== null ? t - lastT : 0;
      lastT = t;

      if (!pausedRef.current) offsetRef.current += SPEED * dt;

      const cs = cardSizeRef.current;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        /* Wrap index into continuous float position centred at 0 */
        let pos = ((i - offsetRef.current) % N + N) % N;
        if (pos > N / 2) pos -= N;

        const absPos   = Math.abs(pos);
        const isCenter = absPos < 0.45;

        /* Smooth sinusoidal y-wave and rotation for non-centre cards */
        const x   = (cs / 1.5) * pos;
        const y   = isCenter ? -65 : Math.sin(pos * 1.1) * 18;
        const rot = Math.sin(pos * 0.8) * 2.5;
        const z   = Math.max(0, Math.round(10 - absPos * 2));

        el.style.transform       = `translate(-50%,-50%) translateX(${x}px) translateY(${y}px) rotate(${rot}deg)`;
        el.style.zIndex          = String(z);
        el.style.opacity         = absPos > N / 2 - 0.5 ? "0" : "1";
        el.style.backgroundColor = isCenter ? ESPRESSO : CREAM;
        el.style.color           = isCenter ? CREAM    : ESPRESSO;
        el.style.borderColor     = isCenter ? ESPRESSO : "rgba(59,32,25,0.15)";
        el.style.boxShadow       = isCenter ? "0px 8px 0px 4px rgba(59,32,25,0.22)" : "none";
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []); // runs once — reads everything via refs

  return (
    <section className="relative w-full bg-sand/30 py-12">
      {/* Header */}
      <div className="mb-2 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mocha">Kind Words</span>
        <h2 className="mt-1 font-display text-3xl font-bold text-espresso md:text-4xl">
          What our regulars say
        </h2>
      </div>

      {/* Stage */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 600 }}
        onMouseEnter={() => { pausedRef.current = true;  }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute left-1/2 top-1/2 border-2 p-8"
            style={{
              width: cardSize,
              height: cardSize,
              clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
              /* initial colours — overwritten by rAF immediately */
              backgroundColor: CREAM,
              color:           ESPRESSO,
              borderColor:     "rgba(59,32,25,0.15)",
            }}
          >
            {/* Diagonal slash on clipped corner */}
            <span
              className="absolute block origin-top-right rotate-45"
              style={{ right: -2, top: 48, width: SQRT_5000, height: 2, backgroundColor: "rgba(59,32,25,0.1)" }}
            />

            {/* Avatar */}
            <img
              src={t.img}
              alt={t.by.split(",")[0]}
              className="mb-4 h-14 w-12 object-cover object-top"
              loading="lazy"
            />

            {/* Quote — inherits colour from parent */}
            <p className="text-base font-medium leading-snug sm:text-lg">
              "{t.quote}"
            </p>

            {/* Attribution */}
            <p className="absolute bottom-8 left-8 right-8 text-sm italic" style={{ opacity: 0.58 }}>
              — {t.by}
            </p>
          </div>
        ))}

        {/* Left / right edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-sand/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-sand/80 to-transparent" />

        {/* Hover hint */}
        <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-espresso/30">
          hover to pause
        </p>
      </div>
    </section>
  );
}
