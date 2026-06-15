import { useState, useEffect, useRef } from "react";

const VisionEcosystem = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  const titleRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const createObs = (setter, threshold = 0.2) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            obs.disconnect();
          }
        },
        { threshold }
      );
      return obs;
    };

    const observers = [];

    const obs1 = createObs(setTitleVisible, 0.3);
    if (titleRef.current) obs1.observe(titleRef.current);
    observers.push(obs1);

    const obs2 = createObs(setLeftVisible, 0.15);
    if (leftRef.current) obs2.observe(leftRef.current);
    observers.push(obs2);

    const obs3 = createObs(setRightVisible, 0.15);
    if (rightRef.current) obs3.observe(rightRef.current);
    observers.push(obs3);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const ecosystemPillars = [
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
          <circle cx="20" cy="20" r="14" stroke="rgba(0,210,255,0.3)" strokeWidth="1" strokeDasharray="3 2">
            <animateTransform attributeName="transform" type="rotate" values="0 20 20;360 20 20" dur="25s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="20" r="6" fill="rgba(0,210,255,0.15)"/>
          <circle cx="20" cy="20" r="3" fill="#00D2FF" opacity="0.8">
            <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
          </circle>
          <line x1="20" y1="6" x2="20" y2="14" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
          <line x1="20" y1="26" x2="20" y2="34" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
          <line x1="6" y1="20" x2="14" y2="20" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
          <line x1="26" y1="20" x2="34" y2="20" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
        </svg>
      ),
      title: "AI Vaults",
      tag: "Liquidity",
      desc: "Intelligent liquidity modules that auto-optimize yield strategies using real-time AI analysis.",
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
          <rect x="8" y="8" width="24" height="24" rx="6" stroke="rgba(0,210,255,0.3)" strokeWidth="1"/>
          <path d="M16 20l3 3 6-6" stroke="#00D2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
          <circle cx="20" cy="20" r="12" stroke="rgba(0,210,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2">
            <animateTransform attributeName="transform" type="rotate" values="0 20 20;-360 20 20" dur="30s" repeatCount="indefinite"/>
          </circle>
        </svg>
      ),
      title: "Governance DAO",
      tag: "Voting",
      desc: "Community-led decision making. Token holders vote on proposals, upgrades, and treasury allocation.",
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
          <path d="M10 30 L10 18 L18 18 L18 30" stroke="rgba(0,210,255,0.3)" strokeWidth="1"/>
          <path d="M16 30 L16 12 L24 12 L24 30" stroke="rgba(0,210,255,0.4)" strokeWidth="1"/>
          <path d="M22 30 L22 8 L30 8 L30 30" stroke="#00D2FF" strokeWidth="1" opacity="0.6"/>
          <line x1="8" y1="30" x2="32" y2="30" stroke="rgba(0,210,255,0.2)" strokeWidth="0.5"/>
          <circle cx="26" cy="8" r="2" fill="#00D2FF" opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      ),
      title: "Developer APIs",
      tag: "Open Tools",
      desc: "Open intelligent tools and SDKs for builders to create dApps on top of the AIQuantum Crypto ecosystem.",
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
          <polygon points="20,6 34,28 6,28" stroke="rgba(0,210,255,0.3)" strokeWidth="1" fill="none"/>
          <polygon points="20,14 28,26 12,26" stroke="rgba(0,210,255,0.15)" strokeWidth="0.8" fill="rgba(0,210,255,0.04)"/>
          <circle cx="20" cy="22" r="2.5" fill="#00D2FF" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      ),
      title: "Staking Engine",
      tag: "Rewards",
      desc: "Lock POL tokens and earn passive income through AI-optimized staking pools with dynamic APY.",
    },
  ];

  const tokenInfo = [
    { label: "Blockchain", value: "Block chain" },
    { label: "Type", value: "Utility & Governance" },
    { label: "Utility", value: "Access, Governance, Staking" },
    { label: "Goal", value: "Self-sustaining AI Economy" },
  ];

  return (
    <>
      <style>{`
        @keyframes vec-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes vec-glow-breathe {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.06); }
        }
        @keyframes vec-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes vec-float-alt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes vec-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes vec-spin-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes vec-pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.12); opacity: 0.06; }
        }
        @keyframes vec-node-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        @keyframes vec-dash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes vec-scan-v {
          0% { top: -2px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes vec-line-glow {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.18; }
        }
        @keyframes vec-tab-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="relative bg-black text-white overflow-hidden" style={{ paddingTop: "clamp(2rem,2vw,3rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>

        {/* ═══════ BACKGROUND ═══════ */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 55% at 50% 40%, rgba(0,210,255,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 35% 35% at 75% 25%, rgba(0,210,255,0.04) 0%, transparent 60%)", animation: "vec-glow-breathe 8s ease-in-out infinite" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 30% 30% at 25% 70%, rgba(0,210,255,0.03) 0%, transparent 55%)", animation: "vec-glow-breathe 10s ease-in-out infinite 3s" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, transparent 100%)",
        }} />

        {/* Floating dots */}
        {[
          { top: "8%", left: "12%", d: "0s", s: 3 },
          { top: "18%", right: "10%", d: "1s", s: 4 },
          { top: "50%", left: "5%", d: "2s", s: 3 },
          { top: "72%", right: "7%", d: "0.5s", s: 5 },
          { top: "38%", left: "8%", d: "1.5s", s: 3 },
          { top: "88%", left: "42%", d: "2.5s", s: 2 },
          { top: "28%", right: "22%", d: "3s", s: 3 },
          { top: "62%", right: "18%", d: "0.8s", s: 4 },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            top: dot.top, left: dot.left, right: dot.right,
            width: dot.s, height: dot.s, background: "#00D2FF",
            boxShadow: `0 0 ${dot.s * 3}px rgba(0,210,255,0.5)`,
            animation: `vec-node-pulse 3.5s ease-in-out infinite ${dot.d}`,
          }} />
        ))}

        {/* Curved arcs */}
        <svg className="absolute top-[6%] left-[1%] w-24 h-44 md:w-32 md:h-56 pointer-events-none" viewBox="0 0 120 220" fill="none" style={{ animation: "vec-float 12s ease-in-out infinite" }}>
          <path d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5" stroke="rgba(0,210,255,0.07)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 4" style={{ animation: "vec-dash 3s linear infinite" }} />
        </svg>
        <svg className="absolute bottom-[6%] right-[1%] w-24 h-44 md:w-32 md:h-56 pointer-events-none" viewBox="0 0 120 220" fill="none" style={{ animation: "vec-float 13s ease-in-out infinite 2s", transform: "scaleX(-1)" }}>
          <path d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5" stroke="rgba(0,210,255,0.07)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 4" style={{ animation: "vec-dash 3s linear infinite" }} />
        </svg>

        {/* Glass cubes */}
        <div className="absolute top-[10%] right-[5%] md:right-[9%] pointer-events-none hidden md:block" style={{ animation: "vec-float-alt 9s ease-in-out infinite" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, transform: "rotate(40deg)", background: "linear-gradient(rgba(0,210,255,0.025), rgba(0,210,255,0.025)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.1), rgba(6,182,212,0.1)) border-box", backdropFilter: "blur(8px)", border: "1px solid transparent" }} />
        </div>
        <div className="absolute bottom-[12%] left-[4%] md:left-[7%] pointer-events-none hidden md:block" style={{ animation: "vec-float-alt 11s ease-in-out infinite 3s" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, transform: "rotate(30deg)", background: "linear-gradient(rgba(0,210,255,0.02), rgba(0,210,255,0.02)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.08), rgba(6,182,212,0.08)) border-box", backdropFilter: "blur(6px)", border: "1px solid transparent" }} />
        </div>

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-[1px] pointer-events-none z-[1]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.08), transparent)", animation: "vec-scan-v 10s linear infinite" }} />


        {/* ═══════════════════════════════════
            CONTENT
        ═══════════════════════════════════ */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">

          {/* ── HEADER ── */}
          <div ref={titleRef} className="text-center mb-16 md:mb-20" style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-7" style={{ background: "linear-gradient(rgba(0,210,255,0.04), rgba(0,210,255,0.04)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.15), rgba(6,182,212,0.15)) border-box", border: "1px solid transparent", backdropFilter: "blur(10px)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 8px #00D2FF, 0 0 16px rgba(0,210,255,0.3)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "vec-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>
                Vision & Ecosystem
              </span>
            </div>

            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
              <span className="text-white">Our Vision for a </span>
              <br className="sm:hidden" />
              <span style={{
                background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "vec-shimmer 4s linear infinite",
                filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
              }}>
                Decentralized Future
              </span>
            </h2>

            <div className="w-16 h-[1.5px] mx-auto mb-5" style={{ background: "linear-gradient(90deg, transparent, #00D2FF, transparent)", boxShadow: "0 0 8px rgba(0,210,255,0.25)" }} />

            <p className="max-w-2xl mx-auto text-sm md:text-[15px] leading-relaxed" style={{ color: "#fff" }}>
              To build a trustless, intelligent, and community-driven economy where AI supports blockchain's core promise — fairness, transparency, and opportunity for all.
            </p>
          </div>

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-8 items-start">

            {/* LEFT COL (3/5) — Vision + Ecosystem Tabs */}
            <div ref={leftRef} className="lg:col-span-3" style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}>

              {/* Vision Statement Glass Card */}
              <div className="relative rounded-2xl overflow-hidden mb-8" style={{
                background: "linear-gradient(rgba(2,6,23,0.5), rgba(2,6,23,0.5)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.1), rgba(6,182,212,0.1)) border-box",
                backdropFilter: "blur(20px)",
                border: "1px solid transparent",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}>
                {/* Top edge glow */}
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)" }} />

                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-5">
                    {/* Large animated robot */}
                    <div className="shrink-0 hidden sm:block" style={{ animation: "vec-float 5s ease-in-out infinite" }}>
                      <img src="/robo.png" alt="Robot" className="w-28 md:w-36 object-contain" style={{ filter: "drop-shadow(0 0 20px rgba(0,210,255,0.2))" }} />
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "vec-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>
                        Intelligence Meets Trust
                      </h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: "#fff" }}>
                        AIQuantum Crypto envisions a decentralized world where financial intelligence is autonomous, accessible, and free from intermediaries.
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#fff" }}>
                        Our ecosystem merges AI-driven automation with blockchain's immutable trust — empowering users to make smarter, faster, and more secure digital decisions.
                      </p>

                      {/* Mini stat row */}
                      <div className="flex flex-wrap gap-4 mt-5">
                        {[
                          { val: "$5.2M", label: "TVL" },
                          { val: "24K+", label: "Users" },
                          { val: "99.8%", label: "Uptime" },
                        ].map((s, i) => (
                          <div key={i} className="text-center px-3">
                            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(0.9rem, 2vw, 1.15rem)", fontWeight: 800, lineHeight: 1, background: "linear-gradient(135deg, #FFD700, #f59e0b)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "vec-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(255,215,0,0.4))" }}>{s.val}</div>
                            <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontWeight: 600, marginTop: 3 }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ecosystem Tabs */}
              <div>
                {/* Tab buttons */}
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1 hide-scrollbar">
                  {ecosystemPillars.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        background: activeTab === i
                          ? "linear-gradient(rgba(0,210,255,0.1), rgba(0,210,255,0.1)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.35), rgba(6,182,212,0.35)) border-box"
                          : "linear-gradient(rgba(0,210,255,0.02), rgba(0,210,255,0.02)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.1), rgba(6,182,212,0.1)) border-box",
                        border: "1px solid transparent",
                        color: activeTab === i ? "transparent" : "rgba(255,255,255,0.3)",
                        boxShadow: activeTab === i ? "0 0 20px rgba(0,210,255,0.08)" : "none",
                      }}
                    >
                      {activeTab === i ? (
                        <span style={{ background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{item.title}</span>
                      ) : item.title}
                    </button>
                  ))}
                </div>

                {/* Active tab content */}
                <div
                  key={activeTab}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(rgba(2,6,23,0.5), rgba(2,6,23,0.5)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.1), rgba(6,182,212,0.1)) border-box",
                    backdropFilter: "blur(20px)",
                    border: "1px solid transparent",
                    animation: "vec-tab-in 0.4s ease-out",
                  }}
                >
                  <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.2), transparent)" }} />

                  <div className="p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5">
                    {/* Icon */}
                    <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center" style={{
                      background: "linear-gradient(rgba(0,210,255,0.04), rgba(0,210,255,0.04)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.15), rgba(6,182,212,0.15)) border-box",
                      border: "1px solid transparent",
                    }}>
                      <div className="w-10 h-10 md:w-12 md:h-12">
                        {ecosystemPillars[activeTab].icon}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg md:text-xl font-bold" style={{ fontFamily: "'Orbitron', monospace", color: "white" }}>
                          {ecosystemPillars[activeTab].title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase" style={{
                          background: "linear-gradient(rgba(0,210,255,0.08), rgba(0,210,255,0.08)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.2), rgba(6,182,212,0.2)) border-box",
                          border: "1px solid transparent",
                          fontFamily: "'Orbitron', monospace",
                        }}>
                          <span style={{ background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            {ecosystemPillars[activeTab].tag}
                          </span>
                        </span>
                      </div>
                      <div className="w-10 h-[1px] mb-3" style={{ background: "linear-gradient(90deg, rgba(0,210,255,0.3), transparent)" }} />
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {ecosystemPillars[activeTab].desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COL (2/5) — POL Token Card */}
            <div ref={rightRef} className="lg:col-span-2" style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.9s ease-out 0.2s, transform 0.9s ease-out 0.2s",
            }}>
              <div className="relative rounded-2xl overflow-hidden" style={{
                background: "linear-gradient(rgba(2,6,23,0.5), rgba(2,6,23,0.5)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.1), rgba(6,182,212,0.1)) border-box",
                backdropFilter: "blur(20px)",
                border: "1px solid transparent",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}>
                {/* Top glow edge */}
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)" }} />

                {/* Scan line inside card */}
                <div className="absolute left-0 right-0 h-[1px] pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.12), transparent)", animation: "vec-scan-v 5s linear infinite" }} />

                <div className="p-6 md:p-8">
                  {/* Token header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(rgba(0,210,255,0.06), rgba(0,210,255,0.06)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.18), rgba(6,182,212,0.18)) border-box", border: "1px solid transparent" }}>
                      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 900, background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>P</span>
                      {/* Orbit */}
                      <div className="absolute inset-[-8px] rounded-full pointer-events-none" style={{ border: "1px dashed rgba(0,210,255,0.1)", animation: "vec-spin 15s linear infinite" }}>
                        <span className="absolute -top-0.5 left-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 6px rgba(0,210,255,0.7)" }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "vec-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>POL Token</h3>
                      <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>
                        Native Ecosystem Token
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                    The foundation of <span className="text-white font-medium">AIQuantum Crypto</span>. POL powers every action, transaction, and decision within the ecosystem.
                  </p>

                  {/* Token info rows */}
                  <div className="space-y-3 mb-6">
                    {tokenInfo.map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg" style={{ background: "linear-gradient(rgba(0,210,255,0.02), rgba(0,210,255,0.02)) padding-box, linear-gradient(135deg, rgba(8,145,178,0.06), rgba(6,182,212,0.06)) border-box", border: "1px solid transparent" }}>
                        <span className="text-[11px] tracking-wider uppercase font-semibold" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Orbitron', monospace" }}>
                          {row.label}
                        </span>
                        <span className="text-[13px] font-medium text-white">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-full mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.1), transparent)" }} />

                  {/* Ecosystem ring visual */}
                  <div className="flex justify-center py-4">
                    <div className="relative" style={{ width: 160, height: 160 }}>
                      {/* Rings */}
                      <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, rgba(8,145,178,0.1), rgba(6,182,212,0.1)) border-box", border: "1px solid transparent", animation: "vec-pulse-ring 5s ease-in-out infinite" }} />
                      <div className="absolute rounded-full" style={{ inset: -12, background: "linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, rgba(8,145,178,0.05), rgba(6,182,212,0.05)) border-box", border: "1px solid transparent", animation: "vec-pulse-ring 5s ease-in-out infinite 1.5s" }} />

                      {/* Orbiting ring */}
                      <div className="absolute inset-0 rounded-full" style={{ border: "1px dashed rgba(0,210,255,0.08)", animation: "vec-spin 20s linear infinite" }}>
                        <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 8px rgba(0,210,255,0.6)" }} />
                      </div>
                      <div className="absolute rounded-full" style={{ inset: 20, border: "1px dashed rgba(0,210,255,0.06)", animation: "vec-spin-rev 25s linear infinite" }}>
                        <span className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,210,255,0.5)", boxShadow: "0 0 6px rgba(0,210,255,0.4)" }} />
                      </div>

                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>POL</span>
                        <span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>Ecosystem Core</span>
                      </div>

                      {/* Nodes on the circle */}
                      {[0, 72, 144, 216, 288].map((deg, i) => {
                        const rad = (deg * Math.PI) / 180;
                        const r = 65;
                        const x = 80 + r * Math.cos(rad - Math.PI / 2);
                        const y = 80 + r * Math.sin(rad - Math.PI / 2);
                        return (
                          <div key={i} className="absolute w-2 h-2 rounded-full" style={{
                            left: x - 4, top: y - 4,
                            background: "rgba(0,210,255,0.5)",
                            boxShadow: "0 0 8px rgba(0,210,255,0.4)",
                            animation: `vec-node-pulse 3s ease-in-out infinite ${i * 0.4}s`,
                          }} />
                        );
                      })}

                      {/* Connection lines to center */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 160">
                        {[0, 72, 144, 216, 288].map((deg, i) => {
                          const rad = (deg * Math.PI) / 180;
                          const r = 65;
                          const x = 80 + r * Math.cos(rad - Math.PI / 2);
                          const y = 80 + r * Math.sin(rad - Math.PI / 2);
                          return <line key={i} x1="80" y1="80" x2={x} y2={y} stroke="rgba(0,210,255,0.08)" strokeWidth="0.5" style={{ animation: `vec-line-glow 3s ease-in-out infinite ${i * 0.3}s` }} />;
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionEcosystem;
