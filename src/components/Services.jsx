import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

/* ─────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────── */
function useInView(threshold = 0.08) {
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
   SERVICES DATA
───────────────────────────────────────── */
const services = [
  {
    id: 1,
    icon: "🔧",
    title: "AC Repair",
    category: "repair",
    badge: "Most Requested",
    badgeColor: "bg-rose-50 text-rose-500 border-rose-100",
    time: "2–4 hrs",
    warranty: "7 days",
    desc: "Fast and accurate diagnosis of all AC faults — from strange noises and water leaks to complete breakdowns. Our certified engineers fix all brands and models on the same day.",
    includes: ["Full system diagnosis", "Component testing", "Fault repair & replacement", "Post-repair test run"],
  },
  {
    id: 2,
    icon: "🏗️",
    title: "AC Fitting / Installation",
    category: "installation",
    badge: "Popular",
    badgeColor: "bg-sky-50 text-sky-500 border-sky-100",
    time: "3–5 hrs",
    warranty: "60 days",
    desc: "Professional installation of split, window, and cassette AC units with precision wall mounting, electrical connection, and full commissioning test.",
    includes: ["Wall bracket installation", "Indoor & outdoor unit mounting", "Electrical wiring", "Test & commissioning"],
  },
  {
    id: 3,
    icon: "🧹",
    title: "AC Servicing",
    category: "maintenance",
    badge: "Recommended",
    badgeColor: "bg-emerald-50 text-emerald-500 border-emerald-100",
    time: "1–2 hrs",
    warranty: "7 days",
    desc: "Thorough cleaning of filters, coils, drain pipes, and blower fan. Regular servicing extends the life of your unit and reduces electricity bills by up to 20%.",
    includes: ["Filter deep clean", "Coil washing & foam clean", "Drain pipe flush", "Blower & fan cleaning"],
  },
  {
    id: 4,
    icon: "💨",
    title: "AC Gas Charging",
    category: "repair",
    badge: "Fast Service",
    badgeColor: "bg-violet-50 text-violet-500 border-violet-100",
    time: "1–2 hrs",
    warranty: "7 days",
    desc: "Refrigerant (gas) leak detection and top-up service. We use industry-grade equipment to check pressure levels and refill with the correct refrigerant type for your unit.",
    includes: ["Leak detection check", "Pressure testing", "Refrigerant refill (R22/R32/R410A)", "Cooling performance test"],
  },
  {
    id: 5,
    icon: "📦",
    title: "AC Uninstallation",
    category: "installation",
    badge: null,
    badgeColor: "",
    time: "1–2 hrs",
    warranty: "1 day",
    desc: "Safe and careful removal of your AC unit without damaging walls, pipes, or the unit itself. Ideal for home renovations, relocation, or upgrading your system.",
    includes: ["Gas recovery (if needed)", "Safe unit dismounting", "Pipe cap & seal", "Wall patch guidance"],
  },
  {
    id: 6,
    icon: "🔩",
    title: "Copper Pipe Fitting",
    category: "installation",
    badge: null,
    badgeColor: "",
    time: "2–3 hrs",
    warranty: "60 days",
    desc: "High-grade copper pipe installation and repair for AC refrigerant lines. Proper pipe sizing, insulation, and leak-free connections for long-lasting performance.",
    includes: ["Pipe sizing & routing", "Brazing & flaring", "Insulation wrapping", "Pressure leak test"],
  },
  {
    id: 7,
    icon: "🪟",
    title: "Window AC Service",
    category: "maintenance",
    badge: null,
    badgeColor: "",
    time: "1–2 hrs",
    warranty: "7 days",
    desc: "Complete servicing of window AC units including deep filter cleaning, cooling coil wash, fan motor check, and performance tuning for peak summer readiness.",
    includes: ["Filter & coil cleaning", "Fan motor check", "Drainage clearing", "Cooling performance test"],
  },
  {
    id: 8,
    icon: "🌀",
    title: "Split AC Service",
    category: "maintenance",
    badge: "Best Value",
    badgeColor: "bg-amber-50 text-amber-500 border-amber-100",
    time: "1.5–2.5 hrs",
    warranty: "7 days",
    desc: "Full service for split AC systems — indoor unit deep clean, outdoor unit pressure wash, PCB inspection, and refrigerant level check all in one visit.",
    includes: ["Indoor unit foam wash", "Outdoor unit pressure wash", "PCB & wiring inspection", "Gas level check"],
  },
  {
    id: 9,
    icon: "💧",
    title: "Jet Pump Service",
    category: "maintenance",
    badge: null,
    badgeColor: "",
    time: "2–3 hrs",
    warranty: "7 days",
    desc: "Complete servicing and repair of jet water pumps — motor check, impeller cleaning, pressure optimisation, and seal replacement to ensure consistent water pressure.",
    includes: ["Motor & winding check", "Impeller cleaning", "Seal & coupling replacement", "Pressure test & calibration"],
  },
  {
    id: 10,
    icon: "⚡",
    title: "AC Wiring Repair",
    category: "repair",
    badge: null,
    badgeColor: "",
    time: "1–3 hrs",
    warranty: "7 days",
    desc: "Safe diagnosis and repair of AC electrical faults — from tripped breakers and burnt wiring to loose connections and control board issues. Done by certified electricians.",
    includes: ["Wiring fault diagnosis", "Burnt wire replacement", "Connection tightening", "Safety continuity test"],
  },
  {
    id: 11,
    icon: "🌬️",
    title: "AC Fan Repair",
    category: "repair",
    badge: null,
    badgeColor: "",
    time: "2–3 hrs",
    warranty: "7 days",
    desc: "Repair or replacement of blower fans (indoor) and condenser fans (outdoor). Poor airflow and unusual noise are common signs your fan needs attention.",
    includes: ["Fan motor testing", "Blade inspection & cleaning", "Capacitor check", "Fan replacement if needed"],
  },
  {
    id: 12,
    icon: "🖥️",
    title: "AC PCB Repair",
    category: "repair",
    badge: "Specialist",
    badgeColor: "bg-indigo-50 text-indigo-500 border-indigo-100",
    time: "3–5 hrs",
    warranty: "30 days",
    desc: "Component-level PCB (printed circuit board) diagnosis and repair. We fix error codes, communication faults, and control board failures across all major AC brands.",
    includes: ["Error code diagnosis", "Component-level testing", "PCB repair or replacement", "Full system function test"],
  },
  {
    id: 13,
    icon: "🚚",
    title: "AC Shifting",
    category: "installation",
    badge: null,
    badgeColor: "",
    time: "3–5 hrs",
    warranty: "7 days",
    desc: "Complete relocation of your AC unit to a new room or new home — uninstallation, transport preparation, reinstallation, and full recommissioning at the new location.",
    includes: ["Old location removal", "Gas handling & sealing", "New location installation", "Recommissioning & test"],
  },
  {
    id: 14,
    icon: "✨",
    title: "New AC for Sale",
    category: "sell",
    badge: "Top Brands",
    badgeColor: "bg-sky-50 text-sky-500 border-sky-100",
    time: "Same day",
    warranty: "Brand warranty",
    desc: "We supply and install brand-new AC units from top manufacturers. Get expert advice on the right capacity, star rating, and model for your room size and budget.",
    includes: ["Expert sizing consultation", "Top brand selection", "Supply & delivery", "Professional installation"],
  },
  {
    id: 15,
    icon: "♻️",
    title: "Second Hand AC",
    category: "sell",
    badge: "Budget Friendly",
    badgeColor: "bg-emerald-50 text-emerald-500 border-emerald-100",
    time: "Same day",
    warranty: "7 days",
    desc: "Certified pre-owned AC units — fully serviced, gas-charged, and tested before sale. Get the comfort of a new AC at a fraction of the price with our satisfaction guarantee.",
    includes: ["Full service & gas check", "Cooling performance certified", "Delivery & installation", "30-day unit warranty"],
  },
];

const filters = [
  { key: "all", label: "All Services", icon: "⚡" },
  { key: "repair", label: "Repair", icon: "🔧" },
  { key: "maintenance", label: "Maintenance", icon: "🧹" },
  { key: "installation", label: "Installation", icon: "🏗️" },
  { key: "sell", label: "Buy AC", icon: "🛒" },
];

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
function ServiceCard({ svc, index, inView }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden
        hover:shadow-xl hover:shadow-sky-100/60 hover:border-sky-100 hover:-translate-y-1
        transition-all duration-500 flex flex-col
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${(index % 6) * 70}ms` }}
    >
      {/* Card top color strip */}
      <div className="h-1 w-full bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Icon + Badge row */}
        <div className="flex items-start justify-between gap-2">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-sky-100 transition-all duration-300 flex-shrink-0">
            {svc.icon}
          </div>
          {svc.badge && (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${svc.badgeColor}`}>
              {svc.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-200 leading-tight">
          {svc.title}
        </h3>

        {/* Desc */}
        <p className="text-sm text-slate-500 leading-relaxed flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {svc.desc}
        </p>

        {/* Time & Warranty */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
            ⏱ {svc.time}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
            🔒 {svc.warranty}
          </span>
        </div>

        {/* What's Included toggle */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center justify-between w-full text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors pt-1 border-t border-slate-100"
        >
          <span>What's Included</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded includes */}
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <ul className="flex flex-col gap-1.5 pt-1">
            {svc.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-slate-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Book CTA */}
        <NavLink
          to="/contact"
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold
            shadow-sm shadow-sky-200 hover:shadow-md hover:shadow-sky-300 hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          Book This Service
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SERVICES PAGE
───────────────────────────────────────── */
const Services = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [gridRef, gridIn] = useInView(0.05);
  const [processRef, processIn] = useInView();
  const [ctaRef, ctaIn] = useInView();

  const filtered = activeFilter === "all"
    ? services
    : services.filter((s) => s.category === activeFilter);

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc, #0ea5e9);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 pt-36 pb-28 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating service icons bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["🔧","❄️","💨","🌀","⚡","🏗️","🔩","🌬️"].map((icon, i) => (
            <span
              key={i}
              className="absolute text-2xl opacity-5"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 28}%`,
                animation: `float ${3 + i * 0.4}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {icon}
            </span>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-5">
            What Services We Offer
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Complete AC Care —{" "}
            <span className="shimmer-text">One Trusted Team</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            From quick repairs to full installations, gas charging to PCB fixes — we handle every AC need with speed, skill, and a service guarantee.
          </p>

          {/* Quick stats */}
          <div className="inline-flex flex-wrap justify-center gap-6 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {[["15+", "Services"], ["With in 24hr", "Response"], ["30-Day", "Warranty"], ["All Brands", "Supported"]].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="text-lg font-bold text-sky-400">{val}</p>
                <p className="text-xs text-slate-500">{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none">
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FILTER + GRID
      ═══════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200
                  ${activeFilter === f.key
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-transparent shadow-md shadow-sky-200 scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50"
                  }`}
              >
                <span>{f.icon}</span>
                {f.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeFilter === f.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {f.key === "all" ? services.length : services.filter(s => s.category === f.key).length}
                </span>
              </button>
            ))}
          </div>

          {/* Count label */}
          <p className="text-center text-xs text-slate-400 mb-8 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Showing <span className="text-sky-600 font-bold">{filtered.length}</span> service{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Services Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} inView={gridIn} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════ */}
      <section ref={processRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #e0f2fe 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

          <div className={`text-center mb-14 transition-all duration-700 ${processIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-4">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              How It <span className="text-sky-500">Works</span>
            </h2>
            <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Getting your AC fixed is simple. Here's what happens after you call us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">

            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-blue-400 z-0" />

            {[
              { step: "01", icon: "📞", title: "Call or Book Online", desc: "Reach us by phone or fill in our quick booking form — available 24/7." },
              { step: "02", icon: "🗓️", title: "Schedule a Visit", desc: "We confirm a convenient time slot and send a certified technician to your home." },
              { step: "03", icon: "🔍", title: "Diagnose & Fix", desc: "Our engineer inspects, diagnoses the issue, and completes the repair on the spot." },
              { step: "04", icon: "✅", title: "Test & Guarantee", desc: "We run a full performance test and hand over a service warranty before we leave." },
            ].map((step, i) => (
              <div
                key={step.step}
                className={`relative z-10 flex flex-col items-center text-center gap-4 transition-all duration-700
                  ${processIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-sky-200">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-sky-400 tracking-widest">STEP {step.step}</span>
                <h3 className="text-sm font-bold text-slate-800">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          WHY BOOK WITH US STRIP
      ═══════════════════════════════════ */}
      <section className="py-12 bg-gradient-to-r from-sky-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-20 relative z-10">
            {[
              { icon: "⚡", label: "Same-Day Response" },
          
              { icon: "🔒", label: "7-30 Days Warranty" },
              { icon: "💰", label: "Transparent Pricing" },
              { icon: "📍", label: "Local & Trusted" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-white">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════ */}
      <section ref={ctaRef} className="py-20 bg-slate-900">
        <div className={`max-w-3xl mx-auto px-5 sm:px-8 text-center transition-all duration-700 ${ctaIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-5xl mb-5">❄️</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-slate-400 text-base mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Just call us — our team will diagnose the issue for free and recommend the right solution. No pressure, no hidden fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+91 9022095489"
              className="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-900/40 hover:scale-105 active:scale-95 transition-all duration-200 text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call for Free Diagnosis
            </a>
            <NavLink
              to="/contact"
              className="px-8 py-3.5 border border-slate-600 text-slate-300 font-semibold rounded-2xl hover:bg-slate-800 hover:border-slate-500 transition-all duration-200 text-sm"
            >
              Book Online
            </NavLink>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;