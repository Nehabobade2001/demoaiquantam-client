import React from "react";
import { Link } from "react-router-dom";
import { MainContent } from "../../constants/mainContent";

const Footer1 = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/user/dashboard" },
        { name: "AI Trading Bot", href: "/user/trading" },
        { name: "Staking", href: "/user/staking" },
        { name: "Investments", href: "/user/investments" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Roadmap", href: "#about" },
        { name: "FAQ", href: "#faq" },
        { name: "Contact", href: "#footer" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Disclaimer", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  const socials = [
    {
      name: "Telegram",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "Discord",
      icon: (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @keyframes ft-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ft-glow-breathe {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.55; }
        }
        @keyframes ft-dot-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }
        @keyframes ft-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ft-dash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes ft-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <footer id="footer" className="relative bg-black text-white overflow-hidden">

        {/* ═══════ BACKGROUND ═══════ */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,210,255,0.06) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 30% 30% at 20% 90%, rgba(0,210,255,0.04) 0%, transparent 55%)", animation: "ft-glow-breathe 8s ease-in-out infinite" }} />

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "linear-gradient(to top, #000 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 60%)",
        }} />

        {/* Floating dots */}
        {[
          { top: "15%", left: "8%", d: "0s", s: 3 },
          { top: "30%", right: "12%", d: "1s", s: 3 },
          { top: "60%", left: "20%", d: "2s", s: 2 },
          { top: "45%", right: "6%", d: "1.5s", s: 4 },
          { top: "80%", left: "45%", d: "2.5s", s: 2 },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            top: dot.top, left: dot.left, right: dot.right,
            width: dot.s, height: dot.s, background: "#00D2FF",
            boxShadow: `0 0 ${dot.s * 3}px rgba(0,210,255,0.4)`,
            animation: `ft-dot-pulse 4s ease-in-out infinite ${dot.d}`,
          }} />
        ))}

        {/* Curved arc */}
        <svg className="absolute top-[5%] right-[2%] w-24 h-40 pointer-events-none hidden md:block" viewBox="0 0 100 180" fill="none">
          <path d="M80 170 Q 10 120, 20 70 Q 28 25, 75 5" stroke="rgba(0,210,255,0.06)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 4" style={{ animation: "ft-dash 3s linear infinite" }} />
        </svg>


        {/* ═══════ TOP DIVIDER ═══════ */}
        <div className="relative h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.15), transparent)" }} />


        {/* ═══════ MAIN FOOTER CONTENT ═══════ */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-8">

          {/* ── Top Row: Logo + Links ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14 md:mb-16">

            {/* Logo & Description — 5 cols */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                {/* Logo with orbit */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center" style={{
                    background: "rgba(0,210,255,0.04)",
                    border: "1px solid rgba(0,210,255,0.1)",
                  }}>
                    <img src={MainContent.appLogo} alt="Logo" className="w-14 h-14 object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(0,210,255,0.3))" }} />
                  </div>
                  <div className="absolute inset-[-6px] rounded-xl pointer-events-none" style={{ border: "1px dashed rgba(0,210,255,0.06)", animation: "ft-orbit 20s linear infinite" }}>
                    <span className="absolute -top-[2px] left-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 4px rgba(0,210,255,0.5)" }} />
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 800, fontSize: "1.1rem" }}>
                    <span style={{
                      background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      animation: "ft-shimmer 4s linear infinite",
                      filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
                    }}>AIQuantum</span>
                    <span className="text-white"> Crypto</span>
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 4px #00D2FF" }} />
                    <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Trading Active</span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: "#ffffff" }}>
                The world's first 100% decentralized AI-powered investment platform. Smart trading, blockchain trust, and consistent returns — all automated.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="group w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: "rgba(0,210,255,0.03)",
                      border: "1px solid rgba(0,210,255,0.06)",
                      color: "rgba(0,210,255,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,210,255,0.3)";
                      e.currentTarget.style.background = "rgba(0,210,255,0.08)";
                      e.currentTarget.style.color = "#00D2FF";
                      e.currentTarget.style.boxShadow = "0 0 16px rgba(0,210,255,0.1)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,210,255,0.06)";
                      e.currentTarget.style.background = "rgba(0,210,255,0.03)";
                      e.currentTarget.style.color = "rgba(0,210,255,0.4)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns — 7 cols */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {footerLinks.map((group, i) => (
                <div key={i}>
                  <h4 className="text-xs tracking-[0.2em] uppercase font-bold mb-4" style={{ fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "ft-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>
                    {group.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {group.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          to={link.href}
                          className="text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group"
                          style={{ color: "#ffffff" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#06b6d4"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                        >
                          <span className="w-0 group-hover:w-2 h-[1px] transition-all duration-300" style={{ background: "#00D2FF" }} />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── Network Info Strip ── */}
          <div className="rounded-xl p-4 sm:p-5 mb-10" style={{
            background: "rgba(0,210,255,0.02)",
            border: "1px solid rgba(0,210,255,0.05)",
            backdropFilter: "blur(12px)",
          }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.1)" }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#00D2FF" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold text-white">Block chain</span>
                  <span className="block text-[10px]" style={{ color: "#ffffff" }}>Built on MATIC for speed & security</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                {[
                  { label: "Block Time", val: "2s" },
                  { label: "Gas Fee", val: "<$0.01" },
                  { label: "TPS", val: "7,000+" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,210,255,0.03)", border: "1px solid rgba(0,210,255,0.04)" }}>
                    <span className="text-[10px] tracking-wider uppercase" style={{ color: "#ffffff", fontWeight: 600 }}>{item.label}</span>
                    <span className="text-xs font-bold" style={{ fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="relative">
            <div className="h-[1px] mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.08), transparent)" }} />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs" style={{ color: "#ffffff" }}>
                &copy; {currentYear} AIQuantum Crypto. All rights reserved.
              </p>

              <div className="flex items-center gap-4">
                {["Terms", "Privacy", "Disclaimer"].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-xs transition-colors duration-200"
                    style={{ color: "#ffffff" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#06b6d4"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer1;
