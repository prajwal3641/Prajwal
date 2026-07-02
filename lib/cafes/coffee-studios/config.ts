/**
 * ─── Cafe Identity Config ────────────────────────────────────────────────────
 * Change the values here to rebrand the entire cafe page.
 * Every string, logo, and contact detail is sourced from this file.
 */

export const cafeConfig = {
  /* ── Identity ── */
  name: "Artisan Bean",
  tagline: "Coffee Co.",
  fullName: "Artisan Bean Coffee Co.",
  description: "Hand-picked, slow-roasted, and brewed with care. Serving the neighborhood since 2019.",
  since: "2019",

  /**
   * Logo — set `image` to a public path to use a custom image.
   * Leave as empty string "" to use the auto-generated monogram logo.
   */
  logo: {
    image: "",               // e.g. "/cafes/coffee-studios/assets/logo-badge.png"
    monogramLetters: "AB",   // shown when no image — initials of the cafe name
    monogramBg: "#3b2019",   // espresso
    monogramFg: "#f5ede8",   // cream
  },

  /* ── Contact ── */
  address:  "214 Roasters Lane, Old Town District",
  phone:    "+1 (415) 555-0142",
  email:    "hello@artisanbean.co",
  hours:    "Mon–Fri 7:00–19:00\nSat–Sun 8:00–20:00",

  /* ── Social ── */
  instagram: "#",
  facebook:  "#",
  twitter:   "#",

  /* ── Hero copy ── */
  heroWords: ["Artisan", "Bean", "Coffee Co."],
  heroSubtitle: "Single-origin Colombian beans, roasted in-house, brewed with intention — every cup, every time.",

  /* ── Stats ── */
  stats: [
    { value: "2,000+", label: "Cups weekly" },
    { value: "340+",   label: "Reviews"     },
    { value: "4.9",    label: "Star rating" },
  ],

  /* ── Footer ── */
  copyright: "2026 Artisan Bean Coffee Co.",
};

export type CafeConfig = typeof cafeConfig;
