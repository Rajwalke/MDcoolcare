import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import snowflakeSrc from "../assets/snow.png"; // ← drop your snow PNG here
import homeright from "../assets/homeright.png";
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

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const img = new Image();
    img.src = snowflakeSrc;

    const NUM = 38;
    for (let i = 0; i < NUM; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 18 + 8,
        speed: Math.random() * 0.6 + 0.3,
        drift: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.45 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((f) => {
        ctx.save();
        ctx.globalAlpha = f.opacity;
        ctx.translate(f.x + f.size / 2, f.y + f.size / 2);
        ctx.rotate(f.rotation);
        ctx.drawImage(img, -f.size / 2, -f.size / 2, f.size, f.size);
        ctx.restore();
        f.y += f.speed;
        f.x += f.drift;
        f.rotation += f.rotSpeed;
        if (f.y > canvas.height) {
          f.y = -f.size;
          f.x = Math.random() * canvas.width;
        }
        if (f.x > canvas.width) f.x = 0;
        if (f.x < 0) f.x = canvas.width;
      });
      animId = requestAnimationFrame(draw);
    };

    img.onload = draw;
    img.onerror = draw; // still animate even if src is blank

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
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
  { icon: "🔧", title: "AC Repair", desc: "Quick diagnosis & reliable repair for all AC makes and models." },
  { icon: "🏗️", title: "AC Fitting", desc: "Professional installation with precision mounting & testing." },
  { icon: "🧹", title: "AC Servicing", desc: "Deep cleaning & full tune-up to maximise efficiency." },
  { icon: "💨", title: "AC Gas Charging", desc: "Refrigerant top-up & leak checks for optimal cooling." },
  { icon: "📦", title: "AC Uninstall", desc: "Safe & careful removal with zero damage to walls or unit." },
  { icon: "🔩", title: "Copper Pipe Fitting", desc: "High-grade copper pipe fitting for long-lasting installations." },
  { icon: "🪟", title: "Window AC Service", desc: "Complete service & maintenance for window AC units." },
  { icon: "🌀", title: "Split AC Service", desc: "Full split system service — indoor & outdoor units." },
  { icon: "💧", title: "Jet Pump Service", desc: "Water pump repair, servicing & pressure optimisation." },
  { icon: "⚡", title: "AC Wiring Repair", desc: "Safe electrical wiring fixes by certified technicians." },
  { icon: "🌬️", title: "AC Fan Repair", desc: "Blower & condenser fan repair to restore proper airflow." },
  { icon: "🖥️", title: "AC PCB Repair", desc: "Circuit board diagnostics and component-level repairs." },
  { icon: "🚚", title: "AC Shifting", desc: "Hassle-free relocation of your AC to a new location." },
  { icon: "✨", title: "New AC for Sale", desc: "Top brands, best prices — we help you pick the right unit." },
  { icon: "♻️", title: "Second Hand AC", desc: "Tested & certified pre-owned ACs at unbeatable prices." },
];

const whyUs = [
  { icon: "⚡", title: "24-Hour Service", desc: "We respond fast — most issues resolved within 24 hours of your call." },
  { icon: "🏅", title: "Certified Technicians", desc: "Every engineer is trained, verified, and experienced across all AC brands." },
  { icon: "💰", title: "Transparent Pricing", desc: "No hidden charges. You get a clear quote before any work begins." },
  { icon: "🔒", title: "Service Guarantee", desc: "All repairs come with a warranty. If it fails, we fix it — free." },
  { icon: "📍", title: "Local & Reliable", desc: "Based in your area. We know local homes, climates, and AC needs." },
  { icon: "⭐", title: "5-Star Rated", desc: "Hundreds of happy customers trust us to keep their homes cool." },
];

const reviews = [
  { name: "Rahul Sharma", location: "Andheri", rating: 5, text: "MD Cool Care fixed my AC the same evening I called. Super professional team, fair pricing, and the cooling is perfect now. Highly recommended!", avatar: "RS" },
  { name: "Priya Verma", location: "Bandra", rating: 4, text: "Got a second-hand AC from them — fully serviced and works like new. Saved a lot of money and the installation was done cleanly and quickly.", avatar: "PV" },
  { name: "Anil Kumar", location: "Dadar", rating: 4, text: "Annual servicing done in under an hour. The technician was polite, clean, and explained everything. My electricity bill has come down noticeably!", avatar: "AK" },
  { name: "Sunita Joshi", location: "Malad", rating: 5, text: "Called at 11pm for an emergency repair. They arrived within 2 hours! Gas was recharged and the unit was running perfectly. Lifesavers in summer!", avatar: "SJ" },
];

