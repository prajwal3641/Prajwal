"use client";

import { useMemo, useRef, useState } from "react";
import { Search, X, Leaf } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/cafes/coffee-studios/ui/dialog";

const americano      = "/cafes/coffee-studios/assets/menu/americano.jpg";
const espresso       = "/cafes/coffee-studios/assets/menu/espresso.jpg";
const cappuccino     = "/cafes/coffee-studios/assets/menu/cappuccino.jpg";
const latte          = "/cafes/coffee-studios/assets/menu/latte.jpg";
const flatWhite      = "/cafes/coffee-studios/assets/menu/flat-white.jpg";
const macchiato      = "/cafes/coffee-studios/assets/menu/macchiato.jpg";
const coldBrew       = "/cafes/coffee-studios/assets/menu/cold-brew.jpg";
const icedCoffee     = "/cafes/coffee-studios/assets/menu/iced-coffee.jpg";
const hotChocolate   = "/cafes/coffee-studios/assets/menu/hot-chocolate.jpg";
const maplePecan     = "/cafes/coffee-studios/assets/menu/maple-pecan-latte.jpg";
const honeyLavender  = "/cafes/coffee-studios/assets/menu/honey-lavender.jpg";
const vanillaMocha   = "/cafes/coffee-studios/assets/menu/vanilla-bean-mocha.jpg";
const saltedCaramel  = "/cafes/coffee-studios/assets/menu/salted-caramel-macchiato.jpg";
const espressoTonic  = "/cafes/coffee-studios/assets/menu/espresso-tonic.jpg";
const cinnamonFoam   = "/cafes/coffee-studios/assets/menu/cinnamon-cold-foam.jpg";
const roseCardamom   = "/cafes/coffee-studios/assets/menu/rose-cardamom-latte.jpg";
const smokyHazelnut  = "/cafes/coffee-studios/assets/menu/smoky-hazelnut.jpg";
const brownButterMocha = "/cafes/coffee-studios/assets/menu/brown-butter-mocha.jpg";
const affogato       = "/cafes/coffee-studios/assets/menu/affogato.jpg";
const tiramisu       = "/cafes/coffee-studios/assets/menu/tiramisu.jpg";
const cheesecake     = "/cafes/coffee-studios/assets/menu/cheesecake.jpg";
const brownie        = "/cafes/coffee-studios/assets/menu/chocolate-brownie.jpg";
const almondCroissant = "/cafes/coffee-studios/assets/menu/almond-croissant.jpg";
const pistachioCookie = "/cafes/coffee-studios/assets/menu/pistachio-cookie.jpg";
const cinnamonRoll   = "/cafes/coffee-studios/assets/menu/cinnamon-roll.jpg";
const bananaBread    = "/cafes/coffee-studios/assets/menu/banana-bread.jpg";
const cremeBrulee    = "/cafes/coffee-studios/assets/menu/creme-brulee.jpg";

type Item = {
  name: string;
  price: string;
  image: string;
  description: string;
  ingredients: string[];
  sizes?: string[];
};

