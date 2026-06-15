import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LandingRouters } from "../../constants/routes";
import { MainContent } from "../../constants/mainContent";

const Header1 = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @keyframes hd-btn-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(0,210,255,0.2), 0 0 24px rgba(0,210,255,0.06); }
          50% { box-shadow: 0 0 18px rgba(0,210,255,0.35), 0 0 36px rgba(0,210,255,0.1); }
        }
        @keyframes hd-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes hd-slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ═══════════ DESKTOP HEADER ═══════════ */}
      <header
        className="hidden lg:flex fixed top-0 inset-x-0 z-50 h-[72px] px-8 items-center justify-between transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(to bottom, rgba(2, 6, 23, 0.92), rgba(2, 6, 20, 0.95))"
            : "linear-gradient(to bottom, rgba(2, 8, 20, 0.4), rgba(0, 5, 15, 0.25))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(0,210,255,0.15)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,210,255,0.05), 0 4px 20px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo */}
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(LandingRouters.DASHBOARD)}
        >
          <div className="relative">
            <img
              src={MainContent.fullLogo}
              alt="Logo"
              className="h-20 w-36 mt-6 object-contain"
            />
          </div>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.02em",
          }}>

          </span>
        </div>



        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(LandingRouters.USER_REGISTER)}
            className="px-5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: "linear-gradient(135deg, #06b6d4, #2563eb)",
              color: "#fff",
              animation: "hd-btn-glow 3s ease-in-out infinite",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate(LandingRouters.USER_LOGIN)}
            className="px-5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: "transparent",
              color: "transparent",
              border: "1px solid rgba(255,215,0,0.35)",
              backgroundImage: "linear-gradient(135deg, #FFD700, #f59e0b)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,215,0,0.6)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(255,215,0,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,215,0,0.35)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Login
          </button>
        </div>
      </header>

      {/* ═══════════ MOBILE HEADER ═══════════ */}
      <header
        className="lg:hidden fixed top-0 inset-x-0 z-50 h-16 px-4 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrolled || mobileOpen ? "linear-gradient(to bottom, rgba(2, 6, 23, 0.92), rgba(2, 6, 20, 0.95))" : "linear-gradient(to bottom, rgba(2, 8, 20, 0.4), rgba(0, 5, 15, 0.25))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(0,210,255,0.15)" : "none",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate(LandingRouters.DASHBOARD)}>
          <img src={MainContent.fullLogo} alt="Logo" className="h-16 w-16 object-contain" style={{ filter: "drop-shadow(0 0 6px rgba(0,210,255,0.2))" }} />
          <span style={{ fontFamily: "'Orbitron', monospace", fontWeight: 800, fontSize: "0.85rem" }}>
            <span style={{ background: "linear-gradient(135deg, #00D2FF, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>AIQA</span>
          </span>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-all duration-200"
          style={{ background: "rgba(0,210,255,0.04)", border: "1px solid rgba(0,210,255,0.08)" }}
        >
          <span className="block w-4 h-[1.5px] rounded-full transition-all duration-300" style={{
            background: "#00D2FF",
            transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
          }} />
          <span className="block w-4 h-[1.5px] rounded-full transition-all duration-300" style={{
            background: "#00D2FF",
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span className="block w-4 h-[1.5px] rounded-full transition-all duration-300" style={{
            background: "#00D2FF",
            transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
          }} />
        </button>
      </header>

      {/* ═══════════ MOBILE MENU DROPDOWN ═══════════ */}
      {mobileOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed top-16 inset-x-0 z-40"
          style={{
            background: "rgba(2,6,23,0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(0,210,255,0.06)",
            animation: "hd-slide-down 0.25s ease-out",
          }}
        >
          <div className="px-5 py-5 space-y-1">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.5)", background: "transparent", border: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#00D2FF"; e.currentTarget.style.background = "rgba(0,210,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
              >
                {item.name}
              </button>
            ))}

            {/* Divider */}
            <div className="h-[1px] mx-2 my-3" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.08), transparent)" }} />

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { setMobileOpen(false); navigate(LandingRouters.USER_REGISTER); }}
                className="flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 active:scale-95"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  background: "linear-gradient(135deg, #06b6d4, #2563eb)",
                  color: "#fff",
                }}
              >
                Sign Up
              </button>
              <button
                onClick={() => { setMobileOpen(false); navigate(LandingRouters.USER_LOGIN); }}
                className="flex-1 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 active:scale-95"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  background: "transparent",
                  color: "transparent",
                  border: "1px solid rgba(255,215,0,0.35)",
                  backgroundImage: "linear-gradient(135deg, #FFD700, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header1;
