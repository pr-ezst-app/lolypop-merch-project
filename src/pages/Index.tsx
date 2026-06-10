import { useState } from "react";
import Icon from "@/components/ui/icon";

const HOODIE_IMG = "https://cdn.ezst.app/projects/1c3c6fd2-f517-4fc8-8a03-f58b2dc7daa8/files/807ab8fb-655a-45e6-be2e-4b65524155ce.jpg";
const COLLECTION_IMG = "https://cdn.ezst.app/projects/1c3c6fd2-f517-4fc8-8a03-f58b2dc7daa8/files/db036467-b4ef-4c83-987f-d0a38ad7e79d.jpg";
const LIFESTYLE_IMG = "https://cdn.ezst.app/projects/1c3c6fd2-f517-4fc8-8a03-f58b2dc7daa8/files/3553bf0c-fa81-45be-a670-86f884c89bc2.jpg";

const products = [
  { id: 1, name: "Lolypop Hoodie", price: "$65", tag: "BESTSELLER", tagColor: "var(--neon-pink)", img: HOODIE_IMG, rating: 5, reviews: 128 },
  { id: 2, name: "Full Collection Drop", price: "$120", tag: "NEW DROP", tagColor: "var(--neon-cyan)", img: COLLECTION_IMG, rating: 5, reviews: 74 },
  { id: 3, name: "Lifestyle Tee", price: "$35", tag: "LIMITED", tagColor: "var(--neon-yellow)", img: LIFESTYLE_IMG, rating: 4, reviews: 210 },
  { id: 4, name: "Lolypop Cap", price: "$28", tag: "HOT", tagColor: "var(--neon-purple)", img: HOODIE_IMG, rating: 5, reviews: 92 },
  { id: 5, name: "Candy Phone Case", price: "$18", tag: "FAN FAVE", tagColor: "var(--neon-cyan)", img: COLLECTION_IMG, rating: 4, reviews: 305 },
  { id: 6, name: "Gamer Bag", price: "$45", tag: "EXCLUSIVE", tagColor: "var(--neon-pink)", img: LIFESTYLE_IMG, rating: 5, reviews: 56 },
];

const testimonials = [
  { name: "Zoe K.", handle: "@zoe_plays", text: "The hoodie is INSANE quality. Gets compliments every time I stream.", stars: 5, avatar: "🎮" },
  { name: "MarcusXL", handle: "@marcusxl", text: "Lolypop merch = the drip. Cap arrived fast and the colors are electric.", stars: 5, avatar: "⚡" },
  { name: "NightCrawl", handle: "@nightcrawl_gg", text: "Finally merch that actually looks good on camera. Worth every penny.", stars: 5, avatar: "🌙" },
  { name: "PixelPriya", handle: "@pixelpriya", text: "Bought the full collection drop. My entire squad is obsessed.", stars: 5, avatar: "✨" },
];

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 5–7 business days. Express (2–3 days) is available at checkout." },
  { q: "Do you ship internationally?", a: "Yes! We ship worldwide. International orders typically arrive in 10–15 business days." },
  { q: "What's your return policy?", a: "30-day hassle-free returns. If you don't love it, we'll make it right — no questions asked." },
  { q: "Are the sizes true to fit?", a: "Our hoodies run slightly oversized for that streetwear look. Check the size guide on each product page." },
  { q: "When does new merch drop?", a: "New drops happen every season. Follow us on socials or join our email list to be first to know!" },
];

function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= count ? "var(--neon-yellow)" : "#333"}>
          <path d="M10 1l2.39 4.84L18 6.72l-4 3.9.94 5.5L10 13.77l-4.94 2.35.94-5.5L2 6.72l5.61-.88L10 1z"/>
        </svg>
      ))}
    </span>
  );
}

