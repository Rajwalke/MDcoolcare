import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import snowflakeSrc from "../assets/snow.png";
import homeright from "../assets/homeright.png";
import bluestar from "../assets/brandlogos/BLUESTAR.jpg";
import carrier from "../assets/brandlogos/CARRIER.jpg";
import daikin from "../assets/brandlogos/DAIKIN.jpg";
import haier from "../assets/brandlogos/HAIER.jpg";
import hitachi from "../assets/brandlogos/HITACHI.jpg";
import lg from "../assets/brandlogos/LG.jpg";
import lloyd from "../assets/brandlogos/LLOYD.jpg";
import mitshubishi from "../assets/brandlogos/MITSHUBISHI.jpg";
import panosonic from "../assets/brandlogos/PANASONIC.jpg";
import voltas from "../assets/brandlogos/VOLTAS.jpg";
import ogenral from "../assets/brandlogos/OGENERAL.jpg";
import whirlpool from "../assets/brandlogos/Whirlpool.jpg";
import samsung from "../assets/brandlogos/samsung.png";
import godrej from "../assets/brandlogos/godrej.jpg"
import toshiba from "../assets/brandlogos/Toshiba.png"
import IFB from "../assets/brandlogos/IFB.png"

/* ─────────────────────────────────────────
   SNOW ANIMATION
───────────────────────────────────────── */
function SnowCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let flakes = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const img = new Image();
    img.src = snowflakeSrc;
    for (let i = 0; i < 38; i++) {
      flakes.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 18 + 8, speed: Math.random() * 0.6 + 0.3,
        drift: Math.random() * 0.4 - 0.2, opacity: Math.random() * 0.45 + 0.15,
        rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.012,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((f) => {
        ctx.save(); ctx.globalAlpha = f.opacity;
        ctx.translate(f.x + f.size / 2, f.y + f.size / 2);
        ctx.rotate(f.rotation);
        ctx.drawImage(img, -f.size / 2, -f.size / 2, f.size, f.size);
        ctx.restore();
        f.y += f.speed; f.x += f.drift; f.rotation += f.rotSpeed;
        if (f.y > canvas.height) { f.y = -f.size; f.x = Math.random() * canvas.width; }
        if (f.x > canvas.width) f.x = 0;
        if (f.x < 0) f.x = canvas.width;
      });
      animId = requestAnimationFrame(draw);
    };
    img.onload = draw;
    img.onerror = draw;
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

/* ─────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const services = [
  { icon: "🔧", title: "AC Repair",          desc: "Quick diagnosis & reliable repair for all AC makes and models." },
  { icon: "🏗️", title: "AC Fitting",         desc: "Professional installation with precision mounting & testing." },
  { icon: "🧹", title: "AC Servicing",       desc: "Deep cleaning & full tune-up to maximise efficiency." },
  { icon: "💨", title: "AC Gas Charging",    desc: "Refrigerant top-up & leak checks for optimal cooling." },
  { icon: "📦", title: "AC Uninstall",       desc: "Safe & careful removal with zero damage to walls or unit." },
  { icon: "🔩", title: "Copper Pipe Fitting",desc: "High-grade copper pipe fitting for long-lasting installations." },
  { icon: "🪟", title: "Window AC Service",  desc: "Complete service & maintenance for window AC units." },
  { icon: "🌀", title: "Split AC Service",   desc: "Full split system service — indoor & outdoor units." },
  { icon: "💧", title: "Jet Pump Service",   desc: "Water pump repair, servicing & pressure optimisation." },
  { icon: "⚡", title: "AC Wiring Repair",   desc: "Safe electrical wiring fixes by certified technicians." },
  { icon: "🌬️", title: "AC Fan Repair",      desc: "Blower & condenser fan repair to restore proper airflow." },
  { icon: "🖥️", title: "AC PCB Repair",      desc: "Circuit board diagnostics and component-level repairs." },
  { icon: "🚚", title: "AC Shifting",        desc: "Hassle-free relocation of your AC to a new location." },
  { icon: "✨", title: "New AC for Sale",    desc: "Top brands, best prices — we help you pick the right unit." },
  { icon: "♻️", title: "Second Hand AC",     desc: "Tested & certified pre-owned ACs at unbeatable prices." },
];

const whyUs = [
  { icon: "⚡", title: "24-Hour Service",       desc: "We respond fast — most issues resolved within 24 hours of your call." },
  { icon: "🏅", title: "Certified Technicians", desc: "Every engineer is trained, verified, and experienced across all AC brands." },
  { icon: "💰", title: "Transparent Pricing",   desc: "No hidden charges. You get a clear quote before any work begins." },
  { icon: "🔒", title: "Service Guarantee",     desc: "All repairs come with a warranty. If it fails, we fix it — free." },
  { icon: "📍", title: "Local & Reliable",      desc: "Based in your area. We know local homes, climates, and AC needs." },
  { icon: "⭐", title: "5-Star Rated",          desc: "Hundreds of happy customers trust us to keep their homes cool." },
];

/* ── BRANDS — drop your logo src="" in later ── */
const brandsRow1 = [
  { name: "Samsung",   src: samsung },
  { name: "LG",        src: lg },
  { name: "Daikin",    src: daikin },
  { name: "Voltas",    src: voltas },
  { name: "Hitachi",   src: hitachi },
  { name: "Blue Star", src: bluestar },
  { name: "Carrier",   src: carrier },
  { name: "Panasonic", src: panosonic },
];
const brandsRow2 = [
  { name: "Whirlpool",  src: whirlpool },
  { name: "Godrej",     src: godrej },
  { name: "O General",  src: ogenral },
  { name: "Mitsubishi", src: mitshubishi },
  { name: "Lloyd",      src: lloyd },
  { name: "Haier",      src: haier },
  { name: "IFB",        src: IFB },
  { name: "Toshiba",    src: toshiba },
];