/* ─────────────────────────────────────────
   STAR RATING
───────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
const Home = () => {
  const [servRef, servIn] = useInView();
  const [whyRef, whyIn] = useInView();
  const [revRef, revIn] = useInView();

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .anim-fade-up   { animation: fadeUp    0.7s ease both; }
        .anim-fade-in   { animation: fadeIn    0.7s ease both; }
        .anim-slide-r   { animation: slideRight 0.7s ease both; }
        .anim-slide-l   { animation: slideLeft  0.7s ease both; }
        .float-img      { animation: float 4s ease-in-out infinite; }

        .service-card:hover { transform: translateY(-6px) scale(1.02); }
        .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }

        .shimmer-text {
          background: linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc, #0ea5e9);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .why-card:hover .why-icon { transform: scale(1.15) rotate(-5deg); }
        .why-icon { transition: transform 0.3s ease; }

        .review-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .review-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -10px rgba(14,165,233,0.15); }
      `}</style>

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 pt-24">

        {/* Background glow blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Snow canvas */}
        <SnowCanvas />

        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: Text ── */}
            <div className="flex flex-col gap-6">

              {/* Badge */}
              <div className="anim-fade-up" style={{ animationDelay: "0.1s" }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold tracking-widest uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
                  </span>
                  Available 24 / 7
                </span>
              </div>

              {/* Headline */}
              <div className="anim-fade-up" style={{ animationDelay: "0.2s" }}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                  Your AC Issue{" "}
                  <span className="shimmer-text">Fixed Within</span>
                  <br />
                  <span className="shimmer-text">24 Hours</span> —
                  <br />
                  <span className="text-slate-300 font-light text-3xl sm:text-4xl lg:text-5xl">Guaranteed.</span>
                </h1>
              </div>

              {/* Sub text */}
              <p className="anim-fade-up text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg" style={{ animationDelay: "0.35s" }}>
                MD Cool Care brings expert AC repair, installation, and servicing right to your doorstep. Fast response. Certified technicians. Fair prices. We keep your home cool — no matter what.
              </p>

              {/* Trust pills */}
              <div className="anim-fade-up flex flex-wrap gap-3" style={{ animationDelay: "0.45s" }}>
                {["⚡ Same-day response", "🏅 Certified engineers", "🔒 Service warranty"].map((t) => (
                  <span key={t} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="anim-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.55s" }}>
                <NavLink
                  to="/contact"
                  className="px-7 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
                >
                  Book a Service →
                </NavLink>
                <a
                  href="tel:+1234567890"
                  className="px-7 py-3.5 border border-white/15 text-white font-semibold rounded-2xl hover:bg-white/5 transition-all duration-200 text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>

              {/* Stats row */}
              <div className="anim-fade-up flex gap-8 pt-2" style={{ animationDelay: "0.65s" }}>
                {[["4,800+", "Happy Customers"], ["12+", "Years Experience"], ["98%", "Satisfaction"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="text-2xl font-bold text-white">{val}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Image ── */}
            <div className="anim-slide-l flex items-center justify-center" style={{ animationDelay: "0.4s" }}>
              <div className="relative float-img">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-sky-500/20 blur-2xl scale-110" />
                {/* Image box */}
                <div className="relative w-full max-w-md lg:max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-sky-900/50 bg-slate-800/60 backdrop-blur-sm">
                  {/* ← Replace src="" with your actual hero image */}
                  <img src={homeright} alt="AC Technician" className="w-full h-full object-cover" />
                  {/* Placeholder shown until image is added */}
                  
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — SERVICES
      ═══════════════════════════════════════ */}
      <section ref={servRef} className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Heading */}
          <div className={`text-center mb-14 transition-all duration-700 ${servIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-4">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Our AC Services
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              From quick repairs to full installations — we cover every AC need under one roof.
            </p>
          </div>

          {/* Services grid */}
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

          {/* CTA */}
          <div className={`text-center mt-12 transition-all duration-700 delay-500 ${servIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <NavLink
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-2xl shadow-md shadow-sky-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
            >
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — WHY CHOOSE US
      ═══════════════════════════════════════ */}
      <section ref={whyRef} className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

          {/* Heading */}
          <div className={`text-center mb-14 transition-all duration-700 ${whyIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Why Choose{" "}
              <span className="shimmer-text">MD Cool Care?</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We're not just another AC company — we're your long-term cooling partner.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className={`why-card group relative bg-white/5 border border-white/8 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/8 hover:border-sky-500/30 transition-all duration-700 cursor-default
                  ${whyIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <div className="why-icon text-4xl mb-4">{item.icon}</div>

                {/* Accent line */}
                <div className="w-8 h-0.5 bg-sky-500 rounded-full mb-4 group-hover:w-14 transition-all duration-300" />

                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — REVIEWS
      ═══════════════════════════════════════ */}
      <section ref={revRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">

        {/* Subtle bg pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #e0f2fe 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

          {/* Heading */}
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

          {/* Reviews grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className={`review-card bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-4
                  transition-all duration-700 ${revIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Stars */}
                <Stars count={r.rating} />

                {/* Quote */}
                <p className="text-slate-600 text-sm leading-relaxed flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  "{r.text}"
                </p>

                {/* Divider */}
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

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            AC not cooling? Call us right now!
          </h2>
          <p className="text-sky-100 text-base sm:text-lg mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            We're available round the clock. Fast response. Expert fix. 100% satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+1234567890"
              className="px-8 py-3.5 bg-white text-sky-600 font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
            >
              📞 Call Now
            </a>
            <NavLink
              to="/contact"
              className="px-8 py-3.5 border-2 border-white/50 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-200 text-sm"
            >
              Book Online
            </NavLink>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;