function NavBar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Shop", "Gallery", "About", "Testimonials", "FAQ", "Contact"];

  return (
    <nav style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,77,166,0.2)" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={() => setActive("Home")} className="font-display text-3xl animate-glow-pulse"
          style={{ color: "var(--neon-pink)" }}>
          🏆 LOLYPOP
        </button>
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <button key={link} onClick={() => setActive(link)}
              className="font-body px-4 py-2 rounded-full text-sm transition-all duration-200"
              style={{
                color: active === link ? "#0d0d0d" : "rgba(255,255,255,0.7)",
                background: active === link ? "var(--neon-pink)" : "transparent",
                fontWeight: 700,
              }}>
              {link}
            </button>
          ))}
        </div>
        <button className="md:hidden" style={{ color: "var(--neon-pink)" }} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={28} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden pt-4 pb-2 flex flex-col gap-1">
          {links.map(link => (
            <button key={link} onClick={() => { setActive(link); setMenuOpen(false); }}
              className="font-body font-bold px-4 py-3 rounded-xl text-left text-sm transition-all"
              style={{ color: active === link ? "var(--neon-pink)" : "rgba(255,255,255,0.7)" }}>
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HomeSection({ setActive }: { setActive: (s: string) => void }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-16 px-6">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--neon-pink), transparent)" }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--neon-cyan), transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--neon-yellow), transparent)" }} />

      <div className="relative z-10 text-center max-w-5xl animate-slide-up">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold"
          style={{ background: "rgba(255,77,166,0.15)", border: "1px solid var(--neon-pink)", color: "var(--neon-pink)" }}>
          🎮 Official Gaming Merch Drop
        </div>
        <h1 className="font-display gradient-text-pink mb-6"
          style={{ fontSize: "clamp(4rem, 14vw, 10rem)", lineHeight: 0.95, letterSpacing: "0.02em" }}>
          LOLYPOP
        </h1>
        <p className="font-body text-xl mb-4 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
          Bold. Colorful. Unstoppable. Merch made for gamers who refuse to be basic.
        </p>
        <p className="font-body font-extrabold text-lg mb-10" style={{ color: "var(--neon-cyan)" }}>
          🍭 Level up your drip. Rep the lolypop.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="btn-neon" onClick={() => setActive("Shop")}>
            Shop Now →
          </button>
          <button className="btn-outline-cyan" onClick={() => setActive("Gallery")}>
            See the Gallery
          </button>
        </div>
      </div>

      <div className="absolute top-1/4 right-[8%] text-5xl animate-float" style={{ animationDelay: "0s" }}>🍭</div>
      <div className="absolute top-1/3 left-[6%] text-3xl animate-float" style={{ animationDelay: "1.2s" }}>🎮</div>
      <div className="absolute bottom-1/3 right-[12%] text-2xl animate-float" style={{ animationDelay: "0.7s" }}>⚡</div>
      <div className="absolute bottom-1/4 left-[12%] text-4xl animate-float" style={{ animationDelay: "1.8s" }}>🔥</div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
        style={{ borderTop: "1px solid rgba(255,77,166,0.3)", background: "rgba(255,77,166,0.05)" }}>
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="font-display text-lg" style={{ color: "var(--neon-pink)" }}>
              🏆 LOLYPOP MERCH &nbsp;&nbsp; ✦ &nbsp;&nbsp; NEW DROP &nbsp;&nbsp; ✦ &nbsp;&nbsp; FREE SHIPPING OVER $50 &nbsp;&nbsp; ✦ &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopSection() {
  const [added, setAdded] = useState<number | null>(null);
  const handleAdd = (id: number) => {
    setAdded(id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-cyan)", letterSpacing: "0.2em" }}>THE STORE</p>
          <h2 className="section-title gradient-text-pink">Shop the Drop</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div key={p.id} className="card-merch animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="relative overflow-hidden" style={{ height: "280px" }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black"
                  style={{ background: p.tagColor, color: "#0d0d0d", fontFamily: "'Boogaloo', cursive", fontSize: "0.85rem" }}>
                  {p.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl" style={{ color: "#fff" }}>{p.name}</h3>
                  <span className="font-display text-2xl" style={{ color: "var(--neon-yellow)" }}>{p.price}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Stars count={p.rating} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>({p.reviews})</span>
                </div>
                <button
                  className="w-full btn-neon text-center block"
                  style={added === p.id ? { background: "var(--neon-cyan)" } : {}}
                  onClick={() => handleAdd(p.id)}>
                  {added === p.id ? "✓ Added!" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const images = [HOODIE_IMG, COLLECTION_IMG, LIFESTYLE_IMG, HOODIE_IMG, COLLECTION_IMG, LIFESTYLE_IMG];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-yellow)", letterSpacing: "0.2em" }}>THE LOOKS</p>
          <h2 className="section-title gradient-text-cyan">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <button key={i} onClick={() => setSelected(img)}
              className="relative overflow-hidden rounded-2xl group"
              style={{ height: i % 3 === 1 ? "320px" : "240px" }}>
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(255,77,166,0.4)", backdropFilter: "blur(2px)" }}>
                <Icon name="ZoomIn" size={40} color="white" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}>
          <img src={selected} alt="Preview" className="max-w-3xl max-h-[80vh] rounded-3xl shadow-2xl" />
          <button className="absolute top-6 right-6" style={{ color: "var(--neon-pink)" }}>
            <Icon name="X" size={36} />
          </button>
        </div>
      )}
    </section>
  );
}