/* ── 8 reviews for infinite scroll ── */
const reviews = [
  { name: "Rahul Sharma",  location: "Andheri",  rating: 5, text: "MD Cool Care fixed my AC the same evening I called. Super professional team, fair pricing, and the cooling is perfect now. Highly recommended!", avatar: "RS" },
  { name: "Priya Verma",   location: "Bandra",   rating: 4, text: "Got a second-hand AC from them — fully serviced and works like new. Saved a lot of money and the installation was done cleanly and quickly.", avatar: "PV" },
  { name: "Anil Kumar",    location: "Dadar",    rating: 4, text: "Annual servicing done in under an hour. The technician was polite, clean, and explained everything. My electricity bill has come down noticeably!", avatar: "AK" },
  { name: "Sunita Joshi",  location: "Malad",    rating: 5, text: "Called at 11pm for an emergency repair. They arrived within 2 hours! Gas was recharged and the unit was running perfectly. Lifesavers in summer!", avatar: "SJ" },
  { name: "Deepak Patil",  location: "Thane",    rating: 5, text: "Got my split AC installed in record time. The team was clean, efficient and left no mess behind. Will definitely call them again next season.", avatar: "DP" },
  { name: "Meena Nair",    location: "Borivali", rating: 5, text: "PCB repair done at a fraction of what other shops quoted. Honest pricing, fast turnaround, and the AC is working better than ever!", avatar: "MN" },
  { name: "Sanjay Gupta",  location: "Kurla",    rating: 5, text: "Window AC was making a terrible noise. They diagnosed and fixed it in 45 minutes flat. Polite staff and very reasonable charges.", avatar: "SG" },
  { name: "Kavita Reddy",  location: "Powai",    rating: 4, text: "Copper pipe fitting was done neatly and professionally. No leaks, no mess. The team explained every step. Great service overall!", avatar: "KR" },
];

