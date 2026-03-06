import { useRef, useState, useEffect } from "react";

/* ─────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────── */
function useInView(threshold = 0.1) {
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
   CONTACT INFO DATA
   ← Replace all values with your real info
───────────────────────────────────────── */
const PHONE      = "+91 9022095489";   // ← your phone number
const WHATSAPP   = "+91 9022095489";     // ← digits only, no + or spaces
const EMAIL      = "abdulmasjidnathani@gmail.com";
const INSTAGRAM  = "https://www.instagram.com/md_cool_care?igsh=a2JkeGpoMHhuYm1p";
const FACEBOOK   = "https://www.facebook.com/people/Md-Hussain-Nathani/pfbid0NDyq9PXFbyoChCxiFeoo4yDoccqsw4qhy1aqV47sTPkfNSR28ag8hwLkRuV8vodul/?rdid=V0BTz0fByMc2ukzN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HPdTPzkUr%2F";
const ADDRESS    = "xyz,Andheri-West, Mumbai, 400058";
const HOURS      = "Mon – Sun · 8:00 AM – 11:00 PM";
const EMERGENCY  = "24/7 Emergency Calls Available";

const contactCards = [
  {
    id: "phone",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    value: PHONE,
    sub: "Tap to call directly",
    href: `tel:${PHONE}`,
    gradient: "from-sky-500 to-blue-600",
    glow: "shadow-sky-200",
    badge: "📞 Primary",
  },
  {
    id: "whatsapp",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.853L.057 23.885a.5.5 0 00.606.628l6.188-1.63A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.893 9.893 0 01-5.031-1.374l-.361-.214-3.732.983.998-3.648-.235-.374A9.862 9.862 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/>
      </svg>
    ),
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    sub: "Quick replies · Share photos of issue",
    href: `https://wa.me/${WHATSAPP}?text=Hi%20MD%20Cool%20Care%2C%20I%20need%20help%20with%20my%20AC.`,
    gradient: "from-green-500 to-emerald-600",
    glow: "shadow-green-200",
    badge: "⚡ Fastest",
  },
  {
    id: "email",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    value: EMAIL,
    sub: "We reply within 2–4 hours",
    href: `mailto:${EMAIL}`,
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-200",
    badge: null,
  },
  {
    id: "instagram",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    label: "Instagram",
    value: "@mdcoolcare",
    sub: "Follow for tips & offers",
    href: INSTAGRAM,
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-200",
    badge: null,
  },
  {
    id: "facebook",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    label: "Facebook",
    value: "MD Cool Care",
    sub: "Message us on Facebook",
    href: FACEBOOK,
    gradient: "from-blue-600 to-blue-700",
    glow: "shadow-blue-200",
    badge: null,
  },
];