function AboutSection() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-purple)", letterSpacing: "0.2em" }}>OUR STORY</p>
          <h2 className="section-title gradient-text-pink mb-6">About Lolypop</h2>
          <p className="font-body text-lg mb-5" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
            Lolypop started as a video game — and grew into something bigger. We're a crew of gamers, designers, and merch obsessives who believe your gear should hit as hard as your gameplay.
          </p>
          <p className="font-body text-lg mb-8" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
            Every piece is designed with gaming culture in mind: bold graphics, premium materials, and colors that pop on stream. We don't do boring. We do Lolypop.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[["10K+", "Happy customers"], ["50+", "Merch items"], ["100%", "Gamer approved"]].map(([num, label]) => (
              <div key={label} className="text-center p-4 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="font-display text-3xl mb-1" style={{ color: "var(--neon-pink)" }}>{num}</div>
                <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={LIFESTYLE_IMG} alt="About Lolypop" className="w-full rounded-3xl object-cover" style={{ height: "480px" }} />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden neon-border-pink">
            <img src={HOODIE_IMG} alt="Detail" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-6 -right-6 text-6xl animate-float">🍭</div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="pt-32 pb-20 px-6" style={{ background: "linear-gradient(180deg, transparent, rgba(255,77,166,0.04), transparent)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-pink)", letterSpacing: "0.2em" }}>THE COMMUNITY</p>
          <h2 className="section-title gradient-text-pink">What Gamers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-3xl animate-slide-up" style={{
              animationDelay: `${i * 0.1}s`,
              background: "var(--card-bg)",
              border: "1px solid rgba(255,77,166,0.2)"
            }}>
              <Stars count={t.stars} size={18} />
              <p className="font-body text-lg my-4" style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm" style={{ color: "var(--neon-cyan)" }}>{t.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-8" style={{ background: "var(--card-bg)", border: "1px solid rgba(0,240,255,0.2)" }}>
          <h3 className="font-display text-3xl mb-6 text-center" style={{ color: "var(--neon-cyan)" }}>Product Ratings</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="flex flex-col gap-1">
                <span className="font-bold text-sm text-white">{p.name}</span>
                <div className="flex items-center gap-2">
                  <Stars count={p.rating} size={14} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{p.reviews} reviews</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div className="h-full rounded-full" style={{ width: `${(p.rating / 5) * 100}%`, background: "var(--neon-yellow)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-yellow)", letterSpacing: "0.2em" }}>GOT QUESTIONS?</p>
          <h2 className="section-title gradient-text-cyan">FAQ</h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "var(--card-bg)", border: open === i ? "1px solid var(--neon-cyan)" : "1px solid rgba(255,255,255,0.08)" }}>
              <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-bold text-white text-base">{faq.q}</span>
                <Icon name={open === i ? "ChevronUp" : "ChevronDown"} size={20}
                  color={open === i ? "var(--neon-cyan)" : "rgba(255,255,255,0.4)"} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 font-body text-base" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="pt-32 pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-pink)", letterSpacing: "0.2em" }}>HIT US UP</p>
          <h2 className="section-title gradient-text-pink">Contact</h2>
          <p className="mt-4 text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
            Questions? Collabs? Just wanna talk merch? We're here for it.
          </p>
        </div>
        <div className="rounded-3xl p-8" style={{ background: "var(--card-bg)", border: "1px solid rgba(255,77,166,0.2)" }}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Name</label>
                <input placeholder="Your name" className="w-full px-4 py-3 rounded-xl font-body text-white focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Email</label>
                <input placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl font-body text-white focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Subject</label>
              <input placeholder="Collab / Order issue / General" className="w-full px-4 py-3 rounded-xl font-body text-white focus:outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Message</label>
              <textarea rows={4} placeholder="Tell us what's up…" className="w-full px-4 py-3 rounded-xl font-body text-white resize-none focus:outline-none"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
            </div>
            <button className="btn-neon w-full mt-2">Send Message 🍭</button>
          </div>
          <div className="flex justify-center gap-8 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[["Twitter", "Twitter", "var(--neon-cyan)"], ["Instagram", "Instagram", "var(--neon-pink)"], ["Youtube", "Youtube", "var(--neon-yellow)"]].map(([name, icon, color]) => (
              <button key={name} className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
                <Icon name={icon} size={24} color={color} />
                <span className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ setActive }: { setActive: (s: string) => void }) {
  return (
    <footer className="px-6 py-10" style={{ borderTop: "1px solid rgba(255,77,166,0.2)", background: "rgba(255,77,166,0.03)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <button className="font-display text-2xl" style={{ color: "var(--neon-pink)" }} onClick={() => setActive("Home")}>
          🏆 LOLYPOP
        </button>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          © 2026 Lolypop. All rights reserved. Level up your drip.
        </p>
        <div className="flex gap-4">
          {["Home","Shop","Contact"].map(l => (
            <button key={l} onClick={() => setActive(l)} className="text-sm font-semibold"
              style={{ color: "rgba(255,255,255,0.4)" }}>{l}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [active, setActive] = useState("Home");

  const renderSection = () => {
    switch (active) {
      case "Home": return <HomeSection setActive={setActive} />;
      case "Shop": return <ShopSection />;
      case "Gallery": return <GallerySection />;
      case "About": return <AboutSection />;
      case "Testimonials": return <TestimonialsSection />;
      case "FAQ": return <FAQSection />;
      case "Contact": return <ContactSection />;
      default: return <HomeSection setActive={setActive} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <NavBar active={active} setActive={setActive} />
      <main key={active} className="animate-slide-up">
        {renderSection()}
      </main>
      <Footer setActive={setActive} />
    </div>
  );
}