const categories: { name: string; items: Item[] }[] = [
  {
    name: "Classic Drinks",
    items: [
      { name: "Americano", price: "$2.50", image: americano, description: "A bold shot of espresso lengthened with hot water for a clean, rounded cup.", ingredients: ["Espresso", "Hot water"], sizes: ["Small", "Large"] },
      { name: "Espresso", price: "$1.80", image: espresso, description: "A short, intense pull with a velvety crema and rich aroma.", ingredients: ["Espresso"], sizes: ["Single", "Double"] },
      { name: "Cappuccino", price: "$3.20", image: cappuccino, description: "Equal parts espresso, steamed milk and airy foam — the classic balance.", ingredients: ["Espresso", "Steamed milk", "Milk foam"], sizes: ["Small", "Large"] },
      { name: "Latte", price: "$3.50", image: latte, description: "Silky steamed milk poured over espresso and finished with delicate art.", ingredients: ["Espresso", "Steamed milk"], sizes: ["Small", "Large"] },
      { name: "Flat White", price: "$3.30", image: flatWhite, description: "Double ristretto with microfoam — denser and stronger than a latte.", ingredients: ["Double ristretto", "Microfoam milk"], sizes: ["Regular"] },
      { name: "Macchiato", price: "$2.80", image: macchiato, description: "Espresso 'marked' with a touch of foamed milk. Small but mighty.", ingredients: ["Espresso", "Foamed milk"], sizes: ["Single", "Double"] },
      { name: "Cold Brew", price: "$3.80", image: coldBrew, description: "Steeped slow for 18 hours. Smooth, low-acid, naturally sweet.", ingredients: ["Cold-steeped coffee", "Filtered water", "Ice"], sizes: ["Small", "Large"] },
      { name: "Iced Coffee", price: "$3.20", image: icedCoffee, description: "Freshly brewed and flash-chilled over ice for a crisp finish.", ingredients: ["Espresso", "Cold milk", "Ice"], sizes: ["Small", "Large"] },
      { name: "Hot Chocolate", price: "$3.50", image: hotChocolate, description: "Single-origin cocoa melted into steamed milk. Comfort in a cup.", ingredients: ["Dark cocoa", "Steamed milk", "Sugar"], sizes: ["Small", "Large"] },
    ],
  },
  {
    name: "Signature Drinks",
    items: [
      { name: "Maple Pecan Latte", price: "$4.50", image: maplePecan, description: "Espresso with maple syrup, toasted pecan and silky oat milk.", ingredients: ["Espresso", "Maple syrup", "Pecan praline", "Oat milk"], sizes: ["Small", "Large"] },
      { name: "Honey Lavender", price: "$4.30", image: honeyLavender, description: "Floral lavender steeped with wildflower honey and warm milk.", ingredients: ["Espresso", "Lavender syrup", "Wildflower honey", "Whole milk"], sizes: ["Small", "Large"] },
      { name: "Vanilla Bean Mocha", price: "$4.60", image: vanillaMocha, description: "Madagascar vanilla and dark chocolate fold into a creamy latte.", ingredients: ["Espresso", "Dark chocolate", "Vanilla bean syrup", "Steamed milk"], sizes: ["Small", "Large"] },
      { name: "Salted Caramel Macchiato", price: "$4.40", image: saltedCaramel, description: "Buttery caramel, sea salt flakes and a clean espresso finish.", ingredients: ["Espresso", "Caramel sauce", "Sea salt", "Vanilla", "Milk"], sizes: ["Small", "Large"] },
      { name: "Espresso Tonic", price: "$4.20", image: espressoTonic, description: "Tonic water lifts espresso into something bright and effervescent.", ingredients: ["Espresso", "Tonic water", "Orange peel", "Ice"], sizes: ["Regular"] },
      { name: "Cinnamon Cold Foam", price: "$4.20", image: cinnamonFoam, description: "Cold brew crowned with house-whipped cinnamon foam.", ingredients: ["Cold brew", "Cinnamon", "Cold foam", "Brown sugar"], sizes: ["Small", "Large"] },
      { name: "Rose Cardamom Latte", price: "$4.70", image: roseCardamom, description: "Rose water and cracked cardamom — soft, aromatic and warming.", ingredients: ["Espresso", "Rose syrup", "Cardamom", "Steamed milk"], sizes: ["Small", "Large"] },
      { name: "Smoky Hazelnut", price: "$4.50", image: smokyHazelnut, description: "Toasted hazelnut praline meets a hint of smoked sea salt.", ingredients: ["Espresso", "Hazelnut praline", "Smoked salt", "Milk"], sizes: ["Small", "Large"] },
      { name: "Brown Butter Mocha", price: "$4.80", image: brownButterMocha, description: "Brown butter, dark cocoa and a touch of muscovado sugar.", ingredients: ["Espresso", "Brown butter", "Dark cocoa", "Muscovado", "Milk"], sizes: ["Small", "Large"] },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Affogato", price: "$3.50", image: affogato, description: "Vanilla gelato drowned with a hot shot of fresh espresso.", ingredients: ["Vanilla gelato", "Espresso"] },
      { name: "Tiramisu", price: "$4.20", image: tiramisu, description: "Mascarpone cream layered with coffee-soaked ladyfingers and cocoa.", ingredients: ["Mascarpone", "Ladyfingers", "Espresso", "Cocoa", "Eggs"] },
      { name: "Cheesecake", price: "$4.00", image: cheesecake, description: "New York-style — dense, creamy, with a buttery graham crust.", ingredients: ["Cream cheese", "Graham crust", "Sugar", "Vanilla"] },
      { name: "Chocolate Brownie", price: "$3.20", image: brownie, description: "Fudgy center, crackled top, hits of dark chocolate throughout.", ingredients: ["Dark chocolate", "Butter", "Cocoa", "Eggs", "Flour"] },
      { name: "Almond Croissant", price: "$3.00", image: almondCroissant, description: "Twice-baked, soaked in syrup, filled with almond frangipane.", ingredients: ["Butter pastry", "Almond cream", "Sliced almonds", "Sugar"] },
      { name: "Pistachio Cookie", price: "$2.50", image: pistachioCookie, description: "Soft-baked with Sicilian pistachio butter and flaky salt.", ingredients: ["Pistachio butter", "Brown butter", "Flour", "Flake salt"] },
      { name: "Cinnamon Roll", price: "$3.20", image: cinnamonRoll, description: "Pillow-soft swirls, brown sugar cinnamon, cream cheese glaze.", ingredients: ["Enriched dough", "Cinnamon", "Brown sugar", "Cream cheese glaze"] },
      { name: "Banana Bread", price: "$2.80", image: bananaBread, description: "Slow-baked with ripe bananas, toasted walnuts and brown butter.", ingredients: ["Ripe banana", "Walnuts", "Brown butter", "Flour", "Eggs"] },
      { name: "Crème Brûlée", price: "$4.50", image: cremeBrulee, description: "Vanilla custard under a torched, crackling caramel shell.", ingredients: ["Cream", "Vanilla bean", "Egg yolks", "Sugar"] },
    ],
  },
];

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export function FullMenuDialog({ open, onOpenChange }: Props) {
  const [activeCat, setActiveCat] = useState(categories[0].name);
  const [query, setQuery] = useState("");
  const [openItem, setOpenItem] = useState<Item | null>(null);

  const items = useMemo(() => {
    const list = categories.find((c) => c.name === activeCat)?.items ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.ingredients.some((g) => g.toLowerCase().includes(q)),
    );
  }, [activeCat, query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl gap-0 overflow-hidden border-espresso/20 bg-cream p-0 sm:rounded-3xl">
        <DialogTitle className="sr-only">Full Menu</DialogTitle>
        <DialogDescription className="sr-only">
          Browse our full coffee, signature drinks and desserts menu.
        </DialogDescription>

        <div className="flex max-h-[92vh] flex-col">
          <div className="border-b border-espresso/10 bg-sand/40 px-6 pb-5 pt-7 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-espresso/15 bg-cream px-4 py-2.5 shadow-sm">
                <Search className="h-4 w-4 text-espresso/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search drinks, desserts, ingredients…"
                  className="w-full bg-transparent text-sm text-espresso placeholder:text-espresso/40 focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} aria-label="Clear search" className="text-espresso/40 hover:text-espresso">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-espresso md:text-4xl">Our Menu</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((c) => {
                const active = c.name === activeCat;
                return (
                  <button
                    key={c.name}
                    onClick={() => setActiveCat(c.name)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
                      active ? "border-espresso bg-espresso text-cream" : "border-espresso/20 bg-cream text-espresso hover:border-espresso"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            {items.length === 0 ? (
              <div className="grid place-items-center py-20 text-center text-sm text-espresso/60">
                Nothing matches "{query}". Try a different word.
              </div>
            ) : (
              <div key={activeCat + "|" + query} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
                {items.map((item, idx) => (
                  <MenuCard key={item.name} item={item} index={idx} onOpen={setOpenItem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      <Dialog open={!!openItem} onOpenChange={(o) => !o && setOpenItem(null)}>
        <DialogContent className="max-w-md border-espresso/20 bg-cream sm:rounded-2xl">
          {openItem && (
            <>
              <div className="overflow-hidden rounded-xl bg-sand/50">
                <img src={openItem.image} alt={openItem.name} width={800} height={600} className="h-48 w-full object-cover" />
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <DialogTitle className="font-display text-2xl font-bold text-espresso">{openItem.name}</DialogTitle>
                <span className="text-base font-semibold text-mocha">{openItem.price}</span>
              </div>
              <DialogDescription className="text-sm leading-relaxed text-espresso/75">
                {openItem.description}
              </DialogDescription>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-mocha">Ingredients</div>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {openItem.ingredients.map((g) => (
                    <li key={g} className="rounded-full border border-espresso/15 bg-sand/40 px-3 py-1 text-xs text-espresso">{g}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}

function MenuCard({ item, index, onOpen }: { item: Item; index: number; onOpen: (i: Item) => void }) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(py - 0.5) * -10}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        animation: `menu-card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`,
        animationDelay: `${Math.min(index * 55, 600)}ms`,
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
        transformStyle: "preserve-3d",
        transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease",
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-cream shadow-sm hover:shadow-2xl hover:shadow-espresso/20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.35), transparent 45%)", mixBlendMode: "overlay" }} />
      <div className="aspect-[4/3] overflow-hidden bg-sand/50" style={{ transform: "translateZ(30px)" }}>
        <img src={item.image} alt={item.name} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col p-4" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-espresso">{item.name}</h3>
          <span className="text-sm font-semibold text-mocha">{item.price}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-espresso/70">{item.description}</p>
        {item.sizes && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.sizes.map((s) => (
              <span key={s} className="rounded-full border border-espresso/15 bg-sand/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-espresso/70">{s}</span>
            ))}
          </div>
        )}
        <button
          onClick={() => onOpen(item)}
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-cream transition hover:bg-mocha hover:scale-105"
          style={{ transform: "translateZ(40px)" }}
        >
          <Leaf className="h-3.5 w-3.5" />
          See Ingredients
        </button>
      </div>
    </article>
  );
}