/* ─────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────── */
const Contact = () => {
  const [cardsRef, cardsIn] = useInView();
  const [formRef, formIn]   = useInView();
  const [infoRef, infoIn]   = useInView();

  const [form, setForm]         = useState({ name: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});

  const services = [
    "AC Repair", "AC Fitting / Installation", "AC Servicing",
    "AC Gas Charging", "AC Uninstallation", "Copper Pipe Fitting",
    "Window AC Service", "Split AC Service", "Jet Pump Service",
    "AC Wiring Repair", "AC Fan Repair", "AC PCB Repair",
    "AC Shifting", "New AC Purchase", "Second Hand AC", "Other / Not Sure",
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.phone.trim())   e.phone   = "Phone number is required";
    else if (!/^[0-9+\s-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.service)        e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Please describe your issue";
    return e;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  const whatsappMsg = encodeURIComponent(
    `Hi MD Cool Care! 👋\nName: ${form.name || "Customer"}\nService Needed: ${form.service || "Not specified"}\nMessage: ${form.message || "-"}`
  );

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg,#0ea5e9,#38bdf8,#7dd3fc,#0ea5e9);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        @keyframes popIn {
          0%   { opacity:0; transform:scale(0.85) translateY(20px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        .pop-in { animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both; }
        .input-field {
          width:100%; padding:12px 16px; border-radius:12px;
          border:1.5px solid #e2e8f0; background:#f8fafc;
          font-size:14px; color:#1e293b; outline:none;
          transition:border-color .2s, box-shadow .2s, background .2s;
          font-family:'DM Sans',sans-serif;
        }
        .input-field:focus {
          border-color:#38bdf8; background:#fff;
          box-shadow:0 0 0 3px rgba(56,189,248,0.12);
        }
        .input-field.error { border-color:#f87171; background:#fff7f7; }
        .input-field::placeholder { color:#94a3b8; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .spinner { animation:spin .8s linear infinite; }
        @keyframes pulse-dot {
          0%,100% { transform:scale(1); opacity:1; }
          50%      { transform:scale(1.4); opacity:.7; }
        }
        .pulse-dot { animation:pulse-dot 1.4s ease-in-out infinite; }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-5">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            We're Just a{" "}
            <span className="shimmer-text">Message Away</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            AC not cooling? Need a quote? Have a question? Reach us through any channel below — we respond fast, every day.
          </p>

          {/* Live availability badge */}
          <div className="mt-7 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <span className="text-green-400 text-xs font-semibold">Available now · 24/7 Emergency Support</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none">
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT CARDS
      ══════════════════════════════════ */}
      <section ref={cardsRef} className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Choose How to Reach Us</h2>
            <p className="text-slate-500 text-sm mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every channel is monitored — pick what's easiest for you.</p>
          </div>

          {/* Top 2 cards — Phone & WhatsApp (MOST IMPORTANT) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {contactCards.slice(0, 2).map((card, i) => (
              <a
                key={card.id}
                href={card.href}
                target={card.id !== "phone" ? "_blank" : undefined}
                rel="noreferrer"
                className={`group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm
                  hover:shadow-xl hover:${card.glow} hover:-translate-y-1 hover:border-transparent
                  transition-all duration-300 flex items-center gap-5 overflow-hidden
                  ${cardsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Big gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</span>
                    {card.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-green-50 border border-green-100 text-green-600 text-[10px] font-bold">{card.badge}</span>
                    )}
                  </div>
                  <p className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-200 truncate">{card.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.sub}</p>
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          {/* Bottom 3 cards — Email, Instagram, Facebook */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {contactCards.slice(2).map((card, i) => (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className={`group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm
                  hover:shadow-lg hover:${card.glow} hover:-translate-y-1 hover:border-transparent
                  transition-all duration-300 flex flex-col items-center text-center gap-3 overflow-hidden
                  ${cardsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${(i + 2) * 80}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{card.label}</p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{card.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{card.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FORM + INFO
      ══════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

            {/* ── FORM (3 cols) ── */}
            <div ref={formRef} className={`lg:col-span-3 transition-all duration-700 ${formIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="mb-7">
                <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-3">
                  Send a Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Book a Service or Get a Quote</h2>
                <p className="text-slate-500 text-sm mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Fill in your details and we'll get back to you within 30 minutes during business hours.
                </p>
              </div>

              {submitted ? (
                /* ── SUCCESS STATE ── */
                <div className="pop-in bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-10 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Message Received!</h3>
                  <p className="text-slate-500 text-sm mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Thank you! We'll call or WhatsApp you within 30 minutes. For urgent issues, call us directly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
                      target="_blank" rel="noreferrer"
                      className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      💬 Also Message on WhatsApp
                    </a>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name:"", phone:"", service:"", message:"" }); }}
                      className="px-6 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                /* ── FORM ── */
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`input-field ${errors.name ? "error" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1" style={{ fontFamily:"'DM Sans',sans-serif" }}>{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Phone Number * <span className="text-sky-500">(for WhatsApp & call)</span></label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" style={{ fontFamily:"'DM Sans',sans-serif" }}>+91</span>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="XXXXXXXXXX"
                        className={`input-field pl-12 ${errors.phone ? "error" : ""}`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-rose-500 mt-1" style={{ fontFamily:"'DM Sans',sans-serif" }}>{errors.phone}</p>}
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Service Needed *</label>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      className={`input-field ${errors.service ? "error" : ""}`}
                    >
                      <option value="">— Select a service —</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="text-xs text-rose-500 mt-1" style={{ fontFamily:"'DM Sans',sans-serif" }}>{errors.service}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Describe Your Issue *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="e.g. My split AC is not cooling properly and making a strange noise..."
                      className={`input-field resize-none ${errors.message ? "error" : ""}`}
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1" style={{ fontFamily:"'DM Sans',sans-serif" }}>{errors.message}</p>}
                  </div>

                  {/* Submit buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    {/* Primary submit */}
                    <button
                      type="submit" disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 text-sm"
                    >
                      {loading ? (
                        <>
                          <svg className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>

                    {/* WhatsApp shortcut */}
                    <a
                      href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
                      target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-md shadow-green-200 hover:shadow-green-300 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.853L.057 23.885a.5.5 0 00.606.628l6.188-1.63A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.893 9.893 0 01-5.031-1.374l-.361-.214-3.732.983.998-3.648-.235-.374A9.862 9.862 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/>
                      </svg>
                      WhatsApp Us
                    </a>
                  </div>

                  <p className="text-xs text-slate-400 text-center" style={{ fontFamily:"'DM Sans',sans-serif" }}>
                    🔒 Your details are safe with us. We never share your information.
                  </p>
                </form>
              )}
            </div>

            {/* ── INFO PANEL (2 cols) ── */}
            <div ref={infoRef} className={`lg:col-span-2 flex flex-col gap-5 transition-all duration-700 delay-200 ${infoIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-2xl p-6 text-white">
                <div className="text-2xl mb-3">🕐</div>
                <h3 className="text-base font-bold mb-1">Business Hours</h3>
                <p className="text-sky-300 text-sm font-semibold mb-1">{HOURS}</p>
                <p className="text-slate-400 text-xs" style={{ fontFamily:"'DM Sans',sans-serif" }}>{EMERGENCY}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="pulse-dot w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-green-400 text-xs font-semibold">We're open right now</span>
                </div>
              </div>

              {/* Address */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <div className="text-2xl mb-3">📍</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Our Location</h3>
                <p className="text-slate-500 text-sm" style={{ fontFamily:"'DM Sans',sans-serif" }}>{ADDRESS}</p>
                <p className="text-xs text-slate-400 mt-2" style={{ fontFamily:"'DM Sans',sans-serif" }}>Home visits available across the service area</p>
              </div>

              {/* Why contact us */}
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-slate-800 mb-4">When you contact us, expect:</h3>
                <ul className="flex flex-col gap-3">
                  {[
                    ["⚡", "Reply within 30 minutes"],
                    ["📅", "Same-day booking available"],
                    ["💰", "Free quote before work starts"],
                    ["🔒", "No fix, no fee guarantee"],
                  ].map(([icon, text]) => (
                    <li key={text} className="flex items-center gap-3">
                      <span className="text-lg">{icon}</span>
                      <span className="text-xs font-semibold text-slate-700" style={{ fontFamily:"'DM Sans',sans-serif" }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct call button */}
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-2xl shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                 Tap to Call Now — {PHONE}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          EMERGENCY STRIP
      ══════════════════════════════════ */}
      <section className="py-10 bg-gradient-to-r from-rose-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-lg">🚨 AC Emergency? We Come to You — Any Time, Any Day</p>
            <p className="text-orange-100 text-sm mt-1" style={{ fontFamily:"'DM Sans',sans-serif" }}>24/7 emergency call-outs available. No extra charges for night calls.</p>
          </div>
          <a
            href={`tel:${PHONE}`}
            className="flex-shrink-0 px-7 py-3 bg-white text-rose-600 font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-sm whitespace-nowrap"
          >
            📞 Emergency Call
          </a>
        </div>
      </section>

    </div>
  );
};

export default Contact;