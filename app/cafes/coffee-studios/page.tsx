"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Instagram, Facebook, Twitter,
  MapPin, Phone, Mail, Clock, Star,
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/cafes/coffee-studios/ui/carousel";
import { FullMenuDialog } from "@/components/cafes/coffee-studios/FullMenuDialog";

/* ─── Assets ─────────────────────────────────────── */
const heroSplash  = "/cafes/coffee-studios/assets/hero-splash.png";
const beansBag    = "/cafes/coffee-studios/assets/beans-bag.png";
const barista     = "/cafes/coffee-studios/assets/barista.png";
const brewing     = "/cafes/coffee-studios/assets/brewing.png";
const decorCorner = "/cafes/coffee-studios/assets/decor-corner.png";
const beansSmall  = "/cafes/coffee-studios/assets/beans-small.png";
const stepHarvest = "/cafes/coffee-studios/assets/step-harvest.png";
const stepRoast   = "/cafes/coffee-studios/assets/step-roast.png";
const stepGrind   = "/cafes/coffee-studios/assets/step-grind.png";
const stepBrew    = "/cafes/coffee-studios/assets/step-brew.png";
const logoBadge   = "/cafes/coffee-studios/assets/logo-badge.png";
const newDrinkImg = "/cafes/coffee-studios/assets/new-drink-iced-latte.png";
const M = "/cafes/coffee-studios/assets/menu/";

/* ─── Animation variants ─────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const slideRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ─── Helpers ────────────────────────────────────── */
const VP = { once: true, margin: "-80px" } as const;

const navLinks = ["MENU", "ABOUT", "REVIEWS", "GALLERY", "CONTACT"];

const menuCategories = {
  "Classic Drinks": [
    { name: "Americano",    price: "$4.50", img: `${M}americano.jpg`,    desc: "Bold espresso with hot water" },
    { name: "Espresso",     price: "$3.50", img: `${M}espresso.jpg`,     desc: "Pure, concentrated shot" },
    { name: "Iced Coffee",  price: "$5.00", img: `${M}iced-coffee.jpg`,  desc: "Chilled brew over ice" },
    { name: "Cappuccino",   price: "$5.50", img: `${M}cappuccino.jpg`,   desc: "Espresso with velvety foam" },
    { name: "Macchiato",    price: "$4.00", img: `${M}macchiato.jpg`,    desc: "Espresso marked with milk" },
    { name: "Cold Brew",    price: "$6.00", img: `${M}cold-brew.jpg`,    desc: "12-hour steeped perfection" },
    { name: "Flat White",   price: "$5.50", img: `${M}flat-white.jpg`,   desc: "Silky microfoam on espresso" },
    { name: "Latte",        price: "$5.50", img: `${M}latte.jpg`,        desc: "Smooth espresso & steamed milk" },
    { name: "Hot Chocolate",price: "$4.50", img: `${M}hot-chocolate.jpg`,desc: "Rich Belgian cocoa blend" },
  ],
  "Signature Drinks": [
    { name: "Maple Pecan Latte",        price: "$7.00", img: `${M}maple-pecan-latte.jpg`,        desc: "Warm autumn spice & maple" },
    { name: "Honey Lavender",           price: "$6.50", img: `${M}honey-lavender.jpg`,           desc: "Floral & delicate" },
    { name: "Vanilla Bean Mocha",       price: "$7.00", img: `${M}vanilla-bean-mocha.jpg`,       desc: "Smooth mocha with real vanilla" },
    { name: "Salted Caramel Macchiato", price: "$7.00", img: `${M}salted-caramel-macchiato.jpg`, desc: "Sweet meets savory perfection" },
    { name: "Espresso Tonic",           price: "$6.50", img: `${M}espresso-tonic.jpg`,           desc: "Crisp & refreshingly bold" },
    { name: "Cinnamon Cold Foam",       price: "$6.50", img: `${M}cinnamon-cold-foam.jpg`,       desc: "Airy foam with warm spice" },
    { name: "Rose Cardamom Latte",      price: "$7.50", img: `${M}rose-cardamom-latte.jpg`,      desc: "Exotic floral warmth" },
    { name: "Smoky Hazelnut",           price: "$7.00", img: `${M}smoky-hazelnut.jpg`,           desc: "Deep roasted nuttiness" },
    { name: "Brown Butter Mocha",       price: "$7.50", img: `${M}brown-butter-mocha.jpg`,       desc: "Rich, indulgent, complex" },
  ],
  "Desserts": [
    { name: "Affogato",         price: "$5.50", img: `${M}affogato.jpg`,         desc: "Espresso poured over gelato" },
    { name: "Tiramisu",         price: "$6.50", img: `${M}tiramisu.jpg`,         desc: "Classic Italian dream" },
    { name: "Cheesecake",       price: "$6.00", img: `${M}cheesecake.jpg`,       desc: "Creamy New York style" },
    { name: "Chocolate Brownie",price: "$4.50", img: `${M}chocolate-brownie.jpg`,desc: "Fudgy & warm from the oven" },
    { name: "Almond Croissant", price: "$4.00", img: `${M}almond-croissant.jpg`, desc: "Buttery, flaky, irresistible" },
    { name: "Pistachio Cookie", price: "$3.50", img: `${M}pistachio-cookie.jpg`, desc: "House-baked daily" },
    { name: "Cinnamon Roll",    price: "$4.50", img: `${M}cinnamon-roll.jpg`,    desc: "Soft, gooey, glazed" },
    { name: "Banana Bread",     price: "$3.50", img: `${M}banana-bread.jpg`,     desc: "Moist & naturally sweet" },
    { name: "Crème Brûlée",     price: "$7.00", img: `${M}creme-brulee.jpg`,     desc: "Torched caramel crown" },
  ],
} as const;