/* ─────────────────────────────────────────
   STAR RATING
───────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   BRAND CARD — placeholder until src added
───────────────────────────────────────── */
function BrandCard({ brand }) {
  return (
    <div className="flex-shrink-0 
w-32 h-20 
sm:w-40 sm:h-24 
md:w-48 md:h-28 
mx-2 sm:mx-3 
rounded-xl bg-white border border-slate-100 shadow-sm 
flex flex-col items-center justify-center gap-1 px-2 
hover:shadow-md hover:border-sky-100 transition-all duration-200 cursor-default">

  {brand.src ? (
    <img
      src={brand.src}
      alt={brand.name}
      className="h-12 sm:h-16 md:h-24 w-auto object-contain"
    />
  ) : (
    <>
      <div className="w-10 h-4 rounded bg-gradient-to-r from-slate-100 to-slate-200" />
    </>
  )}

</div>
  

  );
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
const Home = () => {
  const [servRef,  servIn]  = useInView();
  const [brandRef, brandIn] = useInView(0.1);
  const [whyRef,   whyIn]   = useInView();
  const [revRef,   revIn]   = useInView();

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes float {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-12px); }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }

        /* Brands row 1 — left to right */
        @keyframes marquee-ltr {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
        /* Brands row 2 — right to left */
        @keyframes marquee-rtl {
          0%   { transform:translateX(-50%); }
          100% { transform:translateX(0); }
        }
        .marquee-ltr {
          display:flex; width:max-content;
          animation:marquee-ltr 24s linear infinite;
        }
        .marquee-rtl {
          display:flex; width:max-content;
          animation:marquee-rtl 24s linear infinite;
        }
        .marquee-ltr:hover,
        .marquee-rtl:hover { animation-play-state:paused; }

        /* Reviews infinite scroll */
        @keyframes scroll-reviews {
          0%   { transform:translateX(0); }
          100% { transform:translateX(-50%); }
        }
        .reviews-track {
          display:flex; width:max-content;
          animation:scroll-reviews 60s linear infinite;
        }
        .reviews-track:hover { animation-play-state:paused; }

        .anim-fade-up { animation:fadeUp 0.7s ease both; }
        .anim-slide-l { animation:fadeUp 0.7s ease both; }
        .float-img    { animation:float 4s ease-in-out infinite; }

        .service-card:hover { transform:translateY(-6px) scale(1.02); }
        .service-card { transition:transform .3s ease, box-shadow .3s ease; }

        .shimmer-text {
          background:linear-gradient(90deg,#0ea5e9,#38bdf8,#7dd3fc,#0ea5e9);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 3s linear infinite;
        }
        .why-card:hover .why-icon { transform:scale(1.15) rotate(-5deg); }
        .why-icon { transition:transform .3s ease; }
      `}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 pt-24">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <SnowCanvas />

        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="flex flex-col gap-6">
              <div className="anim-fade-up" style={{ animationDelay: "0.1s" }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold tracking-widest uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                  </span>
                  Available 24 / 7
                </span>
              </div>

              <div className="anim-fade-up" style={{ animationDelay: "0.2s" }}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                  Your AC Issue{" "}
                  <span className="shimmer-text">Fixed Within</span><br />
                  <span className="shimmer-text">24 Hours</span> —<br />
                  <span className="text-slate-300 font-light">Guaranteed.</span>
                </h1>
              </div>

              <p className="anim-fade-up text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg" style={{ animationDelay: "0.35s" }}>
                MD Cool Care brings expert AC repair, installation, and servicing right to your doorstep. Fast response. Certified technicians. Fair prices.
              </p>

              <div className="anim-fade-up flex flex-wrap gap-3" style={{ animationDelay: "0.45s" }}>
                {["⚡ Same-day response", "🏅 Certified engineers", "🔒 Service warranty"].map((t) => (
                  <span key={t} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">{t}</span>
                ))}
              </div>

              <div className="anim-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.55s" }}>
                <NavLink to="/contact" className="px-7 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all duration-200 text-sm">
                  Book a Service →
                </NavLink>
                <a href="tel:+919022095489" className="px-7 py-3.5 border border-white/15 text-white font-semibold rounded-2xl hover:bg-white/5 transition-all duration-200 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>

              <div className="anim-fade-up flex gap-8 pt-2" style={{ animationDelay: "0.65s" }}>
                {[["2,800+", "Happy Customers"], ["10+", "Years Experience"], ["96%", "Satisfaction"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="text-2xl font-bold text-white">{val}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="anim-slide-l flex items-center justify-center" style={{ animationDelay: "0.4s" }}>
              <div className="relative float-img">
                <div className="absolute inset-0 rounded-3xl bg-sky-500/20 blur-2xl scale-110" />
                <div className="relative w-full max-w-md lg:max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-sky-900/50 bg-slate-800/60 backdrop-blur-sm">
                  <img src={homeright} alt="AC Technician" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════
          SERVICES
      ══════════════════════════════ */}
      <section ref={servRef} className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className={`text-center mb-14 transition-all duration-700 ${servIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-4">What We Do</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">Our AC Services</h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              From quick repairs to full installations — we cover every AC need under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`service-card group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-sky-100/80 hover:border-sky-100 cursor-default
                  transition-all duration-700 ${servIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <div className="text-3xl mb-3">{svc.icon}</div>
                <h3 className="text-sm font-bold text-slate-800 mb-1.5 group-hover:text-sky-600 transition-colors">{svc.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{svc.desc}</p>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${servIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <NavLink to="/services" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-2xl shadow-md shadow-sky-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm">
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          BRANDS WE SERVICE  ← NEW
      ══════════════════════════════ */}
      <section ref={brandRef} className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className={`text-center mb-10 transition-all duration-700 ${brandIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-3">
              Brands We Service
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              We Repair All Major AC Brands
            </h2>
            <p className="mt-3 text-slate-500 text-sm max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              From Samsung to Daikin — our certified technicians are trained on every major brand available in India.
            </p>
          </div>
        </div>

        {/* Row 1 — slides left to right */}
        <div className="relative mb-4 overflow-hidden">
          <div className="absolute left-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="marquee-ltr">
            {[...brandsRow1, ...brandsRow1].map((brand, i) => (
              <BrandCard key={`r1-${i}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Row 2 — slides right to left */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="marquee-rtl">
            {[...brandsRow2, ...brandsRow2].map((brand, i) => (
              <BrandCard key={`r2-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════ */}
      <section ref={whyRef} className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className={`text-center mb-14 transition-all duration-700 ${whyIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">Why Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Why Choose <span className="shimmer-text">MD Cool Care?</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We're not just another AC company — we're your long-term cooling partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className={`why-card group relative bg-white/5 border border-white/8 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/8 hover:border-sky-500/30 transition-all duration-700 cursor-default
                  ${whyIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="why-icon text-4xl mb-4">{item.icon}</div>
                <div className="w-8 h-0.5 bg-sky-500 rounded-full mb-4 group-hover:w-14 transition-all duration-300" />
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          REVIEWS — AUTO SCROLL  ← UPDATED
      ══════════════════════════════ */}
      <section ref={revRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #e0f2fe 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

          <div className={`text-center mb-14 transition-all duration-700 ${revIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold tracking-widest uppercase mb-4">
              ⭐ Customer Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Real stories from real homeowners who trust MD Cool Care every cooling season.
            </p>
          </div>

          {/* Infinite horizontal scroll carousel */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="reviews-track">
              {/* Duplicate for seamless loop */}
              {[...reviews, ...reviews].map((r, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-72 sm:w-80 mx-3 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-4
                    hover:shadow-xl hover:shadow-sky-100/50 hover:border-sky-100 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Stars */}
                  <Stars count={r.rating} />

                  {/* Quote */}
                  <p className="text-slate-600 text-sm leading-relaxed flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    "{r.text}"
                  </p>

                  <div className="h-px bg-slate-200" />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                      <p className="text-xs text-slate-400">{r.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overall rating badge */}
          <div className={`mt-14 flex justify-center transition-all duration-700 delay-500 ${revIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 shadow-sm">
              <div className="text-center">
                <p className="text-3xl font-bold text-sky-600">4.9</p>
                <Stars count={5} />
              </div>
              <div className="w-px h-12 bg-sky-200" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Overall Rating</p>
                <p className="text-xs text-slate-500">Based on 400+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BANNER
      ══════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">AC not cooling? Call us right now!</h2>
          <p className="text-sky-100 text-base sm:text-lg mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            We're available round the clock. Fast response. Expert fix. 100% satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919022095489" className="px-8 py-3.5 bg-white text-sky-600 font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-sm">
              📞 Call Now
            </a>
            <NavLink to="/contact" className="px-8 py-3.5 border-2 border-white/50 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-200 text-sm">
              Book Online
            </NavLink>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;