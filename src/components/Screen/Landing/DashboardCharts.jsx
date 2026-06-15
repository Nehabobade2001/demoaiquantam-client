import { useState, useEffect, useRef } from "react";

const DashboardCharts = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const titleObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setTitleVisible(true); titleObs.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) titleObs.observe(titleRef.current);

    const cardObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => prev.includes(index) ? prev : [...prev, index]);
            cardObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => { if (el) cardObs.observe(el); });

    return () => { titleObs.disconnect(); cardObs.disconnect(); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes dc-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes dc-glow-breathe {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes dc-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes dc-float-alt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes dc-node-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        @keyframes dc-dash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes dc-scan-v {
          0% { top: -2px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes dc-chart-draw {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes dc-bar-grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes dc-donut-spin {
          from { transform: rotate(-90deg); }
          to { transform: rotate(-90deg); }
        }
        @keyframes dc-pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(0,210,255,0.2)); }
          50% { filter: drop-shadow(0 0 12px rgba(0,210,255,0.45)); }
        }
      `}</style>

      <section className="relative bg-black text-white overflow-hidden" style={{ paddingTop: "clamp(2rem,2vw,3rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>

        {/* ═══════ BACKGROUND ═══════ */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/Abg-3.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: 0.40 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 45%, rgba(0,210,255,0.04) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 35% 30% at 70% 30%, rgba(0,210,255,0.03) 0%, transparent 55%)", animation: "dc-glow-breathe 9s ease-in-out infinite" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 25% 25% at 30% 65%, rgba(0,210,255,0.02) 0%, transparent 50%)", animation: "dc-glow-breathe 11s ease-in-out infinite 3s" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(rgba(0,210,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.4) 1px, transparent 1px)",
          backgroundSize: "75px 75px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 20%, transparent 100%)",
        }} />

        {/* Floating dots */}
        {[
          { top: "10%", left: "14%", d: "0s", s: 3 },
          { top: "20%", right: "12%", d: "1.2s", s: 4 },
          { top: "55%", left: "7%", d: "2s", s: 3 },
          { top: "75%", right: "9%", d: "0.5s", s: 4 },
          { top: "42%", left: "4%", d: "1.8s", s: 2 },
          { top: "85%", left: "48%", d: "2.5s", s: 3 },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            top: dot.top, left: dot.left, right: dot.right,
            width: dot.s, height: dot.s, background: "#00D2FF",
            boxShadow: `0 0 ${dot.s * 3}px rgba(0,210,255,0.5)`,
            animation: `dc-node-pulse 3.5s ease-in-out infinite ${dot.d}`,
          }} />
        ))}

        {/* Curved arcs */}
        <svg className="absolute top-[8%] left-[1%] w-20 h-36 md:w-28 md:h-48 pointer-events-none" viewBox="0 0 120 220" fill="none" style={{ animation: "dc-float 13s ease-in-out infinite" }}>
          <path d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5" stroke="rgba(0,210,255,0.06)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 4" style={{ animation: "dc-dash 3s linear infinite" }} />
        </svg>
        <svg className="absolute bottom-[8%] right-[1%] w-20 h-36 md:w-28 md:h-48 pointer-events-none" viewBox="0 0 120 220" fill="none" style={{ animation: "dc-float 14s ease-in-out infinite 2s", transform: "scaleX(-1)" }}>
          <path d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5" stroke="rgba(0,210,255,0.06)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 4" style={{ animation: "dc-dash 3s linear infinite" }} />
        </svg>

        {/* Glass cubes */}
        <div className="absolute top-[14%] right-[6%] pointer-events-none hidden md:block" style={{ animation: "dc-float-alt 9s ease-in-out infinite" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, transform: "rotate(40deg)", background: "rgba(0,210,255,0.02)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,210,255,0.05)" }} />
        </div>
        <div className="absolute bottom-[16%] left-[5%] pointer-events-none hidden md:block" style={{ animation: "dc-float-alt 11s ease-in-out infinite 3s" }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, transform: "rotate(30deg)", background: "rgba(0,210,255,0.015)", backdropFilter: "blur(6px)", border: "1px solid rgba(0,210,255,0.04)" }} />
        </div>

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-[1px] pointer-events-none z-[1]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.06), transparent)", animation: "dc-scan-v 12s linear infinite" }} />


        {/* ═══════════════════════════════════
            CONTENT
        ═══════════════════════════════════ */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">

          {/* ── HEADER ── */}
          <div ref={titleRef} className="text-center mb-14 md:mb-20" style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-7" style={{ background: "rgba(0,210,255,0.04)", border: "1px solid rgba(0,210,255,0.1)", backdropFilter: "blur(10px)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#00D2FF", boxShadow: "0 0 8px #00D2FF, 0 0 16px rgba(0,210,255,0.3)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "dc-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))" }}>
                Analytics Dashboard
              </span>
            </div>

            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
              <span className="text-white">Live Network </span>
              <br className="sm:hidden" />
              <span style={{
                background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "dc-shimmer 4s linear infinite",
                filter: "drop-shadow(0 0 30px rgba(0,210,255,0.4))",
              }}>
                Analytics
              </span>
            </h2>

            <div className="w-16 h-[1.5px] mx-auto mb-5" style={{ background: "linear-gradient(90deg, transparent, #00D2FF, transparent)", boxShadow: "0 0 8px rgba(0,210,255,0.25)" }} />
          </div>

          {/* ── CHART CARDS GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

            {/* ────────────────────────────────
                CARD 1: TVL Trend
            ──────────────────────────────── */}
            <div ref={(el) => (cardRefs.current[0] = el)} data-index="0" className="relative rounded-2xl overflow-hidden" style={{
              background: "rgba(2,6,23,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,210,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              opacity: visibleCards.includes(0) ? 1 : 0,
              transform: visibleCards.includes(0) ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.7s ease-out 0s, transform 0.7s ease-out 0s",
            }}>
              {/* Top edge glow */}
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)" }} />

              <div className="p-5 md:p-6">
                {/* Card header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.12)" }}>
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <polyline points="2,12 5,8 8,10 14,3" stroke="#00D2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    TVL Trend
                  </span>
                </div>

                {/* SVG Line Chart */}
                <div className="mb-4" style={{ animation: "dc-pulse-glow 4s ease-in-out infinite" }}>
                  <svg viewBox="0 0 280 120" className="w-full" style={{ height: "auto" }}>
                    <defs>
                      <linearGradient id="tvl-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="tvl-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0284c7" />
                        <stop offset="50%" stopColor="#00D2FF" />
                        <stop offset="100%" stopColor="#80ffcc" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[30, 55, 80, 105].map((y, i) => (
                      <line key={i} x1="10" y1={y} x2="270" y2={y} stroke="rgba(0,210,255,0.05)" strokeWidth="0.5" />
                    ))}

                    {/* Gradient fill area */}
                    <path
                      d="M10,95 L35,88 L60,82 L85,78 L110,70 L135,62 L160,55 L185,42 L210,38 L235,30 L260,22 L260,110 L10,110 Z"
                      fill="url(#tvl-fill)"
                    />

                    {/* Line */}
                    <path
                      d="M10,95 L35,88 L60,82 L85,78 L110,70 L135,62 L160,55 L185,42 L210,38 L235,30 L260,22"
                      fill="none"
                      stroke="url(#tvl-line)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="600"
                      style={{ animation: "dc-chart-draw 2s ease-out forwards" }}
                    />

                    {/* Data points */}
                    {[[10,95],[35,88],[60,82],[85,78],[110,70],[135,62],[160,55],[185,42],[210,38],[235,30],[260,22]].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="2.5" fill="#000" stroke="#00D2FF" strokeWidth="1.2" opacity="0.7">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                      </circle>
                    ))}

                    {/* End point glow */}
                    <circle cx="260" cy="22" r="4" fill="none" stroke="rgba(0,210,255,0.3)" strokeWidth="1">
                      <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

                {/* Value */}
                <div className="flex items-end justify-between">
                  <div>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      display: "block",
                      background: "linear-gradient(135deg, #FFD700, #f59e0b)",
                      WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                      backgroundSize: "200% auto",
                      animation: "dc-shimmer 4s linear infinite",
                      filter: "drop-shadow(0 0 30px rgba(255,215,0,0.4))",
                    }}>
                      $5.2M
                    </span>
                    <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "'Orbitron', monospace", fontWeight: 600, marginTop: 3, display: "block" }}>
                      Total Value Locked
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.1)" }}>
                    <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
                      <path d="M6,2 L10,7 L2,7 Z" fill="#00D2FF" opacity="0.8" />
                    </svg>
                    <span style={{ fontSize: 10, fontFamily: "'Orbitron', monospace", fontWeight: 700, background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>+12.4%</span>
                  </div>
                </div>
              </div>
            </div>


            {/* ────────────────────────────────
                CARD 2: Active Users (Donut)
            ──────────────────────────────── */}
            <div ref={(el) => (cardRefs.current[1] = el)} data-index="1" className="relative rounded-2xl overflow-hidden" style={{
              background: "rgba(2,6,23,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,210,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              opacity: visibleCards.includes(1) ? 1 : 0,
              transform: visibleCards.includes(1) ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
            }}>
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)" }} />

              <div className="p-5 md:p-6">
                {/* Card header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.12)" }}>
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#00D2FF" strokeWidth="1.5" />
                      <circle cx="8" cy="8" r="2.5" fill="#00D2FF" opacity="0.5" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Active Users
                  </span>
                </div>

                {/* SVG Donut Chart */}
                <div className="flex justify-center mb-4" style={{ animation: "dc-pulse-glow 4s ease-in-out infinite 1s" }}>
                  <div className="relative" style={{ width: 160, height: 160 }}>
                    <svg viewBox="0 0 160 160" className="w-full h-full">
                      <defs>
                        <filter id="donut-glow">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Background ring */}
                      <circle cx="80" cy="80" r="55" fill="none" stroke="rgba(0,210,255,0.04)" strokeWidth="18" />

                      {/* 60% Active — bright green (dasharray = 60% of circumference) */}
                      {/* Circumference = 2 * PI * 55 = 345.575 */}
                      <circle
                        cx="80" cy="80" r="55"
                        fill="none"
                        stroke="#00D2FF"
                        strokeWidth="18"
                        strokeDasharray="207.35 345.575"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(-90 80 80)"
                        opacity="0.85"
                        filter="url(#donut-glow)"
                      />

                      {/* 25% New — medium green */}
                      <circle
                        cx="80" cy="80" r="55"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="18"
                        strokeDasharray="86.39 345.575"
                        strokeDashoffset="-211.35"
                        strokeLinecap="round"
                        transform="rotate(-90 80 80)"
                        opacity="0.6"
                      />

                      {/* 15% Returning — dim green */}
                      <circle
                        cx="80" cy="80" r="55"
                        fill="none"
                        stroke="#164e63"
                        strokeWidth="18"
                        strokeDasharray="51.84 345.575"
                        strokeDashoffset="-301.74"
                        strokeLinecap="round"
                        transform="rotate(-90 80 80)"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        background: "linear-gradient(135deg, #FFD700, #f59e0b)",
                        WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundSize: "200% auto",
                        animation: "dc-shimmer 4s linear infinite",
                        filter: "drop-shadow(0 0 30px rgba(255,215,0,0.4))",
                      }}>
                        24K+
                      </span>
                      <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "'Orbitron', monospace", fontWeight: 600, marginTop: 4 }}>
                        Users
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-4">
                  {[
                    { label: "Active", color: "#00D2FF", pct: "60%" },
                    { label: "New", color: "#0284c7", pct: "25%" },
                    { label: "Return", color: "#164e63", pct: "15%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}40` }} />
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'Orbitron', monospace", fontWeight: 600 }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: 10, fontFamily: "'Orbitron', monospace", fontWeight: 700, background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {item.pct}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* ────────────────────────────────
                CARD 3: Network Staking (Bars)
            ──────────────────────────────── */}
            <div ref={(el) => (cardRefs.current[2] = el)} data-index="2" className="relative rounded-2xl overflow-hidden" style={{
              background: "rgba(2,6,23,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,210,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              opacity: visibleCards.includes(2) ? 1 : 0,
              transform: visibleCards.includes(2) ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s",
            }}>
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)" }} />

              <div className="p-5 md:p-6">
                {/* Card header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.12)" }}>
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <rect x="2" y="9" width="3" height="5" rx="0.5" fill="#00D2FF" opacity="0.5" />
                      <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="#00D2FF" opacity="0.7" />
                      <rect x="11" y="2" width="3" height="12" rx="0.5" fill="#00D2FF" opacity="0.9" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Network Staking
                  </span>
                </div>

                {/* SVG Bar Chart */}
                <div className="mb-4" style={{ animation: "dc-pulse-glow 4s ease-in-out infinite 2s" }}>
                  <svg viewBox="0 0 280 130" className="w-full" style={{ height: "auto" }}>
                    <defs>
                      <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[30, 55, 80, 105].map((y, i) => (
                      <line key={i} x1="15" y1={y} x2="265" y2={y} stroke="rgba(0,210,255,0.05)" strokeWidth="0.5" />
                    ))}

                    {/* Bars */}
                    {[
                      { x: 25, h: 65, label: "Q1" },
                      { x: 68, h: 80, label: "Q2" },
                      { x: 111, h: 55, label: "Q3" },
                      { x: 154, h: 92, label: "Q4" },
                      { x: 197, h: 75, label: "Q5" },
                      { x: 240, h: 100, label: "Q6" },
                    ].map((bar, i) => (
                      <g key={i}>
                        {/* Bar background */}
                        <rect
                          x={bar.x}
                          y={110 - bar.h}
                          width="24"
                          height={bar.h}
                          rx="3"
                          fill="url(#bar-grad)"
                          opacity={0.4 + (i * 0.1)}
                          style={{
                            transformOrigin: `${bar.x + 12}px 110px`,
                            animation: `dc-bar-grow 0.8s ease-out ${i * 0.12}s both`,
                          }}
                        />
                        {/* Bar glow line at top */}
                        <rect
                          x={bar.x}
                          y={110 - bar.h}
                          width="24"
                          height="2"
                          rx="1"
                          fill="#00D2FF"
                          opacity="0.7"
                          style={{
                            transformOrigin: `${bar.x + 12}px 110px`,
                            animation: `dc-bar-grow 0.8s ease-out ${i * 0.12}s both`,
                          }}
                        >
                          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                        </rect>
                        {/* Label */}
                        <text
                          x={bar.x + 12}
                          y="124"
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.15)"
                          fontSize="8"
                          fontFamily="'Orbitron', monospace"
                          fontWeight="600"
                        >
                          {bar.label}
                        </text>
                      </g>
                    ))}

                    {/* Base line */}
                    <line x1="15" y1="110" x2="265" y2="110" stroke="rgba(0,210,255,0.1)" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Value */}
                <div className="flex items-end justify-between">
                  <div>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      display: "block",
                      background: "linear-gradient(135deg, #FFD700, #f59e0b)",
                      WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                      backgroundSize: "200% auto",
                      animation: "dc-shimmer 4s linear infinite",
                      filter: "drop-shadow(0 0 30px rgba(255,215,0,0.4))",
                    }}>
                      78% Staked
                    </span>
                    <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "'Orbitron', monospace", fontWeight: 600, marginTop: 3, display: "block" }}>
                      Network Participation
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ background: "rgba(0,210,255,0.06)", border: "1px solid rgba(0,210,255,0.1)" }}>
                    <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
                      <path d="M6,2 L10,7 L2,7 Z" fill="#00D2FF" opacity="0.8" />
                    </svg>
                    <span style={{ fontSize: 10, fontFamily: "'Orbitron', monospace", fontWeight: 700, background: "linear-gradient(135deg, #0891b2, #06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>+5.2%</span>
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

export default DashboardCharts;