type MenuCategory = keyof typeof menuCategories;

/* ─── Page ────────────────────────────────────────── */
export default function CoffeeStudiosPage() {
  const categoryNames = Object.keys(menuCategories) as MenuCategory[];
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Classic Drinks");
  const [menuOpen, setMenuOpen] = useState(false);
  const activeItems = menuCategories[activeCategory];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* scroll-based nav frosted glass */
  const { scrollY } = useScroll();
  const navBgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  /* hero parallax */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const coffeeY   = useTransform(heroP, [0, 1], ["0%", "22%"]);
  const heroTextY = useTransform(heroP, [0, 1], ["0%", "12%"]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream font-body text-espresso">
      <div className="mx-auto w-full max-w-[1400px] bg-cream shadow-2xl">

        {/* ── STICKY NAV ──────────────────────────────── */}
        <div className="sticky top-0 z-50">
          <motion.div
            className="absolute inset-0 bg-cream/90 backdrop-blur-md border-b border-espresso/10"
            style={{ opacity: navBgOpacity }}
          />
          <nav className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <img src={logoBadge} alt="Artisan Bean" width={816} height={816} className="h-14 w-14 object-contain" />
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden justify-center gap-6 text-sm font-bold tracking-wide text-espresso md:flex lg:gap-10"
            >
              {navLinks.map((l) => (
                <motion.li
                  key={l}
                  className="cursor-pointer hover:text-mocha relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {l}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-mocha transition-all duration-300 group-hover:w-full" />
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden rounded-full bg-espresso px-5 py-2 text-xs font-semibold tracking-wide text-cream transition hover:bg-mocha md:inline-block"
            >
              ORDER NOW
            </motion.button>
          </nav>
        </div>

        {/* ── HERO ────────────────────────────────────── */}
        <section ref={heroRef} className="relative bg-sand/40 pb-12 pt-8">
          <motion.img
            src={decorCorner} alt=""
            className="pointer-events-none absolute -right-10 -top-10 w-64 opacity-70"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.7, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.img
            src={beansSmall} alt=""
            className="pointer-events-none absolute left-2 top-44 w-16 rotate-12 opacity-80"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ rotate: 12 }}
          />

          <div className="relative z-10 mt-4 grid grid-cols-1 items-center gap-4 px-6 sm:grid-cols-[1fr_1.3fr] md:gap-10 md:px-12 lg:gap-14 lg:px-20">
            {/* Text */}
            <motion.div
              className="relative z-20 text-center sm:text-left"
              style={{ y: heroTextY }}
            >
              <motion.h1
                className="font-display font-black leading-[0.95] tracking-tight text-espresso"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              >
                {["Artisan", "Bean", "Coffee Co."].map((word) => (
                  <motion.span
                    key={word}
                    className="block"
                    variants={{
                      hidden: { opacity: 0, y: 50, rotateX: -15 },
                      visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE } },
                    }}
                    style={{ transformOrigin: "0% 50%", display: "block" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start md:mt-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
              >
                <motion.button
                  onClick={() => setMenuOpen(true)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="rounded-full border-2 border-espresso bg-transparent px-6 py-2.5 text-xs font-semibold tracking-wide text-espresso transition hover:bg-espresso hover:text-cream md:px-8 md:py-3 md:text-sm"
                >
                  VIEW MENU
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="rounded-full border-2 border-espresso bg-espresso px-6 py-2.5 text-xs font-semibold tracking-wide text-cream transition hover:bg-mocha hover:border-mocha md:px-8 md:py-3 md:text-sm"
                >
                  ORDER NOW
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Coffee image — parallax + float */}
            <motion.div
              className="relative z-30 mx-auto mt-3 aspect-square w-full max-w-sm sm:mt-8 sm:max-w-none md:mt-10 lg:mt-12"
              style={{ y: coffeeY }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
              <motion.img
                src={heroSplash}
                alt="Coffee splash"
                width={1024} height={1024}
                className="pointer-events-none h-full w-full object-contain object-center sm:scale-115 md:scale-125 lg:scale-[1.35]"
                animate={{ y: [-12, 12] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              <motion.span
                className="absolute bottom-6 right-2 rounded-sm bg-cream/80 px-2 py-1 text-[8px] font-bold tracking-widest text-espresso sm:right-0 md:text-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                CUSTOM<br />LATTE ART
              </motion.span>
            </motion.div>
          </div>
        </section>

        {/* ── NEW DRINK PROMO ──────────────────────────── */}
        <section
          className="relative z-0 overflow-hidden bg-[#f3c9ce]"
          style={{ paddingInline: "clamp(1.25rem, 4vw, 5rem)", paddingBlock: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          <div className="grid grid-cols-1 items-center md:grid-cols-[1.2fr_1fr]" style={{ gap: "clamp(1.5rem, 3vw, 3rem)" }}>
            <motion.div
              className="relative order-1 text-center md:text-left"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -translate-x-1/2 select-none font-display font-black leading-[0.7] tracking-tighter text-espresso/10 md:left-0 md:translate-x-0" style={{ top: "clamp(-4rem, -4vw, -1.5rem)", fontSize: "clamp(10rem, 22vw, 18rem)" }}>New</span>
              <div className="relative">
                <div className="flex items-baseline justify-center md:justify-start" style={{ gap: "clamp(0.5rem, 1vw, 1rem)" }}>
                  <h2 className="font-display font-black leading-none tracking-tighter text-espresso" style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}>drink</h2>
                  <span className="font-display font-medium italic tracking-wider text-mocha" style={{ fontSize: "clamp(1.25rem, 2.4vw, 2rem)" }}>collection</span>
                </div>
                <div className="mx-auto max-w-md md:mx-0" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
                  <h3 className="mx-auto inline-block font-display font-bold text-espresso md:mx-0 md:block md:border-l-4 md:border-espresso/70 md:pl-5" style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}>Iced Latte</h3>
                  <p className="font-light leading-relaxed text-espresso/75" style={{ marginTop: "clamp(0.75rem, 1.2vw, 1.25rem)", fontSize: "clamp(0.9rem, 1.15vw, 1.125rem)" }}>A refreshing coffee drink made with espresso, cold milk, and ice. It has a smooth, light flavor, balancing the strength of espresso with the creaminess of milk.</p>
                </div>
              </div>
              <div className="hidden max-w-lg md:block" style={{ marginTop: "clamp(2rem, 3.5vw, 3rem)" }}>
                <div className="grid grid-cols-3 divide-x divide-cream/15 overflow-hidden rounded-2xl bg-espresso text-cream shadow-[0_25px_60px_-25px_rgba(59,32,25,0.55)]" style={{ paddingInline: "clamp(0.5rem, 1vw, 1rem)", paddingBlock: "clamp(1.25rem, 1.8vw, 1.75rem)" }}>
                  {[{ v: "3", l: "Syrups" }, { v: "With", l: "Milk + Ice" }, { v: "20%", l: "Off Now" }].map((s) => (
                    <div key={s.l} className="flex min-w-0 flex-col items-center justify-center text-center" style={{ paddingInline: "clamp(0.5rem, 1vw, 1rem)" }}>
                      <div className="font-display font-black leading-none" style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)" }}>{s.v}</div>
                      <div className="mt-2 font-bold uppercase text-cream/60" style={{ fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)", letterSpacing: "0.25em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image — static, price badge highlighted */}
            <motion.div
              className="relative order-2 flex items-center justify-center"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
            >
              <img
                src={newDrinkImg} alt="Iced Latte"
                width={1024} height={1280} loading="lazy"
                className="relative z-0 ml-auto h-auto w-full object-contain"
                style={{ maxWidth: "clamp(18rem, 30vw, 26rem)" }}
              />
              {/* Highlighted price badge */}
              <motion.div
                className="absolute z-20 flex -rotate-6 flex-col items-center justify-center rounded-full bg-espresso text-cream ring-[#f3c9ce]"
                style={{
                  height: "clamp(7rem, 13vw, 12rem)",
                  width: "clamp(7rem, 13vw, 12rem)",
                  bottom: "clamp(0.5rem, 1.5vw, 1.5rem)",
                  left: "clamp(-0.25rem, 0.5vw, 0.75rem)",
                  boxShadow: "0 0 0 4px #f3c9ce, 0 20px 50px -10px rgba(59,32,25,0.65)",
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-bold uppercase text-cream/60" style={{ fontSize: "clamp(0.55rem, 0.75vw, 0.75rem)", letterSpacing: "0.28em" }}>Only</span>
                <span className="font-display font-black leading-none text-cream" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.25rem)" }}>6.50$</span>
                <span className="font-display font-semibold text-cream/50 line-through" style={{ fontSize: "clamp(0.7rem, 0.95vw, 1rem)" }}>7.80$</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SPECIALTIES ─────────────────────────────── */}
        <section className="relative bg-sand/20 px-6 pb-12 pt-10">
          <motion.img src={beansSmall} alt="" className="pointer-events-none absolute right-4 top-2 w-14 -rotate-12 opacity-70" loading="lazy"
            initial={{ opacity: 0, rotate: -20, x: 20 }}
            whileInView={{ opacity: 0.7, rotate: -12, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.8 }}
          />
          <motion.h2
            className="font-display text-3xl font-bold text-espresso"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}
          >
            Our specialties:
          </motion.h2>

          <motion.div
            className="mt-6 grid grid-cols-3 gap-4 md:mt-10 md:gap-8 lg:gap-12"
            variants={stagger} initial="hidden" whileInView="visible" viewport={VP}
          >
            {[
              { img: beansBag, text: <>We use only selected<br />Colombian blends</> },
              { img: barista,  text: <>Our baristas are true artists!<br />Custom latte art</> },
              { img: brewing,  text: <>We use several brewing<br />methods: Turkish coffee<br />and espresso machine</> },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mx-auto aspect-square w-full max-w-[260px]">
                    <img src={s.img} alt="" className="block h-full w-full object-contain object-center" loading="lazy" />
                  </div>
                  <p className="mt-3 text-[11px] leading-snug text-espresso md:mt-5 md:text-sm lg:text-base">{s.text}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── MENU ────────────────────────────────────── */}
        <section className="relative bg-cream px-6 pb-16 pt-12 md:px-10 lg:px-14">
          <motion.img src={beansSmall} alt="" className="pointer-events-none absolute left-4 top-4 w-16 -rotate-12 opacity-60" loading="lazy"
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={VP}
          />

          {/* Header */}
          <motion.div
            className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mocha">What we brew</span>
              <h2 className="mt-1 font-display text-4xl font-black text-espresso md:text-5xl lg:text-6xl">Our Menu</h2>
            </div>
            <motion.button
              onClick={() => setMenuOpen(true)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="shrink-0 rounded-full border-2 border-espresso bg-espresso px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream transition hover:bg-mocha hover:border-mocha"
            >
              Full Menu →
            </motion.button>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            className="mt-8 flex flex-wrap gap-2"
            variants={staggerFast} initial="hidden" whileInView="visible" viewport={VP}
          >
            {categoryNames.map((c) => (
              <motion.button
                key={c}
                variants={fadeUp}
                onClick={() => setActiveCategory(c)}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === c
                    ? "border-espresso bg-espresso text-cream shadow-lg"
                    : "border-espresso/30 bg-transparent text-espresso hover:border-espresso"
                }`}
              >
                {c}
              </motion.button>
            ))}
          </motion.div>

          {/* Item cards */}
          <motion.div
            key={activeCategory}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5"
            variants={stagger} initial="hidden" animate="visible"
          >
            {activeItems.map((item) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group overflow-hidden rounded-2xl border border-espresso/10 bg-sand/30 shadow-sm hover:shadow-xl hover:shadow-espresso/10 transition-shadow duration-300"
              >
                <div className="aspect-square overflow-hidden bg-sand/50">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="text-sm font-bold leading-tight text-espresso md:text-base">{item.name}</div>
                  <div className="mt-1 text-[11px] leading-snug text-espresso/60 md:text-xs">{item.desc}</div>
                  <div className="mt-2 font-display text-base font-black text-mocha md:text-lg">{item.price}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── STEPS ───────────────────────────────────── */}
        <section className="relative bg-sand/30 px-6 pb-10 pt-8 md:pb-14 md:pt-12">
          <motion.div
            className="text-center"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mocha">Our Process</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-espresso md:text-4xl lg:text-5xl">How our coffee is made</h2>
            <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-espresso/70 md:text-sm">From the highlands of Colombia to your cup — every bean travels through four careful steps before reaching your hands.</p>
          </motion.div>

          <motion.div
            className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-8 lg:mt-10 lg:grid-cols-4 lg:gap-6"
            variants={stagger} initial="hidden" whileInView="visible" viewport={VP}
          >
            {[
              { n: "01", img: stepHarvest, title: "Hand-picked",     desc: "Only the ripest cherries are selected from family-run Colombian farms at peak season." },
              { n: "02", img: stepRoast,   title: "Slow-roasted",    desc: "Beans are drum-roasted in small batches to coax out deep, balanced flavor notes." },
              { n: "03", img: stepGrind,   title: "Freshly ground",  desc: "We grind to order so essential oils and aromatics never get a chance to fade." },
              { n: "04", img: stepBrew,    title: "Carefully brewed",desc: "Each cup is poured with precision — espresso, pour-over, or traditional Turkish." },
            ].map((s) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="flex flex-col items-center text-center"
              >
                <div className="mx-auto aspect-square w-full max-w-[130px] sm:max-w-[180px] lg:max-w-[200px]">
                  <img src={s.img} alt={s.title} className="block h-full w-full object-contain object-center" loading="lazy" width={1024} height={1024} />
                </div>
                <div className="mt-2 font-display text-[10px] font-bold tracking-widest text-mocha sm:text-xs md:mt-3">STEP {s.n}</div>
                <h3 className="mt-1 font-display text-base font-bold text-espresso sm:text-lg lg:text-xl">{s.title}</h3>
                <p className="mt-1 max-w-[220px] text-[11px] leading-snug text-espresso/70 sm:text-[12px] sm:leading-relaxed md:mt-2">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── REVIEWS ─────────────────────────────────── */}
        <section className="relative bg-cream px-6 pb-14 pt-12">
          <motion.img src={beansSmall} alt="" className="pointer-events-none absolute right-6 top-6 w-14 rotate-12 opacity-60" loading="lazy"
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={VP}
          />
          <motion.div
            className="text-center"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mocha">Kind Words</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-espresso md:text-4xl lg:text-5xl">What our customers say</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Carousel opts={{ align: "start", loop: true }} className="mt-10">
              <CarouselContent className="-ml-4">
                {[
                  { name: "Emma R.",    role: "Regular since 2022",  rating: 5, quote: "The flat white here ruined every other café for me. The latte art alone is worth the visit — but the flavor is what keeps me coming back." },
                  { name: "Marcus T.", role: "Coffee enthusiast",    rating: 5, quote: "Finally a place that treats coffee like a craft. You can taste the difference single-origin Colombian beans make when they're roasted with care." },
                  { name: "Sofía L.",  role: "Local writer",         rating: 5, quote: "Warm corner, warmer staff, the best Turkish coffee in the neighborhood. I write three chapters a week from the window seat." },
                  { name: "Daniel K.", role: "Visited from Lisbon",  rating: 5, quote: "Stumbled in for an espresso and stayed for three. The barista walked me through every origin on the menu. A real coffee education." },
                  { name: "Priya N.",  role: "Saturday regular",     rating: 4, quote: "Their cold brew is dangerously smooth and the pastries pair beautifully. My weekend ritual is officially booked here." },
                  { name: "Owen B.",   role: "Remote designer",      rating: 5, quote: "Reliable Wi-Fi, quiet mornings, and the cappuccino is always perfect. It's basically my second studio at this point." },
                ].map((r) => (
                  <CarouselItem key={r.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      className="flex h-full flex-col rounded-2xl border border-espresso/15 bg-sand/30 p-6"
                      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(59,32,25,0.1)", transition: { duration: 0.3 } }}
                    >
                      <div className="flex gap-0.5 text-mocha">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "fill-none text-mocha/30"}`} />)}
                      </div>
                      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-espresso/85">"{r.quote}"</p>
                      <div className="mt-4 border-t border-espresso/10 pt-3">
                        <div className="text-sm font-bold text-espresso">{r.name}</div>
                        <div className="text-[10px] uppercase tracking-wider text-espresso/60">{r.role}</div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 border-espresso/30 bg-cream text-espresso hover:bg-espresso hover:text-cream md:-left-4" />
              <CarouselNext className="-right-2 border-espresso/30 bg-cream text-espresso hover:bg-espresso hover:text-cream md:-right-4" />
            </Carousel>
          </motion.div>
        </section>

        {/* ── CONTACT ─────────────────────────────────── */}
        <section className="relative overflow-hidden bg-sand/40 px-6 pb-14 pt-12">
          <motion.img src={beansSmall} alt="" className="pointer-events-none absolute -left-4 top-4 w-16 -rotate-12 opacity-60" loading="lazy" initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={VP} />
          <motion.img src={beansSmall} alt="" className="pointer-events-none absolute bottom-6 right-2 w-14 rotate-45 opacity-50" loading="lazy" initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} viewport={VP} />

          <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mocha">Pull Up A Chair</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-espresso md:text-4xl lg:text-5xl">Come say hello</h2>
            <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-espresso/70 md:text-sm">Stop by for a cup, book the space for an event, or just drop a note. We answer every message — usually before the espresso machine warms up.</p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <motion.div
              className="relative rounded-2xl bg-espresso p-6 text-cream shadow-xl md:p-8"
              variants={slideLeft} initial="hidden" whileInView="visible" viewport={VP}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="pointer-events-none absolute inset-2 rounded-xl border border-cream/15" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/70">
                  <span className="inline-block h-px w-6 bg-cream/40" />Today's Specials
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-cream md:text-3xl">Find us &<br />visit anytime</h3>
                <ul className="mt-6 space-y-5">
                  {[
                    { Icon: MapPin, label: "The Café",    value: "214 Roasters Lane, Old Town District" },
                    { Icon: Clock,  label: "Brew Hours",  value: "Mon–Fri 7:00–19:00\nSat–Sun 8:00–20:00" },
                    { Icon: Phone,  label: "Ring Us",     value: "+1 (415) 555-0142" },
                    { Icon: Mail,   label: "Write Us",    value: "hello@artisanbean.co" },
                  ].map(({ Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream/25 bg-cream/5"><Icon className="h-4 w-4 text-cream" /></span>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60">{label}</div>
                        <div className="mt-0.5 whitespace-pre-line text-sm text-cream">{value}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center gap-3 border-t border-cream/15 pt-5 text-[11px] uppercase tracking-[0.25em] text-cream/60">
                  <span>Follow</span>
                  <div className="flex gap-2">
                    {[Instagram, Facebook, Twitter].map((Icon, i) => (
                      <motion.a key={i} href="#" whileHover={{ scale: 1.15 }} className="grid h-8 w-8 place-items-center rounded-full border border-cream/25 transition hover:bg-cream hover:text-espresso">
                        <Icon className="h-3.5 w-3.5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form
              onSubmit={(e) => e.preventDefault()}
              className="relative rounded-2xl border-2 border-dashed border-espresso/25 bg-cream p-6 shadow-lg md:p-8"
              variants={slideRight} initial="hidden" whileInView="visible" viewport={VP}
            >
              <div className="flex items-center justify-between border-b border-dashed border-espresso/25 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">☕</span>
                  <div>
                    <div className="font-display text-base font-bold text-espresso">Order Ticket</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-espresso/60">Send us a note</div>
                  </div>
                </div>
                <div className="text-right text-[10px] uppercase tracking-wider text-espresso/50">No. <span className="font-bold text-espresso">#0042</span></div>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  { label: "Name",  type: "text",  placeholder: "Jane Barista" },
                  { label: "Email", type: "email", placeholder: "you@cafeletter.com" },
                ].map((f) => (
                  <label key={f.label} className="block">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-mocha">{f.label}</span>
                    <input type={f.type} placeholder={f.placeholder} className="mt-1 w-full border-0 border-b border-espresso/25 bg-transparent px-0 py-2 text-sm text-espresso placeholder:text-espresso/35 focus:border-espresso focus:outline-none focus:ring-0" />
                  </label>
                ))}
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-mocha">Your Order</span>
                  <textarea rows={4} placeholder="One double espresso and a question about…" className="mt-1 w-full resize-none border-0 border-b border-espresso/25 bg-transparent px-0 py-2 text-sm text-espresso placeholder:text-espresso/35 focus:border-espresso focus:outline-none focus:ring-0" />
                </label>
              </div>
              <div className="mt-6 border-t border-dashed border-espresso/25 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-cream transition hover:bg-mocha"
                >
                  Brew & Send
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
                <div className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-espresso/50">Thank you — enjoy your coffee</div>
              </div>
            </motion.form>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────── */}
        <motion.footer
          className="bg-espresso px-6 py-10 text-cream"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="font-display text-2xl font-bold leading-tight">Artisan Bean<br />Coffee Co.</div>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-cream/70">Hand-picked, slow-roasted, and brewed with care. Serving the neighborhood since 2019.</p>
              <div className="mt-5 flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <motion.a key={i} href="#" whileHover={{ scale: 1.15 }} className="grid h-9 w-9 place-items-center rounded-full border border-cream/30 transition hover:bg-cream hover:text-espresso">
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60">Explore</div>
              <ul className="mt-3 space-y-2 text-sm">
                {["Menu", "About", "Reviews", "Gallery", "Contact"].map((l) => (
                  <li key={l}><a href="#" className="text-cream/80 hover:text-cream transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60">Newsletter</div>
              <p className="mt-3 text-xs text-cream/70">Brews, beans & seasonal blends.</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex overflow-hidden rounded-full border border-cream/30">
                <input type="email" placeholder="Email" className="flex-1 bg-transparent px-4 py-2 text-xs text-cream placeholder:text-cream/50 focus:outline-none" />
                <button type="submit" className="bg-cream px-4 text-[10px] font-bold tracking-wider text-espresso transition hover:bg-cream/90">JOIN</button>
              </form>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-5 text-[11px] text-cream/60 md:flex-row">
            <div>© 2026 Artisan Bean Coffee Co. All rights reserved.</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-cream">Privacy</a>
              <a href="#" className="hover:text-cream">Terms</a>
            </div>
          </div>
        </motion.footer>
      </div>

      <FullMenuDialog open={menuOpen} onOpenChange={setMenuOpen} />
    </main>
  );
}
