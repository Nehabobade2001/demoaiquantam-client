import { useState, useEffect, useRef } from "react";

const WhyAIBlockchain = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) titleObserver.observe(titleRef.current);

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => prev.includes(index) ? prev : [...prev, index]);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => {
      if (el) cardObserver.observe(el);
    });

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const features = [
    {
      id: 1,
      title: "AI-Powered Analytics",
      desc: "Real-time market analysis using deep learning models that adapt to market conditions 24/7.",
      stat: "99.2%",
      statLabel: "Accuracy Rate",
      icon: (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <circle cx="24" cy="24" r="20" stroke="rgba(0,210,255,0.15)" strokeWidth="1"/>
          <circle cx="24" cy="24" r="12" stroke="rgba(0,210,255,0.25)" strokeWidth="1"/>
          <circle cx="24" cy="24" r="4" fill="#00D2FF" opacity="0.8">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
          </circle>
          <line x1="24" y1="4" x2="24" y2="12" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
          <line x1="24" y1="36" x2="24" y2="44" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
          <line x1="4" y1="24" x2="12" y2="24" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
          <line x1="36" y1="24" x2="44" y2="24" stroke="#00D2FF" strokeWidth="0.5" opacity="0.4"/>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Blockchain Security",
      desc: "Every transaction verified and recorded on-chain. Immutable, transparent, trustless.",
      stat: "100%",
      statLabel: "On-Chain Verified",
      icon: (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <rect x="8" y="14" width="32" height="24" rx="4" stroke="rgba(0,210,255,0.3)" strokeWidth="1"/>
          <path d="M16 14V10a8 8 0 0116 0v4" stroke="rgba(0,210,255,0.4)" strokeWidth="1" fill="none"/>
          <circle cx="24" cy="27" r="3" fill="#00D2FF" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <line x1="24" y1="30" x2="24" y2="34" stroke="#00D2FF" strokeWidth="1.5" opacity="0.5"/>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Transparent Trading ",
      desc: "Sharing Profit Anad Rewards on-chain. See exactly how your investments are performing in real-time.",
      stat: "24/7",
      statLabel: "Autonomous Trading",
      icon: (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <circle cx="24" cy="24" r="16" stroke="rgba(0,210,255,0.2)" strokeWidth="1" strokeDasharray="4 3">
            <animateTransform attributeName="transform" type="rotate" values="0 24 24;360 24 24" dur="20s" repeatCount="indefinite"/>
          </circle>
          <circle cx="24" cy="24" r="8" stroke="rgba(0,210,255,0.35)" strokeWidth="1"/>
          <polygon points="24,18 28,26 20,26" fill="#00D2FF" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.5s" repeatCount="indefinite"/>
          </polygon>
          <circle cx="24" cy="8" r="2" fill="#00D2FF" opacity="0.5"/>
          <circle cx="38" cy="30" r="1.5" fill="#00D2FF" opacity="0.4"/>
          <circle cx="10" cy="30" r="1.5" fill="#00D2FF" opacity="0.4"/>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Global Accessibility",
      desc: "No borders, no intermediaries. Connect your wallet and start trading from anywhere in the world.",
      stat: "150+",
      statLabel: "Countries Supported",
      icon: (
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <circle cx="24" cy="24" r="18" stroke="rgba(0,210,255,0.2)" strokeWidth="1"/>
          <ellipse cx="24" cy="24" rx="10" ry="18" stroke="rgba(0,210,255,0.15)" strokeWidth="0.8"/>
          <line x1="6" y1="24" x2="42" y2="24" stroke="rgba(0,210,255,0.15)" strokeWidth="0.8"/>
          <line x1="8" y1="16" x2="40" y2="16" stroke="rgba(0,210,255,0.1)" strokeWidth="0.5"/>
          <line x1="8" y1="32" x2="40" y2="32" stroke="rgba(0,210,255,0.1)" strokeWidth="0.5"/>
          <circle cx="24" cy="24" r="3" fill="#00D2FF" opacity="0.5">
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite"/>
          </circle>
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @keyframes wai-glow-breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.08); }
        }
        @keyframes wai-float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes wai-float-alt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes wai-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes wai-pulse-ring {
          0% { transform: scale(0.85); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.1; }
          100% { transform: scale(0.85); opacity: 0.5; }
        }
        @keyframes wai-scan-h {
          0% { left: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes wai-dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes wai-node-pulse {
          0%, 100% { r: 2; opacity: 0.6; }
          50% { r: 3.5; opacity: 1; }
        }
        @keyframes wai-line-glow {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.2; }
        }
        @keyframes wai-orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes wai-counter {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="about" className="relative bg-black text-white overflow-hidden" style={{ paddingTop: "clamp(2rem,2vw,3rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>

        {/* ═══════ BACKGROUND LAYERS ═══════ */}

        {/* Center spotlight glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 50% at 50% 35%, rgba(0,210,255,0.07) 0%, transparent 70%)" }}
        />
        {/* Breathing secondary glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 40% at 50% 40%, rgba(0,210,255,0.05) 0%, transparent 60%)", animation: "wai-glow-breathe 7s ease-in-out infinite" }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,210,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 20%, transparent 100%)",
          }}
        />

        {/* Horizontal scan line */}
        <div className="absolute top-0 bottom-0 w-[200px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.04), transparent)",
            animation: "wai-scan-h 12s linear infinite",
          }}
        />

        {/* ═══════ FLOATING ELEMENTS ═══════ */}

        {/* Glow orbs */}
        <div className="absolute pointer-events-none" style={{ top: "10%", left: "-5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,210,255,0.05) 0%, transparent 70%)", filter: "blur(40px)", animation: "wai-float-slow 14s ease-in-out infinite" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "5%", right: "-5%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,210,255,0.04) 0%, transparent 70%)", filter: "blur(30px)", animation: "wai-float-slow 16s ease-in-out infinite 3s" }} />

        {/* Floating dots */}
        {[
          { top: "20%", left: "18%", d: "0s", s: 3 },
          { top: "22%", right: "14%", d: "1.2s", s: 4 },
          { top: "55%", left: "6%", d: "2s", s: 3 },
          { top: "78%", right: "10%", d: "0.6s", s: 5 },
          { top: "40%", left: "10%", d: "1.8s", s: 3 },
          { top: "90%", left: "45%", d: "2.8s", s: 2 },
          { top: "35%", right: "6%", d: "0.3s", s: 3 },
          { top: "65%", right: "22%", d: "3.2s", s: 4 },
          { top: "15%", left: "60%", d: "1.5s", s: 2 },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: dot.top, left: dot.left, right: dot.right, width: dot.s, height: dot.s, background: "#00D2FF", boxShadow: `0 0 ${dot.s * 3}px rgba(0,210,255,0.5)`, animation: `wai-node-pulse 3s ease-in-out infinite ${dot.d}` }}
          />
        ))}

        {/* Glass cube top-right */}
        <div className="absolute top-[12%] right-[6%] md:right-[10%] pointer-events-none hidden md:block"
          style={{ animation: "wai-float-alt 8s ease-in-out infinite" }}
        >
          <div style={{ width: 52, height: 52, borderRadius: 12, transform: "rotate(45deg)", background: "rgba(0,210,255,0.03)", backdropFilter: "blur(10px)", border: "1px solid rgba(0,210,255,0.08)", boxShadow: "0 8px 24px rgba(0,0,0,0.3), inset 0 0 16px rgba(0,210,255,0.02)" }} />
        </div>

        {/* Glass cube bottom-left */}
        <div className="absolute bottom-[15%] left-[4%] md:left-[8%] pointer-events-none hidden md:block"
          style={{ animation: "wai-float-alt 10s ease-in-out infinite 2s" }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 8, transform: "rotate(30deg)", background: "rgba(0,210,255,0.02)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,210,255,0.06)" }} />
        </div>

        {/* Curved arcs */}
        <svg className="absolute top-[8%] left-[2%] w-28 h-52 md:w-36 md:h-64 pointer-events-none" viewBox="0 0 140 260" fill="none" style={{ animation: "wai-float-slow 12s ease-in-out infinite" }}>
          <path d="M120 240 Q 15 170, 30 100 Q 42 35, 110 8" stroke="rgba(0,210,255,0.08)" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 4" style={{ animation: "wai-dash-flow 3s linear infinite" }} />
        </svg>
        <svg className="absolute bottom-[8%] right-[2%] w-28 h-52 md:w-36 md:h-64 pointer-events-none" viewBox="0 0 140 260" fill="none" style={{ animation: "wai-float-slow 13s ease-in-out infinite 2s", transform: "scaleX(-1)" }}>
          <path d="M120 240 Q 15 170, 30 100 Q 42 35, 110 8" stroke="rgba(0,210,255,0.08)" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 4" style={{ animation: "wai-dash-flow 3s linear infinite" }} />
        </svg>


        {/* ═══════════════════════════════════════
            MAIN CONTENT
        ═══════════════════════════════════════ */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">

          {/* ── SECTION HEADER ── */}
          <div ref={titleRef} className="text-center mb-16 md:mb-2" style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-7"
              style={{ background: "rgba(0,210,255,0.04)", border: "1px solid rgba(0,210,255,0.1)", backdropFilter: "blur(10px)" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background:"linear-gradient(135deg, #0891b2, #06b6d4)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "rgba(0,210,255,0.65)", fontFamily: "'Orbitron', monospace" }}>
                Why AI + Blockchain
              </span>
            </div>

            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
              <span style={{ color: "white" }}>Intelligence Meets </span>
              <br className="sm:hidden" />
              <span style={{
background:"linear-gradient(135deg, #0891b2, #06b6d4)",
 WebkitTextFillColor: "transparent", 
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "wai-shimmer 4s linear infinite",
                filter: "drop-shadow(0 0 20px rgba(0,210,255,0.2))",
              }}>
                Decentralization
              </span>
            </h2>

            <div className="w-16 h-[1.5px] mx-auto mb-5" style={{ background: "linear-gradient(90deg, transparent, #00D2FF, transparent)", boxShadow: "0 0 8px rgba(0,210,255,0.25)" }} />

            <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              We combine the adaptability of artificial intelligence with the unbreakable trust of blockchain — creating a system that's smarter, faster, and more transparent than anything before.
            </p>
          </div>

          {/* ── CENTER ROBOT VISUAL ── */}
          <div className="relative mb-16 md:mb-24">
            <div className="flex justify-center">
              <div className="relative" style={{ width: "clamp(220px, 35vw, 320px)" }}>

                {/* Pulse rings behind robot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full pointer-events-none" style={{ border: "1px solid rgba(0,210,255,0.05)", animation: "wai-pulse-ring 5s ease-in-out infinite" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] rounded-full pointer-events-none" style={{ border: "1px solid rgba(0,210,255,0.03)", animation: "wai-pulse-ring 5s ease-in-out infinite 1.5s" }} />

                {/* Orbit ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none" style={{ border: "1px dashed rgba(0,210,255,0.07)", animation: "wai-orbit-spin 18s linear infinite" }}>
                  <span className="absolute -top-1 left-1/2 w-2.5 h-2.5 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 10px rgba(0,210,255,0.7)" }} />
                </div>

                {/* Background glow behind robot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)", filter: "blur(30px)" }} />

                {/* Robot image */}
                <img
                  src="/robo.png"
                  alt="AIQuantum Crypto"
                  className="relative z-10 w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(0,210,255,0.25)) drop-shadow(0 0 60px rgba(0,210,255,0.1))",
                    animation: "wai-float-slow 5s ease-in-out infinite",
                  }}
                />

                {/* Floating mini glass card — left */}
                <div className="absolute top-[20%] -left-[15%] z-20 hidden sm:block" style={{ animation: "wai-float-alt 6s ease-in-out infinite" }}>
                  <div className="px-3 py-2 rounded-lg" style={{
                    background: "rgba(2,6,23,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,210,255,0.12)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 6px #00D2FF" }} />
                      <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,210,255,0.6)", fontFamily: "'Orbitron', monospace", fontWeight: 700 }}>AI Active</span>
                    </div>
                  </div>
                </div>

                {/* Floating mini glass card — right */}
                <div className="absolute bottom-[25%] -right-[18%] z-20 hidden sm:block" style={{ animation: "wai-float-alt 7s ease-in-out infinite 1.5s" }}>
                  <div className="px-3 py-2 rounded-lg" style={{
                    background: "rgba(2,6,23,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,210,255,0.12)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}>
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 16 16" width="12" height="12" fill="#00D2FF" opacity="0.7">
                        <path d="M8 1l1.5 3h3.5l-2.8 2.2 1 3.3L8 7.8 4.8 9.5l1-3.3L3 4h3.5z"/>
                      </svg>
                      <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(0,210,255,0.6)", fontFamily: "'Orbitron', monospace", fontWeight: 700 }}>99.8% Uptime</span>
                    </div>
                  </div>
                </div>

                {/* Small orbiting dots around robot */}
                {[0, 120, 240].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const r = 52;
                  return (
                    <div key={i} className="absolute top-1/2 left-1/2 pointer-events-none z-[5]"
                      style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: "rgba(0,210,255,0.5)",
                        boxShadow: "0 0 8px rgba(0,210,255,0.4)",
                        transform: `translate(${Math.cos(rad) * r}%, ${Math.sin(rad) * r}%)`,
                        animation: `wai-node-pulse 2.5s ease-in-out infinite ${i * 0.8}s`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Label */}
            <div className="text-center mt-6">
              <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,210,255,0.35)" }}>
                AIQuantum Crypto Engine
              </span>
            </div>
          </div>

          {/* ── BENTO GRID: FEATURE CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {features.map((feature, i) => {
              const isCardVisible = visibleCards.includes(i);
              return (
              <div
                key={feature.id}
                ref={(el) => (cardRefs.current[i] = el)}
                data-index={i}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background: hoveredCard === i
                    ? "rgba(0,210,255,0.03)"
                    : "rgba(2,6,23,0.5)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: hoveredCard === i
                    ? "1px solid rgba(0,210,255,0.2)"
                    : "1px solid rgba(0,210,255,0.06)",
                  boxShadow: hoveredCard === i
                    ? "0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,210,255,0.06)"
                    : "0 10px 40px rgba(0,0,0,0.2)",
                  opacity: isCardVisible ? 1 : 0,
                  transform: isCardVisible
                    ? (hoveredCard === i ? "translateY(-8px)" : "translateY(0)")
                    : "translateY(60px)",
                  transition: `opacity 0.7s ease-out ${i * 0.15}s, transform 0.7s ease-out ${i * 0.15}s, background 0.5s, border 0.5s, box-shadow 0.5s`,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top edge glow */}
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px] transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.4), transparent)",
                    opacity: hoveredCard === i ? 1 : 0,
                  }}
                />

                <div className="p-5 md:p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-5 transition-transform duration-500"
                    style={{ transform: hoveredCard === i ? "scale(1.1)" : "scale(1)" }}
                  >
                    {feature.icon}
                  </div>

                  {/* Stat */}
                  <div className="mb-4">
                    <span style={{
                       background: "linear-gradient(135deg, #FFD700, #f59e0b)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
       color: "transparent",
      WebkitTextFillColor: "transparent",

      fontFamily: "'Orbitron', monospace",
      fontSize: "clamp(1.6rem, 3vw, 2rem)",
      fontWeight: 900,


                    }}>
                      {feature.stat}
                    </span>
                    <span style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(0,210,255,0.35)",
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: 600,
                      marginTop: 4,
                      display: "block",
                    }}>
                      {feature.statLabel}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-10 mb-4" style={{ background: "linear-gradient(90deg, rgba(0,210,255,0.3), transparent)" }} />

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-bold mb-2 text-white">
                    {feature.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(to top, rgba(0,210,255,0.03), transparent)",
                    opacity: hoveredCard === i ? 1 : 0,
                  }}
                />
              </div>
            );
            })}
          </div>

          {/* ── BOTTOM VERIFICATION PLAQUE ── */}
          <div className="mt-14 md:mt-20 flex justify-center">
            <div className="relative inline-flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14 px-8 sm:px-12 py-5 sm:py-6 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(30,35,30,0.9) 0%, rgba(18,22,18,0.95) 50%, rgba(30,35,30,0.9) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0,210,255,0.1)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 30px rgba(0,210,255,0.03)",
              }}
            >
              {/* Top edge highlight — brushed metal effect */}
              <div className="absolute top-0 left-[5%] right-[5%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(192,192,192,0.15), rgba(0,210,255,0.2), rgba(192,192,192,0.15), transparent)" }} />
              {/* Bottom edge */}
              <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.08), transparent)" }} />

              {[
                { label: "Block chain Network", icon: (
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <polygon points="8,1 14,5 14,11 8,15 2,11 2,5" stroke="#00D2FF" strokeWidth="1" fill="rgba(0,210,255,0.1)"/>
                    <polygon points="8,4 11,6 11,10 8,12 5,10 5,6" stroke="#00D2FF" strokeWidth="0.5" opacity="0.5"/>
                  </svg>
                )},
                { label: "AI Verified", icon: (
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#00D2FF" strokeWidth="1"/>
                    <path d="M5 8l2 2 4-4" stroke="#00D2FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )},
                { label: "Smart Contract Audited", icon: (
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <rect x="3" y="2" width="10" height="12" rx="2" stroke="#00D2FF" strokeWidth="1"/>
                    <line x1="5.5" y1="5" x2="10.5" y2="5" stroke="#00D2FF" strokeWidth="0.7" opacity="0.6"/>
                    <line x1="5.5" y1="7.5" x2="10.5" y2="7.5" stroke="#00D2FF" strokeWidth="0.7" opacity="0.6"/>
                    <line x1="5.5" y1="10" x2="8.5" y2="10" stroke="#00D2FF" strokeWidth="0.7" opacity="0.6"/>
                  </svg>
                )},
                { label: "Decentralized", icon: (
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <circle cx="8" cy="8" r="2" fill="#00D2FF" opacity="0.5"/>
                    <circle cx="8" cy="2" r="1.2" fill="#00D2FF" opacity="0.35"/>
                    <circle cx="14" cy="8" r="1.2" fill="#00D2FF" opacity="0.35"/>
                    <circle cx="2" cy="8" r="1.2" fill="#00D2FF" opacity="0.35"/>
                    <circle cx="8" cy="14" r="1.2" fill="#00D2FF" opacity="0.35"/>
                    <line x1="8" y1="3.2" x2="8" y2="6" stroke="#00D2FF" strokeWidth="0.5" opacity="0.3"/>
                    <line x1="8" y1="10" x2="8" y2="12.8" stroke="#00D2FF" strokeWidth="0.5" opacity="0.3"/>
                    <line x1="3.2" y1="8" x2="6" y2="8" stroke="#00D2FF" strokeWidth="0.5" opacity="0.3"/>
                    <line x1="10" y1="8" x2="12.8" y2="8" stroke="#00D2FF" strokeWidth="0.5" opacity="0.3"/>
                  </svg>
                )},
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(0,210,255,0.06)",
                      border: "1px solid rgba(0,210,255,0.12)",
                      boxShadow: "0 0 10px rgba(0,210,255,0.05)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-[13px] tracking-wide font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.label}
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

export default WhyAIBlockchain;
