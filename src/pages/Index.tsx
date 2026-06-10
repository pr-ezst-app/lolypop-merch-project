import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const HOODIE_IMG = "https://cdn.ezst.app/projects/1c3c6fd2-f517-4fc8-8a03-f58b2dc7daa8/files/807ab8fb-655a-45e6-be2e-4b65524155ce.jpg";
const COLLECTION_IMG = "https://cdn.ezst.app/projects/1c3c6fd2-f517-4fc8-8a03-f58b2dc7daa8/files/db036467-b4ef-4c83-987f-d0a38ad7e79d.jpg";
const LIFESTYLE_IMG = "https://cdn.ezst.app/projects/1c3c6fd2-f517-4fc8-8a03-f58b2dc7daa8/files/3553bf0c-fa81-45be-a670-86f884c89bc2.jpg";

type Product = {
  id: number; name: string; price: string; priceNum: number; tag: string;
  tagColor: string; img: string; rating: number; reviews: number;
  category: string; sizes: string[]; description: string;
};

const products: Product[] = [
  { id: 1, name: "Lolypop Hoodie", price: "$65", priceNum: 65, tag: "BESTSELLER", tagColor: "var(--neon-pink)", img: HOODIE_IMG, rating: 5, reviews: 128, category: "Apparel", sizes: ["XS","S","M","L","XL","2XL"], description: "Premium heavyweight hoodie with embroidered Lolypop trophy logo. Oversized fit, kangaroo pocket, and brushed fleece interior." },
  { id: 2, name: "Full Collection Drop", price: "$120", priceNum: 120, tag: "NEW DROP", tagColor: "var(--neon-cyan)", img: COLLECTION_IMG, rating: 5, reviews: 74, category: "Bundle", sizes: ["S","M","L","XL"], description: "The complete Lolypop starter pack. Hoodie + Tee + Cap bundled at a killer price." },
  { id: 3, name: "Lifestyle Tee", price: "$35", priceNum: 35, tag: "LIMITED", tagColor: "var(--neon-yellow)", img: LIFESTYLE_IMG, rating: 4, reviews: 210, category: "Apparel", sizes: ["XS","S","M","L","XL","2XL"], description: "100% combed cotton tee with neon screen-print graphic. Runs true to size." },
  { id: 4, name: "Lolypop Cap", price: "$28", priceNum: 28, tag: "HOT", tagColor: "var(--neon-purple)", img: HOODIE_IMG, rating: 5, reviews: 92, category: "Accessories", sizes: ["One Size"], description: "Structured 6-panel cap with embroidered trophy crest. Adjustable snapback." },
  { id: 5, name: "Candy Phone Case", price: "$18", priceNum: 18, tag: "FAN FAVE", tagColor: "var(--neon-cyan)", img: COLLECTION_IMG, rating: 4, reviews: 305, category: "Accessories", sizes: ["iPhone","Samsung","Pixel"], description: "Tough dual-layer case with full-color Lolypop candy art. Drop-tested." },
  { id: 6, name: "Gamer Bag", price: "$45", priceNum: 45, tag: "EXCLUSIVE", tagColor: "var(--neon-pink)", img: LIFESTYLE_IMG, rating: 5, reviews: 56, category: "Accessories", sizes: ["One Size"], description: "30L backpack with padded laptop sleeve, hidden pockets, and glow-in-the-dark Lolypop patch." },
];

const testimonials = [
  { name: "Zoe K.", handle: "@zoe_plays", text: "The hoodie is INSANE quality. Gets compliments every time I stream.", stars: 5, avatar: "🎮" },
  { name: "MarcusXL", handle: "@marcusxl", text: "Lolypop merch = the drip. Cap arrived fast and the colors are electric.", stars: 5, avatar: "⚡" },
  { name: "NightCrawl", handle: "@nightcrawl_gg", text: "Finally merch that actually looks good on camera. Worth every penny.", stars: 5, avatar: "🌙" },
  { name: "PixelPriya", handle: "@pixelpriya", text: "Bought the full collection drop. My entire squad is obsessed.", stars: 5, avatar: "✨" },
];

