import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import owner from "../assets/owner.jpg"
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
const highlights = [
  { icon: "❄️", value: "10+", label: "Years in Business" },
  { icon: "👨‍🔧", value: "15+", label: "Expert Technicians" },
  { icon: "🏠", value: "2,800+", label: "Homes Served" },
  { icon: "⭐", value: "4.7/5", label: "Customer Rating" },
];

const story = [
  {
    year: "2015",
    title: "Where It All Began",
    desc: "MD Cool Care was founded in a small workshop with just two technicians and a single van. Our founder's vision was simple — give every household access to fast, honest, and affordable AC care.",
  },
  {
    year: "2019",
    title: "Growing Our Team",
    desc: "Demand grew rapidly through word of mouth. We expanded to a team of 5 certified engineers and launched our 24-hour emergency service — a first in the local market.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    desc: "MD Cool Care was awarded 'Best AC Service Provider' in the region. We introduced our Service Guarantee — if it breaks again within 7 days, we fix it free.",
  },
  {
    year: "2025",
    title: "Trusted by Thousands",
    desc: "Today we serve 2,800+ homes across the region with a full-stack team of engineers, a modern service fleet, and a commitment that has never wavered — your comfort, always first.",
  },
];

const team = [
  {
    name: "Rajesh Kumar",
    role: "Lead AC Technician",
    exp: "5 years experience",
    spec: "Split & Inverter AC Systems",
    avatar: "", // ← drop image src here
  },
  {
    name: "Anil Sharma",
    role: "Senior Installation Engineer",
    exp: "3 years experience",
    spec: "Copper Pipe & Wiring",
    avatar: "",
  },
  {
    name: "Deepak Singh",
    role: "PCB & Electronics Specialist",
    exp: "6 years experience",
    spec: "PCB Repair & Diagnostics",
    avatar: "",
  },
];

const achievements = [
  { icon: "🏆", title: "Best AC Service 2024", desc: "Regional industry award for outstanding service quality." },
  { icon: "🔒", title: "ISO Certified Workshop", desc: "Our service process meets international quality standards." },
  { icon: "💯", title: "7-Day Fix Guarantee", desc: "Every repair is backed by a no-questions warranty." },
  { icon: "🌱", title: "Eco-Friendly Practices", desc: "Responsible refrigerant disposal & energy-efficient recommendations." },
];

