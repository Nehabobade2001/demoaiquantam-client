import { useState, useEffect, useRef } from "react";

const AboutSafealtCoin = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [badgesVisible, setBadgesVisible] = useState(false);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const roadmapRef = useRef(null);
  const cardsRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    const observers = [];

    const createObs = (setter, threshold = 0.2) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setter(true); obs.disconnect(); }
        },
        { threshold }
      );
      return obs;
    };

    const pairs = [
      [titleRef, setTitleVisible, 0.3],
      [contentRef, setContentVisible, 0.15],
      [roadmapRef, setRoadmapVisible, 0.15],
      [cardsRef, setCardsVisible, 0.1],
      [badgesRef, setBadgesVisible, 0.1],
    ];

    pairs.forEach(([ref, setter, threshold]) => {
      const obs = createObs(setter, threshold);
      if (ref.current) obs.observe(ref.current);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const badges = [
    {
      label: "Block chain",
      color: "#8b5cf6",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#8b5cf6" strokeWidth="1.3" fill="rgba(139,92,246,0.15)"/>
          <polygon points="12,6 17,9 17,15 12,18 7,15 7,9" stroke="#8b5cf6" strokeWidth="0.7" opacity="0.5" fill="none"/>
        </svg>
      ),
    },
    {
      label: "AI Powered",
      color: "#00D2FF",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="8" stroke="#00D2FF" strokeWidth="1.2"/>
          <circle cx="12" cy="12" r="4" fill="rgba(0,210,255,0.2)"/>
          <circle cx="12" cy="12" r="2" fill="#00D2FF" opacity="0.8">
            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      ),
    },
    {
      label: "DAO Governance",
      color: "#22d3ee",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="8" stroke="#22d3ee" strokeWidth="1.2"/>
          <path d="M8 12l3 3 5-5" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: "DeFi Protocol",
      color: "#f59e0b",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#f59e0b" strokeWidth="1.2"/>
          <line x1="8" y1="18" x2="8" y2="11" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="18" x2="12" y2="7" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="18" x2="16" y2="9" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @keyframes abt-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes abt-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes abt-float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes abt-progress-fill {
          from { width: 0; }
          to { width: var(--w); }
        }
        @keyframes abt-pulse-completed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,210,255,0.3), inset 0 0 8px rgba(0,210,255,0.05); }
          50% { box-shadow: 0 0 0 6px rgba(0,210,255,0.06), inset 0 0 12px rgba(0,210,255,0.08); }
        }
        @keyframes abt-pulse-inprogress {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,210,255,0.5); }
          50% { box-shadow: 0 0 0 10px rgba(0,210,255,0.0); }
        }
        @keyframes abt-dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes abt-glow-breathe {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes abt-robot-glow {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(0,210,255,0.2)) drop-shadow(0 0 60px rgba(0,210,255,0.1)); }
          50% { filter: drop-shadow(0 0 45px rgba(0,210,255,0.35)) drop-shadow(0 0 90px rgba(0,210,255,0.15)); }
        }
        @keyframes abt-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes abt-badge-glow {
          0%, 100% { box-shadow: 0 0 15px var(--glow-color); }
          50% { box-shadow: 0 0 25px var(--glow-color), 0 0 40px var(--glow-color); }
        }
      `}</style>

      <section id="about" className="relative bg-black text-white overflow-hidden" style={{ paddingTop: "clamp(2rem,2vw,3rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>

        {/* ═══════ CIRCUIT BOARD BACKGROUND ═══════ */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "url(/Abg2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.20,
        }} />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)" }} />

        {/* Green glow spots */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 45% 40% at 50% 30%, rgba(0,210,255,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 30% 30% at 80% 70%, rgba(0,210,255,0.04) 0%, transparent 60%)", animation: "abt-glow-breathe 8s ease-in-out infinite" }} />

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-[1px] pointer-events-none z-[1]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.15), transparent)", animation: "abt-scan 6s linear infinite" }} />


        {/* ═══════════ CONTENT ═══════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">

          {/* ── SECTION HEADER ── */}
          <div ref={titleRef} className="text-center mb-16 md:mb-24" style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}>
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-8" style={{
              background: "linear-gradient(rgba(0,210,255,0.04), rgba(0,210,255,0.04)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.2), rgba(6,182,212,0.2)) border-box",
              border: "1px solid transparent",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 10px #00D2FF, 0 0 20px rgba(0,210,255,0.3)" }} />
              <span style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, color: "rgba(0,210,255,0.7)", fontFamily: "'Orbitron', monospace" }}>About Us</span>
            </div>

            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
              <span style={{ color: "#ffffff" }}>About </span>
              <span style={{
background: "linear-gradient(135deg, #0891b2, #06b6d4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",                backgroundSize: "200% auto",
                 backgroundClip: "text",
                animation: "abt-shimmer 4s linear infinite",
                filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
              }}>AIQuantum Crypto</span>
            </h2>

            <div className="w-24 h-[2px] mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, #c0c0c0, #00D2FF, #c0c0c0, transparent)", boxShadow: "0 0 12px rgba(0,210,255,0.25)" }} />

            <p className="max-w-3xl mx-auto leading-[1.9]" style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(1rem, 2vw, 1.2rem)", letterSpacing: "0.01em" }}>
              A next-generation decentralized ecosystem that merges artificial intelligence with the power of blockchain technology — creating a new model of financial intelligence.
            </p>
          </div>


          {/* ── MAIN TWO-COL: Left Content + Right Robot ── */}
          <div ref={contentRef} className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start mb-20 md:mb-28" style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(50px)",
            transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
          }}>

            {/* ══ LEFT (3/5): Intelligence Card ══ */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden" style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}>
                <div className="absolute top-0 left-[5%] right-[5%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.3), rgba(255,255,255,0.1), rgba(0,210,255,0.3), transparent)" }} />

                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-7 mb-8">
                    <div className="shrink-0 hidden sm:block" style={{ animation: "abt-float 6s ease-in-out infinite" }}>
                      <img src="/robo.png" alt="Robot" className="w-32 md:w-40 object-contain" style={{ animation: "abt-robot-glow 4s ease-in-out infinite" }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 800, marginBottom: 16 }}>
                        <span style={{ color: "#ffffff" }}>Intelligence </span>
                        <span style={{
                          background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundSize: "200% auto",
                          animation: "abt-shimmer 4s linear infinite",
                          filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
                        }}>Redefined</span>
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", lineHeight: 1.95, marginBottom: 16 }}>
                        Built on the <span style={{ color: "#ffffff", fontWeight: 700 }}>foundation of transparency
and automation.</span>, Aiquantum crypto is an innovative AI-powered trading and
built on the  Focused on USDT-based investments, it
offers daily Trading Sharing Profit and multiple income
opportunities for users. With advanced AI trading technology
and AI Trading Bot, Aiquantum crypto ensures sustainable
wealth creation and long-term financial growth
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", lineHeight: 1.95 }}>
                        At <span style={{
                          background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundSize: "200% auto",
                          animation: "abt-shimmer 4s linear infinite",
                          filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
                        }}>AIQuantum Crypto</span>, intelligence isn't just artificial — it's decentralized, adaptive, and designed for your growth.
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-full mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), rgba(0,210,255,0.1), rgba(255,255,255,0.08), transparent)" }} />

                  {/* 3 Feature mini cards */}
                  <div className="grid grid-cols-3 gap-5">
                    {[
                      {
                        label: "Fast", desc: "2s block time",
                        icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#00D2FF" opacity="0.85"/></svg>
                      },
                      {
                        label: "Secure", desc: "Audited contracts",
                        icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="#c0c0c0" strokeWidth="1.5"/><path d="M8 11V7a4 4 0 018 0v4" stroke="#c0c0c0" strokeWidth="1.5" fill="none"/><circle cx="12" cy="16" r="1.8" fill="#00D2FF" opacity="0.7"/></svg>
                      },
                      {
                        label: "Global", desc: "150+ countries",
                        icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"><circle cx="12" cy="12" r="9" stroke="#c0c0c0" strokeWidth="1.1"/><ellipse cx="12" cy="12" rx="5" ry="9" stroke="#c0c0c0" strokeWidth="0.7"/><line x1="3" y1="12" x2="21" y2="12" stroke="#c0c0c0" strokeWidth="0.7"/></svg>
                      },
                    ].map((item, i) => (
                      <div key={i} className="group text-center py-6 px-4 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid transparent"; e.currentTarget.style.background = "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.25), rgba(6,182,212,0.25)) border-box"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(0,210,255,0.05)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div className="flex justify-center mb-3">{item.icon}</div>
                        <div className="font-bold mb-1" style={{ color: "#ffffff", fontSize: "0.85rem" }}>{item.label}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ══ RIGHT (2/5): Floating Robot Head ══ */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="relative" style={{ width: "clamp(240px, 30vw, 360px)" }}>
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,210,255,0.1) 0%, rgba(0,210,255,0.03) 40%, transparent 70%)", filter: "blur(40px)" }} />

                {/* Pulse rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] rounded-full pointer-events-none" style={{ background: "linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, rgba(8,145,178,0.08), rgba(6,182,212,0.08)) border-box", border: "1px solid transparent", animation: "abt-pulse-completed 4s ease-in-out infinite" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] rounded-full pointer-events-none" style={{ background: "linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, rgba(8,145,178,0.05), rgba(6,182,212,0.05)) border-box", border: "1px solid transparent", animation: "abt-pulse-completed 4s ease-in-out infinite 1.5s" }} />

                {/* Robot */}
                <img
                  src="/robo.png"
                  alt="AIQuantum Crypto"
                  className="relative z-10 w-full object-contain"
                  style={{ animation: "abt-float 5s ease-in-out infinite, abt-robot-glow 4s ease-in-out infinite" }}
                />

                {/* Floating tag — top right */}
                <div className="absolute -top-2 -right-4 z-20 hidden sm:block" style={{ animation: "abt-float-slow 5s ease-in-out infinite" }}>
                  <div className="px-3 py-1.5 rounded-lg" style={{
                    background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.25), rgba(6,182,212,0.25)) border-box",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid transparent",
                  }}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 6px #00D2FF", animation: "abt-dot-blink 1.5s ease-in-out infinite" }} />
                      <span style={{ fontSize: 10, fontFamily: "'Orbitron', monospace", fontWeight: 700, color: "#00D2FF", letterSpacing: "0.12em", textTransform: "uppercase" }}>AI Active</span>
                    </div>
                  </div>
                </div>

                {/* Floating tag — bottom left */}
                <div className="absolute -bottom-2 -left-4 z-20 hidden sm:block" style={{ animation: "abt-float-slow 6s ease-in-out infinite 1s" }}>
                  <div className="px-3 py-1.5 rounded-lg" style={{
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    <span style={{ fontSize: 10, fontFamily: "'Orbitron', monospace", fontWeight: 700, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase" }}>99.8% Uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ══════════ UNIQUE IN MARKET ══════════ */}
          <div ref={roadmapRef} className="mb-20 md:mb-28" style={{
            opacity: roadmapVisible ? 1 : 0,
            transform: roadmapVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}>
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-7" style={{
                background: "linear-gradient(rgba(0,210,255,0.04), rgba(0,210,255,0.04)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.2), rgba(6,182,212,0.2)) border-box",
                border: "1px solid transparent",
                backdropFilter: "blur(16px)",
              }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#FFD700", boxShadow: "0 0 8px #FFD700, 0 0 16px rgba(255,215,0,0.3)" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,215,0,0.7)", fontFamily: "'Orbitron', monospace" }}>
                  What Sets Us Apart
                </span>
              </div>

              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
                <span style={{ color: "#ffffff" }}>UNIQUE </span>
                <span style={{
                  background: "linear-gradient(135deg, #00D2FF, #06b6d4)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  animation: "abt-shimmer 4s linear infinite",
                  filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
                }}>IN MARKET</span>
              </h3>
              <div className="w-20 h-[2px] mx-auto" style={{ background: "linear-gradient(90deg, transparent, #FFD700, #00D2FF, #FFD700, transparent)", boxShadow: "0 0 10px rgba(255,215,0,0.2)" }} />
            </div>

            {/* Two-Column Layout: Features Left + Graphic Right */}
            <div ref={cardsRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center" style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}>

              {/* ── LEFT: Feature Bars ── */}
              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Combination of AI + DeFi Trading",
                    desc: "Leveraging cutting-edge artificial intelligence with decentralized finance protocols for maximum trading efficiency.",
                    icon: (
                      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                        <circle cx="14" cy="14" r="11" stroke="#00D2FF" strokeWidth="1.2" strokeDasharray="4 2">
                          <animateTransform attributeName="transform" type="rotate" values="0 14 14;360 14 14" dur="20s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="14" cy="14" r="5" fill="rgba(0,210,255,0.15)"/>
                        <circle cx="14" cy="14" r="2.5" fill="#00D2FF" opacity="0.8">
                          <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                    ),
                  },
                  {
                    num: "02",
                    title: "Daily Trading Profit with 2X",
                    desc: "Our AI algorithms deliver consistent daily returns with advanced risk management and 2X profit optimization.",
                    icon: (
                      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                        <polyline points="4,22 10,14 16,18 24,6" stroke="#00D2FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="24" cy="6" r="2.5" fill="#FFD700" opacity="0.9">
                          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                    ),
                  },
                  {
                    num: "03",
                    title: "Rank & Reward Structure for Long-Term Motivation",
                    desc: "Multi-tier ranking system with escalating rewards, bonuses, and exclusive benefits for sustained engagement.",
                    icon: (
                      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                        <path d="M14 3l3 6h7l-5.5 4.5 2 7L14 17l-6.5 3.5 2-7L4 9h7z" stroke="#FFD700" strokeWidth="1.2" fill="rgba(255,215,0,0.1)"/>
                        <circle cx="14" cy="12" r="3" fill="#00D2FF" opacity="0.5">
                          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                    ),
                  },
                  {
                    num: "04",
                    title: "Contract-Based Deposits & Withdrawals Ensure Transparency",
                    desc: "All transactions are secured through verified smart contracts, ensuring full transparency and trust.",
                    icon: (
                      <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                        <rect x="5" y="4" width="18" height="20" rx="3" stroke="#00D2FF" strokeWidth="1.2"/>
                        <path d="M10 12l3 3 5-5" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="9" y1="20" x2="19" y2="20" stroke="rgba(0,210,255,0.3)" strokeWidth="0.8"/>
                        <line x1="9" y1="8" x2="15" y2="8" stroke="rgba(0,210,255,0.3)" strokeWidth="0.8"/>
                      </svg>
                    ),
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl overflow-hidden cursor-default transition-all duration-400 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, rgba(10,25,60,0.85) 0%, rgba(15,35,80,0.75) 50%, rgba(10,25,60,0.85) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,210,255,0.08)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,210,255,0.25)";
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3), 0 0 25px rgba(0,210,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,210,255,0.08)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
                    }}
                  >
                    {/* Top edge glow on hover */}
                    <div className="absolute top-0 left-[5%] right-[5%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.4), transparent)" }}
                    />

                    <div className="flex items-center gap-5 p-5 md:p-6">
                      {/* Number badge */}
                      <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{
                        background: "linear-gradient(135deg, rgba(0,210,255,0.08), rgba(0,210,255,0.03))",
                        border: "1px solid rgba(255,215,0,0.15)",
                      }}>
                        {feature.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, fontWeight: 700, color: "rgba(255,215,0,0.5)", letterSpacing: "0.15em" }}>{feature.num}</span>
                          <div className="h-[1px] flex-1" style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.2), transparent)" }} />
                        </div>
                        <h4 className="text-sm md:text-[15px] font-bold text-white mb-1.5" style={{ fontFamily: "'Orbitron', monospace", lineHeight: 1.4 }}>
                          {feature.title}
                        </h4>
                        <p className="text-xs md:text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {feature.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(to top, rgba(0,210,255,0.03), transparent)" }}
                    />
                  </div>
                ))}
              </div>

              {/* ── RIGHT: AI Network Graphic ── */}
              <div className="flex items-center justify-center">
                <div className="relative" style={{ width: "clamp(280px, 35vw, 420px)", height: "clamp(280px, 35vw, 420px)" }}>

                  {/* Hexagonal background pattern */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" fill="none">
                    {/* Hexagon grid — gold outline */}
                    {[
                      { cx: 200, cy: 200, r: 80 },
                      { cx: 200, cy: 200, r: 130 },
                      { cx: 200, cy: 200, r: 180 },
                    ].map((hex, i) => {
                      const pts = Array.from({ length: 6 }, (_, j) => {
                        const angle = (Math.PI / 3) * j - Math.PI / 6;
                        return `${hex.cx + hex.r * Math.cos(angle)},${hex.cy + hex.r * Math.sin(angle)}`;
                      }).join(" ");
                      return (
                        <polygon
                          key={i}
                          points={pts}
                          stroke="rgba(255,215,0,0.12)"
                          strokeWidth="1"
                          fill="none"
                          opacity={0.8 - i * 0.2}
                        >
                          <animateTransform attributeName="transform" type="rotate" values={`0 200 200;${i % 2 === 0 ? 360 : -360} 200 200`} dur={`${40 + i * 10}s`} repeatCount="indefinite"/>
                        </polygon>
                      );
                    })}

                    {/* Connection lines */}
                    {[
                      [200, 70, 200, 130],
                      [200, 270, 200, 330],
                      [85, 135, 135, 155],
                      [315, 135, 265, 155],
                      [85, 265, 135, 245],
                      [315, 265, 265, 245],
                    ].map(([x1, y1, x2, y2], i) => (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,210,255,0.12)" strokeWidth="0.8" strokeDasharray="4 3">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
                      </line>
                    ))}

                    {/* Outer nodes */}
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                      const rad = (deg * Math.PI) / 180 - Math.PI / 6;
                      const r = 165;
                      const x = 200 + r * Math.cos(rad);
                      const y = 200 + r * Math.sin(rad);
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="5" fill="rgba(0,210,255,0.3)" stroke="rgba(0,210,255,0.5)" strokeWidth="0.8">
                            <animate attributeName="r" values="4;6;4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite"/>
                          </circle>
                          <line x1={x} y1={y} x2="200" y2="200" stroke="rgba(0,210,255,0.06)" strokeWidth="0.5"/>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Center glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,210,255,0.12) 0%, rgba(0,210,255,0.03) 40%, transparent 70%)", filter: "blur(30px)" }} />

                  {/* Center AI brain icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center" style={{
                    background: "linear-gradient(135deg, rgba(10,25,60,0.9), rgba(15,35,80,0.8))",
                    border: "1px solid rgba(255,215,0,0.2)",
                    boxShadow: "0 0 40px rgba(0,210,255,0.1), 0 0 80px rgba(0,210,255,0.05)",
                    animation: "abt-float-slow 5s ease-in-out infinite",
                  }}>
                    <svg viewBox="0 0 64 64" className="w-16 h-16 md:w-20 md:h-20" fill="none">
                      {/* Brain/AI circuit icon */}
                      <circle cx="32" cy="32" r="22" stroke="rgba(0,210,255,0.4)" strokeWidth="1.5"/>
                      <circle cx="32" cy="32" r="14" stroke="rgba(255,215,0,0.25)" strokeWidth="1" strokeDasharray="3 2">
                        <animateTransform attributeName="transform" type="rotate" values="0 32 32;-360 32 32" dur="25s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="32" cy="32" r="6" fill="rgba(0,210,255,0.2)"/>
                      <circle cx="32" cy="32" r="3" fill="#00D2FF" opacity="0.9">
                        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      {/* Circuit paths */}
                      <line x1="32" y1="10" x2="32" y2="18" stroke="#00D2FF" strokeWidth="1" opacity="0.5"/>
                      <line x1="32" y1="46" x2="32" y2="54" stroke="#00D2FF" strokeWidth="1" opacity="0.5"/>
                      <line x1="10" y1="32" x2="18" y2="32" stroke="#00D2FF" strokeWidth="1" opacity="0.5"/>
                      <line x1="46" y1="32" x2="54" y2="32" stroke="#00D2FF" strokeWidth="1" opacity="0.5"/>
                      {/* Diagonal circuits */}
                      <line x1="17" y1="17" x2="22" y2="22" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
                      <line x1="47" y1="17" x2="42" y2="22" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
                      <line x1="17" y1="47" x2="22" y2="42" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
                      <line x1="47" y1="47" x2="42" y2="42" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
                      {/* Corner nodes */}
                      <circle cx="32" cy="10" r="2" fill="#FFD700" opacity="0.6"/>
                      <circle cx="32" cy="54" r="2" fill="#FFD700" opacity="0.6"/>
                      <circle cx="10" cy="32" r="2" fill="#FFD700" opacity="0.6"/>
                      <circle cx="54" cy="32" r="2" fill="#FFD700" opacity="0.6"/>
                    </svg>
                  </div>

                  {/* Floating labels around the graphic */}
                  <div className="absolute top-[8%] left-1/2 -translate-x-1/2 hidden sm:block" style={{ animation: "abt-float-slow 5s ease-in-out infinite" }}>
                    <div className="px-3 py-1.5 rounded-lg" style={{
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,215,0,0.15)",
                    }}>
                      <span style={{ fontSize: 9, fontFamily: "'Orbitron', monospace", fontWeight: 700, color: "#FFD700", letterSpacing: "0.12em", textTransform: "uppercase" }}>AI Engine</span>
                    </div>
                  </div>

                  <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 hidden sm:block" style={{ animation: "abt-float-slow 6s ease-in-out infinite 1.5s" }}>
                    <div className="px-3 py-1.5 rounded-lg" style={{
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(0,210,255,0.15)",
                    }}>
                      <span style={{ fontSize: 9, fontFamily: "'Orbitron', monospace", fontWeight: 700, color: "#00D2FF", letterSpacing: "0.12em", textTransform: "uppercase" }}>DeFi Protocol</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ══════════ BOTTOM BADGES — GLASS ROW ══════════ */}
          <div ref={badgesRef} className="flex justify-center" style={{
            opacity: badgesVisible ? 1 : 0,
            transform: badgesVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}>
            <div className="relative inline-flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-10 px-8 sm:px-12 md:px-16 py-6 sm:py-7 rounded-2xl overflow-hidden" style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}>
              {/* Top edge highlight */}
              <div className="absolute top-0 left-[5%] right-[5%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(192,192,192,0.12), rgba(0,210,255,0.15), rgba(192,192,192,0.12), transparent)" }} />

              {badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-default">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{
                      background: `rgba(${badge.color === "#8b5cf6" ? "139,92,246" : badge.color === "#00D2FF" ? "0,210,255" : badge.color === "#22d3ee" ? "34,211,238" : "245,158,11"},0.08)`,
                      border: `1px solid ${badge.color}30`,
                      boxShadow: `0 0 12px ${badge.color}10`,
                      "--glow-color": `${badge.color}15`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${badge.color}25, 0 0 45px ${badge.color}10`;
                      e.currentTarget.style.borderColor = `${badge.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 12px ${badge.color}10`;
                      e.currentTarget.style.borderColor = `${badge.color}30`;
                    }}
                  >
                    {badge.icon}
                  </div>
                  <span className="text-xs sm:text-[13px] tracking-wide font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default AboutSafealtCoin;