const faqs = [
  { q: "How do I get my order?", a: "All orders are pickup only! Once your order is ready, we'll contact you to arrange a pickup time and location." },
  { q: "Where do I pick up my order?", a: "Pickup location details will be sent to you after your order is confirmed. Stay tuned to our socials for event popup locations!" },
  { q: "How long until my order is ready for pickup?", a: "Orders are typically ready within 2–3 business days. You'll get a notification when it's good to go." },
  { q: "What's your return policy?", a: "30-day hassle-free returns on pickup orders. If you don't love it, bring it back and we'll make it right." },
  { q: "Are the sizes true to fit?", a: "Our hoodies run slightly oversized for that streetwear look. Check the size guide on each product page." },
  { q: "When does new merch drop?", a: "New drops happen every season. Follow us on socials or join our email list to be first to know!" },
];

type CartItem = { product: Product; qty: number; size: string };
type Toast = { id: number; message: string; type: "success" | "info" };

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

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function CountdownBlock({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-4xl md:text-5xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl"
        style={{ background: "rgba(255,77,166,0.15)", border: "1px solid var(--neon-pink)", color: "var(--neon-pink)" }}>
        {String(val).padStart(2, "0")}
      </div>
      <span className="text-xs mt-1 font-bold" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>{label}</span>
    </div>
  );
}

function ScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProg((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1" style={{ background: "rgba(255,255,255,0.05)" }}>
      <div className="h-full transition-all duration-100"
        style={{ width: `${prog}%`, background: "linear-gradient(90deg, var(--neon-pink), var(--neon-cyan))" }} />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
      style={{ background: "var(--neon-pink)", boxShadow: "0 0 24px var(--neon-pink)", color: "#0d0d0d" }}>
      <Icon name="ChevronUp" size={22} />
    </button>
  );
}

function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 items-center">
      {toasts.map(t => (
        <div key={t.id} className="animate-slide-up flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm shadow-2xl"
          style={{
            background: t.type === "success" ? "var(--neon-pink)" : "var(--neon-cyan)",
            color: "#0d0d0d",
            boxShadow: `0 0 24px ${t.type === "success" ? "var(--neon-pink)" : "var(--neon-cyan)"}`,
          }}>
          <span>{t.type === "success" ? "✓" : "ℹ"}</span>
          {t.message}
          <button onClick={() => remove(t.id)} className="ml-1 opacity-60 hover:opacity-100">✕</button>
        </div>
      ))}
    </div>
  );
}

