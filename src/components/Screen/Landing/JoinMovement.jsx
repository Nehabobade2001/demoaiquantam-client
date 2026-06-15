import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const JoinMovement = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
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
          if (entry.isIntersecting) { setter(true); obs.disconnect(); }
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

  const faqs = [
    {
      q: "What is AIQuantum Crypto?",
      a: "AIQuantum Crypto is a decentralized ecosystem that combines Artificial Intelligence with blockchain automation to create an intelligent financial infrastructure — enabling autonomous trading 24/7.",
    },
    {
      q: "What is the POL token?",
      a: "POL is the native utility token of AIQuantum Crypto, enabling governance, ecosystem transactions, staking rewards, and community participation across the platform.",
    },
    {
      q: "Why is AI integration important?",
      a: "AI enhances blockchain by automating logic, predicting market behavior, and optimizing trading processes — making decentralized systems more efficient, adaptive, and profitable.",
    },
    {
      q: "Which blockchain does AIQuantum Crypto run on?",
      a: "AIQuantum Crypto is built on the Block chain, ensuring fast transactions, low gas fees, high scalability, and enterprise-grade security.",
    },
    {
      q: "How do I start trading?",
      a: "Simply connect your wallet, deposit funds, and activate the AI trading bot. It starts executing trades automatically based on real-time market analysis.",
    },
  ];

  const communityLinks = [
    {
      name: "Telegram",
      desc: "Join 12K+ members",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#00D2FF">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      ),
    },
    {
      name: "Twitter / X",
      desc: "Follow for updates",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#00D2FF">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "Discord",
      desc: "Developer community",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#00D2FF">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @keyframes jm-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes jm-glow-breathe {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.06); }
        }
        @keyframes jm-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes jm-float-alt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes jm-dot-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        @keyframes jm-dash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes jm-scan {
          0% { left: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes jm-btn-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,210,255,0.25), 0 0 40px rgba(0,210,255,0.08); }
          50% { box-shadow: 0 0 30px rgba(0,210,255,0.45), 0 0 60px rgba(0,210,255,0.15), 0 0 100px rgba(0,210,255,0.05); }
        }
        @keyframes jm-faq-open {
          from { opacity: 0; max-height: 0; padding-top: 0; }
          to { opacity: 1; max-height: 200px; padding-top: 12px; }
        }
        @keyframes jm-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes jm-count-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="relative bg-black text-white overflow-hidden" style={{ paddingTop: "clamp(2rem,2vw,3rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>

        {/* ═══════ BACKGROUND ═══════ */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 50% at 50% 40%, rgba(0,210,255,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 35% 35% at 25% 70%, rgba(0,210,255,0.04) 0%, transparent 60%)", animation: "jm-glow-breathe 8s ease-in-out infinite" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 30% 30% at 80% 25%, rgba(0,210,255,0.03) 0%, transparent 55%)", animation: "jm-glow-breathe 10s ease-in-out infinite 3s" }} />

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, transparent 100%)",
        }} />

        {/* Horizontal scan */}
        <div className="absolute top-0 bottom-0 w-[200px] pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.03), transparent)", animation: "jm-scan 14s linear infinite" }} />

        {/* Floating dots */}
        {[
          { top: "8%", left: "10%", d: "0s", s: 3 },
          { top: "20%", right: "12%", d: "1s", s: 4 },
          { top: "55%", left: "6%", d: "2s", s: 3 },
          { top: "75%", right: "8%", d: "0.5s", s: 5 },
          { top: "40%", right: "5%", d: "1.5s", s: 3 },
          { top: "90%", left: "40%", d: "2.5s", s: 2 },
          { top: "30%", left: "18%", d: "3s", s: 3 },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            top: dot.top, left: dot.left, right: dot.right,
            width: dot.s, height: dot.s, background: "#00D2FF",
            boxShadow: `0 0 ${dot.s * 3}px rgba(0,210,255,0.5)`,
            animation: `jm-dot-pulse 3.5s ease-in-out infinite ${dot.d}`,
          }} />
        ))}

        {/* Curved arcs */}
        <svg className="absolute top-[5%] left-[1%] w-24 h-44 md:w-32 md:h-56 pointer-events-none" viewBox="0 0 120 220" fill="none" style={{ animation: "jm-float 12s ease-in-out infinite" }}>
          <path d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5" stroke="rgba(0,210,255,0.07)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 4" style={{ animation: "jm-dash 3s linear infinite" }} />
        </svg>
        <svg className="absolute bottom-[5%] right-[1%] w-24 h-44 md:w-32 md:h-56 pointer-events-none" viewBox="0 0 120 220" fill="none" style={{ animation: "jm-float 13s ease-in-out infinite 2s", transform: "scaleX(-1)" }}>
          <path d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5" stroke="rgba(0,210,255,0.07)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 4" style={{ animation: "jm-dash 3s linear infinite" }} />
        </svg>

        {/* Glass cubes */}
        <div className="absolute top-[10%] right-[6%] pointer-events-none hidden md:block" style={{ animation: "jm-float-alt 9s ease-in-out infinite" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, transform: "rotate(45deg)", background: "rgba(0,210,255,0.025)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,210,255,0.06)" }} />
        </div>
        <div className="absolute bottom-[15%] left-[5%] pointer-events-none hidden md:block" style={{ animation: "jm-float-alt 11s ease-in-out infinite 3s" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, transform: "rotate(30deg)", background: "rgba(0,210,255,0.02)", backdropFilter: "blur(6px)", border: "1px solid rgba(0,210,255,0.05)" }} />
        </div>


        {/* ═══════════ CONTENT ═══════════ */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">

          {/* ── HEADER ── */}
          <div ref={titleRef} className="text-center mb-16 md:mb-20" style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-7" style={{ background: "rgba(0,210,255,0.04)", border: "1px solid rgba(0,210,255,0.1)", backdropFilter: "blur(10px)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 8px #00D2FF, 0 0 16px rgba(0,210,255,0.3)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "jm-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>
                Community & FAQ
              </span>
            </div>

            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
              <span className="text-white">Join the </span>
              <span style={{
                background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "jm-shimmer 4s linear infinite",
                filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
              }}>
                Movement
              </span>
            </h2>

            <div className="w-16 h-[1.5px] mx-auto mb-5" style={{ background: "linear-gradient(90deg, transparent, #00D2FF, transparent)", boxShadow: "0 0 8px rgba(0,210,255,0.25)" }} />

            <p className="max-w-lg mx-auto text-sm md:text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Whether you're a visionary, developer, or believer in intelligent decentralization — AIQuantum Crypto gives you the power to shape the future.
            </p>
          </div>

          {/* ── TWO COLUMN LAYOUT ── */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* ══ LEFT: Community Hub ══ */}
            <div ref={leftRef} style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}>
              {/* CTA Glass Card */}
              <div className="relative rounded-2xl overflow-hidden mb-6" style={{
                background: "rgba(2,6,23,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,210,255,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}>
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)" }} />

                <div className="p-6 md:p-8">
                  {/* Robot + heading */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative shrink-0" style={{ animation: "jm-float 4s ease-in-out infinite" }}>
                      <img src="/robo.png" alt="Robot" className="w-20 md:w-24 object-contain" style={{ filter: "drop-shadow(0 0 16px rgba(0,210,255,0.2))" }} />
                      {/* Orbit ring */}
                      <div className="absolute top-1/2 left-1/2 w-[130%] h-[130%] rounded-full pointer-events-none" style={{ border: "1px dashed rgba(0,210,255,0.08)", animation: "jm-orbit 16s linear infinite" }}>
                        <span className="absolute -top-0.5 left-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 6px rgba(0,210,255,0.6)" }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1" style={{ fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "jm-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>
                        Be Part of It
                      </h3>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Join thousands of traders building the future of decentralized AI finance.
                      </p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { val: "24K+", label: "Members" },
                      { val: "150+", label: "Countries" },
                      { val: "$5.2M", label: "Volume" },
                    ].map((s, i) => (
                      <div key={i} className="text-center py-3 rounded-xl" style={{
                        background: "rgba(0,210,255,0.03)",
                        border: "1px solid rgba(0,210,255,0.06)",
                      }}>
                        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 800, lineHeight: 1, background: "linear-gradient(135deg, #FFD700, #f59e0b)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: `jm-shimmer 4s linear infinite, jm-count-up 0.6s ease-out ${i * 0.15}s both`, filter: "drop-shadow(0 0 30px rgba(255,215,0,0.4))" }}>{s.val}</div>
                        <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate("/register")}
                      className="flex-1 cursor-pointer py-3 rounded-lg font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] active:scale-95"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        background: "linear-gradient(135deg, #0284c7, #00D2FF, #00B4D8)",
                        color: "#000",
                        animation: "jm-btn-glow 3s ease-in-out infinite",
                      }}
                    >
                      Start Trading Now
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="flex-1 cursor-pointer py-3 rounded-lg font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] active:scale-95"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        background: "transparent",
                        color: "transparent",
                        border: "1px solid rgba(0,210,255,0.25)",
                        backgroundImage: "linear-gradient(135deg, #FFD700, #f59e0b)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,210,255,0.6)"; e.currentTarget.style.background = "rgba(0,210,255,0.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,210,255,0.25)"; e.currentTarget.style.background = "transparent"; }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>

              {/* Community Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {communityLinks.map((link, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "rgba(2,6,23,0.5)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(0,210,255,0.06)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,210,255,0.2)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,210,255,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,210,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="absolute top-0 left-[15%] right-[15%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.3), transparent)" }} />
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.1)" }}>
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{link.name}</div>
                        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>{link.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ RIGHT: FAQ Accordion ══ */}
            <div ref={rightRef} style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.9s ease-out 0.2s, transform 0.9s ease-out 0.2s",
            }}>
              <div className="relative rounded-2xl overflow-hidden" style={{
                background: "rgba(2,6,23,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,210,255,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}>
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)" }} />

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.12)" }}>
                      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#00D2FF">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm1.07-4.78l-.9.92C10.45 10.85 10 11.5 10 12.5H9v-.5c0-.66.45-1.31 1.17-2.03l1.24-1.26A.96.96 0 0011.5 8a1.5 1.5 0 00-3 0H7a3 3 0 116 0c0 .66-.42 1.22-1.07 1.78l.14-.06z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold" style={{ fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "jm-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>
                      FAQ
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {faqs.map((faq, i) => {
                      const isOpen = openFaq === i;
                      return (
                        <div
                          key={i}
                          className="rounded-xl overflow-hidden transition-all duration-300"
                          style={{
                            background: isOpen ? "rgba(0,210,255,0.03)" : "rgba(0,210,255,0.01)",
                            border: isOpen ? "1px solid rgba(0,210,255,0.15)" : "1px solid rgba(0,210,255,0.04)",
                          }}
                        >
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            className="w-full flex items-center justify-between p-4 text-left cursor-pointer transition-colors duration-200"
                            style={{ background: "transparent", border: "none" }}
                          >
                            <span className="text-sm font-medium pr-4" style={isOpen ? { background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: "rgba(255,255,255,0.6)" }}>
                              {faq.q}
                            </span>
                            <span
                              className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300"
                              style={{
                                background: isOpen ? "rgba(0,210,255,0.1)" : "rgba(0,210,255,0.04)",
                                border: "1px solid rgba(0,210,255,0.1)",
                                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                              }}
                            >
                              <svg viewBox="0 0 16 16" width="12" height="12" fill={isOpen ? "#00D2FF" : "rgba(255,255,255,0.3)"}>
                                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                              </svg>
                            </span>
                          </button>

                          {isOpen && (
                            <div
                              className="px-4 pb-4"
                              style={{ animation: "jm-faq-open 0.3s ease-out" }}
                            >
                              <div className="h-[1px] w-10 mb-3" style={{ background: "linear-gradient(90deg, rgba(0,210,255,0.2), transparent)" }} />
                              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                                {faq.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
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

export default JoinMovement;