/* ─────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────── */
const About = () => {
  const [highlightRef, highlightIn] = useInView();
  const [ownerRef, ownerIn] = useInView();
  const [storyRef, storyIn] = useInView();
  const [teamRef, teamIn] = useInView();
  const [achRef, achIn] = useInView();

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
        .timeline-line::before {
          content: '';
          position: absolute;
          left: 18px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #0ea5e9, #1d4ed8);
        }
      `}</style>

      {/* ═══════════════════════════════
          HERO BANNER
      ═══════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 pt-36 pb-24 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-5">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            We've Been Keeping{" "}
            <span className="shimmer-text">Homes Cool</span>
            <br />Since 2015
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            MD Cool Care was built on trust, speed, and a genuine care for every customer. Here's our story — from a small workshop to thousands of happy homes.
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none">
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════
          HIGHLIGHT STATS
      ═══════════════════════════════ */}
      <section ref={highlightRef} className="py-14 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((h, i) => (
              <div
                key={h.label}
                className={`bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm
                  transition-all duration-700 ${highlightIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-2">{h.icon}</div>
                <p className="text-2xl sm:text-3xl font-bold text-sky-600">{h.value}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          OWNER SECTION
      ═══════════════════════════════ */}
      <section ref={ownerRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Owner Photo */}
            <div className={`flex justify-center transition-all duration-700 ${ownerIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 opacity-15 blur-xl" />
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[400px] lg:h-[400px] rounded-3xl overflow-hidden">
                {/* ← Replace src="" with owner photo */}
                  <img src={owner} alt="Owner" className="w-full h-full object-cover object-top " />
                  {/* Placeholder */}
                  {/* <div className="flex flex-col items-center gap-3 text-slate-300">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs text-slate-400">Owner Photo</span>
                  </div> */}
                </div>

                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-sky-500 to-blue-600 text-white px-4 py-2 rounded-2xl shadow-lg text-xs font-bold">
                  ✅ Founder & CEO
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className={`flex flex-col gap-5 transition-all duration-700 delay-200 ${ownerIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase">
                Meet the Founder
              </span>

              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">MD Hussain Nathani</h2>
                <p className="text-sky-500 font-semibold mt-1 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Founder & CEO — MD Cool Care
                </p>
              </div>

              <div className="w-10 h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />

              <p className="text-slate-600 text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                With over 10 years of hands-on experience in HVAC and AC systems, MD Hussain Nathani started MD Cool Care with a mission — to make quality AC service accessible, fast, and trustworthy for every household.
              </p>
              <p className="text-slate-600 text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Having trained under senior engineers and worked with top AC brands, he built a team that reflects his core values: honesty, speed, and long-lasting results. Today he personally oversees quality control for every major job.
              </p>

              {/* Owner tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["10+ Years Experience", "HVAC Certified", "500+ Installations", "Customer-First Approach"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="tel:+1234567890"
                className="mt-2 w-fit inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-md shadow-sky-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Talk to the Founder
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          OUR STORY — TIMELINE
      ═══════════════════════════════ */}
      <section ref={storyRef} className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">

          <div className={`text-center mb-14 transition-all duration-700 ${storyIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-xs font-bold tracking-widest uppercase mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              How We Built <span className="text-sky-500">MD Cool Care</span>
            </h2>
            <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Every great company has a story. Here's ours — built on hard work, trust, and a relentless commitment to quality.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative timeline-line pl-12 flex flex-col gap-10">
            {story.map((s, i) => (
              <div
                key={s.year}
                className={`relative transition-all duration-700 ${storyIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Dot */}
                <div className="absolute -left-12 top-1 w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-sky-200 z-10">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-100 transition-all duration-300">
                  <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold mb-3">{s.year}</span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          OUR TEAM
      ═══════════════════════════════ */}
      <section ref={teamRef} className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

          <div className={`text-center mb-14 transition-all duration-700 ${teamIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">
              The Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              The Experts Behind{" "}
              <span className="shimmer-text">Every Fix</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Trained, certified, and passionate — our team treats every home like their own.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`group bg-white/5 border border-white/8 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-sky-500/30 transition-all duration-700
                  ${teamIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Photo */}
                <div className="w-20 h-20 rounded-2xl bg-slate-700 overflow-hidden mb-4 border-2 border-white/10 flex items-center justify-center">
                  {/* ← Replace src="" with team member photo */}
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover hidden" />
                  <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <div className="w-8 h-0.5 bg-sky-500 rounded-full mb-3 group-hover:w-14 transition-all duration-300" />

                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <p className="text-sky-400 text-xs font-semibold mt-0.5 mb-3">{member.role}</p>
                <p className="text-xs text-slate-400 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>🔧 {member.spec}</p>
                <p className="text-xs text-slate-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>⏱ {member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          ACHIEVEMENTS
      ═══════════════════════════════ */}
      <section ref={achRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

          <div className={`text-center mb-14 transition-all duration-700 ${achIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold tracking-widest uppercase mb-4">
              🏆 Achievements
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Our Milestones & Recognition
            </h2>
            <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Years of hard work recognised — here's what we've earned along the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((a, i) => (
              <div
                key={a.title}
                className={`group bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-100 rounded-2xl p-6
                  hover:border-sky-200 hover:shadow-md hover:shadow-sky-50 transition-all duration-700
                  ${achIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">{a.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to experience the MD Cool Care difference?</h2>
          <p className="text-sky-100 text-base mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Join 2,800+ happy homeowners who trust us with their comfort every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink
              to="/contact"
              className="px-8 py-3.5 bg-white text-sky-600 font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-sm"
            >
              Book a Service
            </NavLink>
            <NavLink
              to="/services"
              className="px-8 py-3.5 border-2 border-white/50 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-200 text-sm"
            >
              View Services
            </NavLink>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;