function CheckoutModal({ cart, total, onClose, onConfirm }: {
  cart: CartItem[]; total: number;
  onClose: () => void;
  onConfirm: (info: { name: string; email: string; phone: string; note: string }) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onConfirm(form);
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, type = "text", required = true) => (
    <div>
      <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
        {label}{required && " *"}
      </label>
      <input type={type} value={form[key]} onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${errors[key] ? "var(--neon-pink)" : form[key] ? "rgba(255,77,166,0.4)" : "rgba(255,255,255,0.1)"}`,
        }} />
      {errors[key] && <p className="text-xs mt-1" style={{ color: "var(--neon-pink)" }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden animate-slide-up"
        style={{ background: "#141414", border: "1px solid rgba(255,77,166,0.35)", maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 sticky top-0 z-10"
          style={{ background: "#141414", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-3">
            <button onClick={onClose} style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="ArrowLeft" size={20} />
            </button>
            <h2 className="font-display text-2xl" style={{ color: "var(--neon-pink)" }}>Checkout</h2>
          </div>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.4)" }}>
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="px-6 py-5 flex flex-col gap-5">
          {/* Order summary */}
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-xs font-bold mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>ORDER SUMMARY</p>
            <div className="flex flex-col gap-2">
              {cart.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <img src={item.product.img} className="w-8 h-8 rounded-lg object-cover" alt="" />
                    <span className="text-white font-medium">{item.product.name}</span>
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>× {item.qty}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>{item.size}</span>
                  </div>
                  <span className="font-bold" style={{ color: "var(--neon-yellow)" }}>${item.product.priceNum * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 pt-3 font-display text-xl" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-white">Total</span>
              <span style={{ color: "var(--neon-yellow)" }}>${total}</span>
            </div>
          </div>

          {/* Pickup notice */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.2)", color: "var(--neon-cyan)" }}>
            <Icon name="MapPin" size={18} color="var(--neon-cyan)" />
            Pickup only — we'll contact you with details after confirming your order.
          </div>

          {/* Customer info */}
          <div>
            <p className="text-xs font-bold mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>YOUR INFO</p>
            <div className="flex flex-col gap-3">
              {field("name", "Full Name", "Your full name")}
              {field("email", "Email", "your@email.com", "email")}
              {field("phone", "Phone", "+1 (555) 000-0000", "tel")}
              {field("note", "Note for pickup (optional)", "e.g. preferred pickup time, questions…", "text", false)}
            </div>
          </div>

          <button type="submit" className="btn-neon w-full text-lg py-4">
            Place Order 🏆
          </button>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            No payment taken now — pay at pickup.
          </p>
        </form>
      </div>
    </div>
  );
}

function OrderConfirmation({ order, onDone }: {
  order: { name: string; email: string; phone: string; note: string; items: CartItem[]; total: number; orderId: string };
  onDone: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}>
      <div className="w-full max-w-md rounded-3xl p-8 text-center animate-slide-up"
        style={{ background: "#141414", border: "1px solid rgba(255,77,166,0.4)" }}>
        <div className="text-6xl mb-4 animate-float">🏆</div>
        <h2 className="font-display text-4xl mb-2" style={{ color: "var(--neon-pink)" }}>Order Placed!</h2>
        <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Order #{order.orderId}</p>
        <p className="mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
          Thanks <span className="font-bold text-white">{order.name}</span>! We'll reach out to <span style={{ color: "var(--neon-cyan)" }}>{order.email}</span> or <span style={{ color: "var(--neon-cyan)" }}>{order.phone}</span> to arrange your pickup.
        </p>

        <div className="rounded-2xl p-4 mb-6 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs font-bold mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>YOUR ORDER</p>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm mb-2">
              <span className="text-white">{item.product.name} <span style={{ color: "rgba(255,255,255,0.4)" }}>× {item.qty} ({item.size})</span></span>
              <span style={{ color: "var(--neon-yellow)" }}>${item.product.priceNum * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between mt-3 pt-3 font-display text-xl" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="text-white">Total</span>
            <span style={{ color: "var(--neon-yellow)" }}>${order.total}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center mb-6 text-sm font-semibold"
          style={{ color: "var(--neon-cyan)" }}>
          <Icon name="MapPin" size={16} color="var(--neon-cyan)" />
          No payment now — pay at pickup
        </div>

        <button className="btn-neon w-full" onClick={onDone}>Back to Shop 🛍️</button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, setCart, open, setOpen, showToast, onCheckout }: {
  cart: CartItem[]; setCart: (c: CartItem[]) => void;
  open: boolean; setOpen: (o: boolean) => void;
  showToast: (msg: string, type?: "success" | "info") => void;
  onCheckout: () => void;
}) {
  const total = cart.reduce((sum, i) => sum + i.product.priceNum * i.qty, 0);
  const change = (idx: number, delta: number) => {
    const next = [...cart];
    next[idx].qty += delta;
    if (next[idx].qty <= 0) next.splice(idx, 1);
    setCart(next);
  };
  const remove = (idx: number) => {
    const next = [...cart];
    next.splice(idx, 1);
    setCart(next);
    showToast("Item removed", "info");
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[80]" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)} />
      )}
      <div className="fixed top-0 right-0 h-full z-[90] flex flex-col transition-transform duration-300"
        style={{
          width: "min(420px, 100vw)",
          background: "#111",
          borderLeft: "1px solid rgba(255,77,166,0.3)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}>
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 className="font-display text-2xl" style={{ color: "var(--neon-pink)" }}>🛒 Your Cart</h2>
          <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.5)" }}>
            <Icon name="X" size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span className="text-6xl">🏆</span>
              <p className="font-display text-xl">Cart is empty</p>
              <p className="text-sm">Add some merch to get started!</p>
            </div>
          ) : cart.map((item, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <img src={item.product.img} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm mb-1">{item.product.name}</div>
                <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Size: {item.size}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => change(idx, -1)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: "rgba(255,255,255,0.08)", color: "white" }}>−</button>
                    <span className="font-bold text-white w-5 text-center">{item.qty}</span>
                    <button onClick={() => change(idx, 1)} className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: "rgba(255,255,255,0.08)", color: "white" }}>+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg" style={{ color: "var(--neon-yellow)" }}>${item.product.priceNum * item.qty}</span>
                    <button onClick={() => remove(idx)} style={{ color: "rgba(255,255,255,0.3)" }}>
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex justify-between mb-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span className="font-bold text-white">${total}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Fulfillment</span>
              <span style={{ color: "var(--neon-cyan)" }}>Pickup only 🏆</span>
            </div>
            <div className="flex justify-between mb-5 font-display text-2xl">
              <span style={{ color: "white" }}>Total</span>
              <span style={{ color: "var(--neon-yellow)" }}>${total}</span>
            </div>
            <div className="mb-4 text-xs text-center py-2 rounded-xl"
              style={{ background: "rgba(0,240,255,0.06)", border: "1px solid rgba(0,240,255,0.2)", color: "var(--neon-cyan)" }}>
              📍 Pickup details sent after order confirmation
            </div>
            <button className="btn-neon w-full" onClick={() => { showToast("Checkout coming soon! 🏆", "info"); }}>
              Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function QuickViewModal({ product, onClose, addToCart }: {
  product: Product; onClose: () => void;
  addToCart: (p: Product, size: string) => void;
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden animate-slide-up"
        style={{ background: "#161616", border: "1px solid rgba(255,77,166,0.3)" }}
        onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)", color: "white" }} onClick={onClose}>
          <Icon name="X" size={18} />
        </button>
        <div className="grid md:grid-cols-2">
          <img src={product.img} alt={product.name} className="w-full object-cover" style={{ height: "320px" }} />
          <div className="p-6 flex flex-col gap-4">
            <div>
              <span className="text-xs font-black px-2 py-1 rounded-full mb-2 inline-block"
                style={{ background: product.tagColor, color: "#0d0d0d", fontFamily: "'Boogaloo', cursive" }}>
                {product.tag}
              </span>
              <h3 className="font-display text-2xl text-white mt-1">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Stars count={product.rating} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>({product.reviews})</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{product.description}</p>
            <div>
              <p className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
                    style={{
                      background: size === s ? "var(--neon-pink)" : "rgba(255,255,255,0.07)",
                      color: size === s ? "#0d0d0d" : "rgba(255,255,255,0.7)",
                      border: size === s ? "none" : "1px solid rgba(255,255,255,0.12)",
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                  style={{ background: "rgba(255,255,255,0.08)", color: "white" }}>−</button>
                <span className="font-bold text-white w-6 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                  style={{ background: "rgba(255,255,255,0.08)", color: "white" }}>+</button>
              </div>
              <span className="font-display text-3xl" style={{ color: "var(--neon-yellow)" }}>${product.priceNum * qty}</span>
            </div>
            <button className="btn-neon w-full" onClick={() => { addToCart(product, size); onClose(); }}>
              Add to Cart 🏆
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavBar({ active, setActive, cartCount, openCart }: {
  active: string; setActive: (s: string) => void;
  cartCount: number; openCart: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Shop", "Gallery", "About", "Testimonials", "FAQ", "Contact"];

  return (
    <nav style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,77,166,0.2)" }}
      className="fixed top-1 left-0 right-0 z-50 px-6 py-4">
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
        <div className="flex items-center gap-3">
          <button onClick={openCart} className="relative flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105"
            style={{ background: "rgba(255,77,166,0.15)", border: "1px solid rgba(255,77,166,0.4)", color: "var(--neon-pink)" }}>
            <Icon name="ShoppingCart" size={18} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center"
                style={{ background: "var(--neon-yellow)", color: "#0d0d0d" }}>{cartCount}</span>
            )}
          </button>
          <button className="md:hidden" style={{ color: "var(--neon-pink)" }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>
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
  const dropDate = new Date(Date.now() + 3 * 24 * 3600000 + 7 * 3600000 + 42 * 60000);
  const { d, h, m, s } = useCountdown(dropDate);

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
        <p className="font-body font-extrabold text-lg mb-8" style={{ color: "var(--neon-cyan)" }}>
          🍭 Level up your drip. Rep the lolypop.
        </p>

        {/* Countdown */}
        <div className="mb-10 p-5 rounded-3xl inline-block"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,77,166,0.25)" }}>
          <p className="text-xs font-bold mb-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>NEXT DROP IN</p>
          <div className="flex gap-4 justify-center">
            <CountdownBlock val={d} label="DAYS" />
            <CountdownBlock val={h} label="HRS" />
            <CountdownBlock val={m} label="MIN" />
            <CountdownBlock val={s} label="SEC" />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button className="btn-neon" onClick={() => setActive("Shop")}>Shop Now →</button>
          <button className="btn-outline-cyan" onClick={() => setActive("Gallery")}>See the Gallery</button>
        </div>
      </div>

      <div className="absolute top-1/4 right-[8%] text-5xl animate-float" style={{ animationDelay: "0s" }}>🏆</div>
      <div className="absolute top-1/3 left-[6%] text-3xl animate-float" style={{ animationDelay: "1.2s" }}>🎮</div>
      <div className="absolute bottom-1/3 right-[12%] text-2xl animate-float" style={{ animationDelay: "0.7s" }}>⚡</div>
      <div className="absolute bottom-1/4 left-[12%] text-4xl animate-float" style={{ animationDelay: "1.8s" }}>🔥</div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
        style={{ borderTop: "1px solid rgba(255,77,166,0.3)", background: "rgba(255,77,166,0.05)" }}>
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="font-display text-lg" style={{ color: "var(--neon-pink)" }}>
              🏆 LOLYPOP MERCH &nbsp;&nbsp; ✦ &nbsp;&nbsp; NEW DROP &nbsp;&nbsp; ✦ &nbsp;&nbsp; PICKUP ONLY &nbsp;&nbsp; ✦ &nbsp;&nbsp; ORDER ONLINE — COLLECT IN PERSON &nbsp;&nbsp; ✦ &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopSection({ addToCart, openQuickView }: {
  addToCart: (p: Product, size: string) => void;
  openQuickView: (p: Product) => void;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const categories = ["All", "Apparel", "Accessories", "Bundle"];

  const filtered = products
    .filter(p => (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return a.priceNum - b.priceNum;
      if (sort === "high") return b.priceNum - a.priceNum;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-cyan)", letterSpacing: "0.2em" }}>THE STORE</p>
          <h2 className="section-title gradient-text-pink">Shop the Drop</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Icon name="Search" size={16} color="rgba(255,255,255,0.3)" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search merch…"
              className="w-full pl-10 pr-4 py-3 rounded-2xl font-body text-white focus:outline-none text-sm"
              style={{ background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.1)", paddingLeft: "2.5rem" }} />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Search" size={16} color="rgba(255,255,255,0.3)" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-4 py-2 rounded-2xl text-sm font-bold transition-all"
                style={{
                  background: category === c ? "var(--neon-pink)" : "var(--card-bg)",
                  color: category === c ? "#0d0d0d" : "rgba(255,255,255,0.6)",
                  border: category === c ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}>
                {c}
              </button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-4 py-3 rounded-2xl text-sm font-bold focus:outline-none"
            style={{ background: "var(--card-bg)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "rgba(255,255,255,0.3)" }}>
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-display text-2xl">No items found</p>
            <p className="text-sm mt-2">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <div key={p.id} className="card-merch animate-slide-up group" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="relative overflow-hidden" style={{ height: "280px" }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black"
                    style={{ background: p.tagColor, color: "#0d0d0d", fontFamily: "'Boogaloo', cursive" }}>
                    {p.tag}
                  </span>
                  <button onClick={() => openQuickView(p)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
                    style={{ background: "rgba(13,13,13,0.9)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
                    Quick View
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl text-white">{p.name}</h3>
                    <span className="font-display text-2xl" style={{ color: "var(--neon-yellow)" }}>{p.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Stars count={p.rating} />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>({p.reviews})</span>
                    <span className="text-xs ml-auto px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                      {p.category}
                    </span>
                  </div>
                  <button className="w-full btn-neon" onClick={() => addToCart(p, p.sizes[0])}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GallerySection() {
  const images = [HOODIE_IMG, COLLECTION_IMG, LIFESTYLE_IMG, HOODIE_IMG, COLLECTION_IMG, LIFESTYLE_IMG];
  const [selected, setSelected] = useState<string | null>(null);
  const [selIdx, setSelIdx] = useState(0);

  const open = (idx: number) => { setSelIdx(idx); setSelected(images[idx]); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); const ni = (selIdx - 1 + images.length) % images.length; setSelIdx(ni); setSelected(images[ni]); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); const ni = (selIdx + 1) % images.length; setSelIdx(ni); setSelected(images[ni]); };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm font-bold mb-2" style={{ color: "var(--neon-yellow)", letterSpacing: "0.2em" }}>THE LOOKS</p>
          <h2 className="section-title gradient-text-cyan">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <button key={i} onClick={() => open(i)}
              className="relative overflow-hidden rounded-2xl group"
              style={{ height: i % 3 === 1 ? "320px" : "240px" }}>
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(255,77,166,0.4)", backdropFilter: "blur(2px)" }}>
                <Icon name="ZoomIn" size={40} color="white" />
              </div>
              <div className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(13,13,13,0.8)", color: "white" }}>
                {i + 1}/{images.length}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}>
          <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }} onClick={prev}>
            <Icon name="ChevronLeft" size={24} />
          </button>
          <img src={selected} alt="Preview" className="max-w-3xl max-h-[80vh] rounded-3xl shadow-2xl" onClick={e => e.stopPropagation()} />
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }} onClick={next}>
            <Icon name="ChevronRight" size={24} />
          </button>
          <button className="absolute top-6 right-6" style={{ color: "var(--neon-pink)" }} onClick={() => setSelected(null)}>
            <Icon name="X" size={36} />
          </button>
          <div className="absolute bottom-8 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); open(i); }}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === selIdx ? "var(--neon-pink)" : "rgba(255,255,255,0.3)" }} />
            ))}
          </div>
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
          <div className="absolute -top-6 -right-6 text-6xl animate-float">🏆</div>
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
              animationDelay: `${i * 0.1}s`, background: "var(--card-bg)", border: "1px solid rgba(255,77,166,0.2)"
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
            <div key={i} className="rounded-2xl overflow-hidden"
              style={{ background: "var(--card-bg)", border: open === i ? "1px solid var(--neon-cyan)" : "1px solid rgba(255,255,255,0.08)" }}>
              <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-bold text-white text-base">{faq.q}</span>
                <Icon name={open === i ? "ChevronUp" : "ChevronDown"} size={20}
                  color={open === i ? "var(--neon-cyan)" : "rgba(255,255,255,0.4)"} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-base" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ showToast }: { showToast: (msg: string, type?: "success" | "info") => void }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please fill in all required fields", "info");
      return;
    }
    setSent(true);
    showToast("Message sent! We'll hit you back soon 🏆", "success");
  };

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
          {sent ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="font-display text-3xl mb-2" style={{ color: "var(--neon-pink)" }}>Message sent!</h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }}>We'll get back to you within 24 hours.</p>
              <button className="btn-neon mt-6" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Name *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" className="w-full px-4 py-3 rounded-xl font-body text-white focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${form.name ? "rgba(255,77,166,0.4)" : "rgba(255,255,255,0.12)"}` }} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Email *</label>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl font-body text-white focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${form.email ? "rgba(255,77,166,0.4)" : "rgba(255,255,255,0.12)"}` }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Subject</label>
                <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Collab / Order issue / General"
                  className="w-full px-4 py-3 rounded-xl font-body text-white focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Message *</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's up…" className="w-full px-4 py-3 rounded-xl font-body text-white resize-none focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
              </div>
              <button type="submit" className="btn-neon w-full mt-2">Send Message 🏆</button>
            </form>
          )}
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

function NewsletterBanner({ showToast }: { showToast: (msg: string, type?: "success" | "info") => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    showToast("You're on the list! 🏆", "success");
  };
  return (
    <div className="px-6 py-12" style={{ background: "rgba(255,77,166,0.06)", borderTop: "1px solid rgba(255,77,166,0.15)", borderBottom: "1px solid rgba(255,77,166,0.15)" }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-display text-3xl mb-2" style={{ color: "var(--neon-pink)" }}>🏆 Never Miss a Drop</p>
        <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
          Join 10,000+ gamers. Get early access to new merch, exclusive discounts & pickup event alerts.
        </p>
        {done ? (
          <p className="font-bold" style={{ color: "var(--neon-cyan)" }}>✓ You're in! Check your inbox.</p>
        ) : (
          <form onSubmit={submit} className="flex gap-3 justify-center">
            <input value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" className="flex-1 max-w-xs px-4 py-3 rounded-2xl text-white text-sm focus:outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
            <button type="submit" className="btn-neon px-6 py-3">Join →</button>
          </form>
        )}
      </div>
    </div>
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

type ConfirmedOrder = {
  name: string; email: string; phone: string; note: string;
  items: CartItem[]; total: number; orderId: string;
};

export default function Index() {
  const [active, setActive] = useState("Home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  let toastId = 0;

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].qty += 1;
        return next;
      }
      return [...prev, { product, qty: 1, size }];
    });
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleConfirm = (info: { name: string; email: string; phone: string; note: string }) => {
    const total = cart.reduce((s, i) => s + i.product.priceNum * i.qty, 0);
    const orderId = `LLP-${Date.now().toString(36).toUpperCase()}`;
    setConfirmedOrder({ ...info, items: [...cart], total, orderId });
    setCheckoutOpen(false);
    setCartOpen(false);
    setCart([]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const navigate = (section: string) => {
    setActive(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (active) {
      case "Home": return <HomeSection setActive={navigate} />;
      case "Shop": return <ShopSection addToCart={addToCart} openQuickView={setQuickView} />;
      case "Gallery": return <GallerySection />;
      case "About": return <AboutSection />;
      case "Testimonials": return <TestimonialsSection />;
      case "FAQ": return <FAQSection />;
      case "Contact": return <ContactSection showToast={showToast} />;
      default: return <HomeSection setActive={navigate} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      <ScrollProgress />
      <NavBar active={active} setActive={navigate} cartCount={cartCount} openCart={() => setCartOpen(true)} />

      <main key={active} className="animate-slide-up">
        {renderSection()}
      </main>

      <NewsletterBanner showToast={showToast} />
      <Footer setActive={navigate} />

      <CartDrawer
        cart={cart} setCart={setCart}
        open={cartOpen} setOpen={setCartOpen}
        showToast={showToast}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          total={cart.reduce((s, i) => s + i.product.priceNum * i.qty, 0)}
          onClose={() => { setCheckoutOpen(false); setCartOpen(true); }}
          onConfirm={handleConfirm}
        />
      )}

      {confirmedOrder && (
        <OrderConfirmation
          order={confirmedOrder}
          onDone={() => { setConfirmedOrder(null); navigate("Shop"); }}
        />
      )}

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} addToCart={addToCart} />}
      <ToastContainer toasts={toasts} remove={removeToast} />
      <BackToTop />
    </div>
  );
}