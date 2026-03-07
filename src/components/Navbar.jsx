import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import mdcoolcarelogo from "../assets/mdcoolcarelogo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-sky-100/60"
            : "bg-white/85 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-1">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* ── Logo Only ── */}
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center group"
            >
              <img
                src={mdcoolcarelogo}
                alt="MD Cool Care Logo"
                className="h-16 md:h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </NavLink>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `relative px-5 py-2.5 text-[15px] font-semibold rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "text-sky-600 bg-sky-50"
                        : "text-slate-600 hover:text-sky-500 hover:bg-sky-50/60"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-sky-500 transition-all duration-300 ${
                          isActive ? "w-6" : "w-0 group-hover:w-5"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2.5 text-[15px] font-semibold text-slate-600 hover:text-sky-500 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                (+91) 9022095489
              </a>

              <NavLink
                to="/contact"
                className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[15px] font-semibold rounded-xl shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Book Now
              </NavLink>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-sky-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>

          </div>
        </div>

        {/* ── Bottom gradient line ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>

        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <img
              src={mdcoolcarelogo}
              alt="MD Cool Care Logo"
              className="h-10 w-auto object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Nav Links */}
          <nav className="flex flex-col px-4 py-6 gap-1.5 flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-sky-50 text-sky-600 border border-sky-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-sky-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-200 ${isActive ? "bg-sky-500" : "bg-slate-200"}`} />
                    {link.name}
                    {isActive && (
                      <svg className="w-4 h-4 text-sky-400 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Drawer Bottom CTAs */}
          <div className="px-6 pb-8 flex flex-col gap-3">
            <a
              href="tel:+91 9022095489"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-sky-200 text-sky-600 text-[15px] font-semibold hover:bg-sky-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (123) 456-7890
            </a>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[15px] font-semibold rounded-xl shadow-md shadow-sky-200 hover:opacity-90 transition-opacity duration-200"
            >
              Book a Service
            </NavLink>
          </div>

        </div>
      </div>
    </>
  );
}