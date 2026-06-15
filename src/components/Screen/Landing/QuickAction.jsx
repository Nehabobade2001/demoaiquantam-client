import { useState } from "react";

const QuickAction = () => {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const links = [
    {
      label: "Docs",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <rect x="4" y="2" width="14" height="19" rx="2.5" stroke="#00ff9f" strokeWidth="1.2" />
          <line x1="7.5" y1="7" x2="14.5" y2="7" stroke="#00ff9f" strokeWidth="0.8" opacity="0.6" />
          <line x1="7.5" y1="10" x2="14.5" y2="10" stroke="#00ff9f" strokeWidth="0.8" opacity="0.6" />
          <line x1="7.5" y1="13" x2="11.5" y2="13" stroke="#00ff9f" strokeWidth="0.8" opacity="0.6" />
          <circle cx="16" cy="18" r="0.8" fill="#00ff9f" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      ),
    },
    {
      label: "Whitepaper",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path d="M6 3C6 2.45 6.45 2 7 2h7l5 5v13c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V3z" stroke="#00ff9f" strokeWidth="1.2" />
          <path d="M14 2v5h5" stroke="#00ff9f" strokeWidth="1" opacity="0.5" />
          <line x1="8.5" y1="11" x2="15.5" y2="11" stroke="#00ff9f" strokeWidth="0.7" opacity="0.5" />
          <line x1="8.5" y1="13.5" x2="15.5" y2="13.5" stroke="#00ff9f" strokeWidth="0.7" opacity="0.5" />
          <line x1="8.5" y1="16" x2="12.5" y2="16" stroke="#00ff9f" strokeWidth="0.7" opacity="0.5" />
        </svg>
      ),
    },
    {
      label: "Community",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="8" cy="8" r="3" stroke="#00ff9f" strokeWidth="1.2" />
          <circle cx="16" cy="8" r="3" stroke="#00ff9f" strokeWidth="1" opacity="0.6" />
          <path d="M2 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00ff9f" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M14 19c0-3.3 2.7-6 6-6" stroke="#00ff9f" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          <circle cx="12" cy="5" r="0.7" fill="#00ff9f" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      ),
    },
    {
      label: "Testnet",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <rect x="2" y="4" width="20" height="14" rx="2.5" stroke="#00ff9f" strokeWidth="1.2" />
          <line x1="2" y1="8" x2="22" y2="8" stroke="#00ff9f" strokeWidth="0.7" opacity="0.3" />
          <text x="5.5" y="14.5" fill="#00ff9f" fontSize="5" fontFamily="monospace" opacity="0.7">&gt;_</text>
          <circle cx="5" cy="6" r="0.7" fill="#00ff9f" opacity="0.5" />
          <circle cx="7.5" cy="6" r="0.7" fill="#00ff9f" opacity="0.35" />
          <circle cx="10" cy="6" r="0.7" fill="#00ff9f" opacity="0.2" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @keyframes qa-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes qa-float-alt {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
        }
        @keyframes qa-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes qa-glow-breathe {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.06); }
        }
        @keyframes qa-node-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        @keyframes qa-eye-pulse {
          0%, 100% { opacity: 0.9; filter: drop-shadow(0 0 6px rgba(0,255,159,0.8)); }
          50% { opacity: 0.5; filter: drop-shadow(0 0 12px rgba(0,255,159,1)); }
        }
        @keyframes qa-scan-v {
          0% { top: -2px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes qa-dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes qa-btn-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(0,255,159,0); }
          50% { box-shadow: 0 0 20px rgba(0,255,159,0.08); }
        }
      `}</style>

      <section
        className="relative bg-black text-white overflow-hidden"
        style={{
          paddingTop: "clamp(5rem,10vw,8rem)",
          paddingBottom: "clamp(5rem,10vw,8rem)",
        }}
      >
        {/* ======= BACKGROUND ======= */}

        {/* Center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 40%, rgba(0,255,159,0.05) 0%, transparent 70%)",
          }}
        />
        {/* Breathing glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 35% 35% at 70% 30%, rgba(0,255,159,0.04) 0%, transparent 60%)",
            animation: "qa-glow-breathe 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 30% 30% at 30% 65%, rgba(0,255,159,0.03) 0%, transparent 55%)",
            animation: "qa-glow-breathe 11s ease-in-out infinite 3s",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,159,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,159,0.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 50%, #000 20%, transparent 100%)",
          }}
        />

        {/* Floating dots */}
        {[
          { top: "10%", left: "14%", d: "0s", s: 3 },
          { top: "20%", right: "12%", d: "1.2s", s: 4 },
          { top: "55%", left: "7%", d: "2s", s: 3 },
          { top: "75%", right: "9%", d: "0.5s", s: 5 },
          { top: "42%", left: "9%", d: "1.6s", s: 3 },
          { top: "85%", left: "40%", d: "2.6s", s: 2 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: dot.top,
              left: dot.left,
              right: dot.right,
              width: dot.s,
              height: dot.s,
              background: "#00ff9f",
              boxShadow: `0 0 ${dot.s * 3}px rgba(0,255,159,0.5)`,
              animation: `qa-node-pulse 3.5s ease-in-out infinite ${dot.d}`,
            }}
          />
        ))}

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-[1px] pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,159,0.08), transparent)",
            animation: "qa-scan-v 10s linear infinite",
          }}
        />

        {/* Curved arcs */}
        <svg
          className="absolute top-[6%] left-[1%] w-24 h-44 md:w-32 md:h-56 pointer-events-none"
          viewBox="0 0 120 220"
          fill="none"
          style={{ animation: "qa-float 12s ease-in-out infinite" }}
        >
          <path
            d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5"
            stroke="rgba(0,255,159,0.07)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="5 4"
            style={{ animation: "qa-dash-flow 3s linear infinite" }}
          />
        </svg>
        <svg
          className="absolute bottom-[6%] right-[1%] w-24 h-44 md:w-32 md:h-56 pointer-events-none"
          viewBox="0 0 120 220"
          fill="none"
          style={{
            animation: "qa-float 13s ease-in-out infinite 2s",
            transform: "scaleX(-1)",
          }}
        >
          <path
            d="M100 200 Q 10 140, 25 80 Q 35 30, 95 5"
            stroke="rgba(0,255,159,0.07)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="5 4"
            style={{ animation: "qa-dash-flow 3s linear infinite" }}
          />
        </svg>

        {/* ======= CONTENT ======= */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-7"
              style={{
                background: "rgba(0,255,159,0.04)",
                border: "1px solid rgba(0,255,159,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#00ff9f",
                  boxShadow: "0 0 8px #00ff9f, 0 0 16px rgba(0,255,159,0.3)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "rgba(0,255,159,0.65)",
                  fontFamily: "'Orbitron', monospace",
                }}
              >
                Quick Access
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              <span style={{ color: "white" }}>Get Started </span>
              <br className="sm:hidden" />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #00ff9f 0%, #00e68a 25%, #80ffcc 50%, #00ff9f 75%, #00cc7a 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "qa-shimmer 4s linear infinite",
                  filter: "drop-shadow(0 0 20px rgba(0,255,159,0.2))",
                }}
              >
                Instantly
              </span>
            </h2>

            <div
              className="w-16 h-[1.5px] mx-auto mb-5"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00ff9f, transparent)",
                boxShadow: "0 0 8px rgba(0,255,159,0.25)",
              }}
            />

            <p
              className="max-w-2xl mx-auto text-sm md:text-[15px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Jump straight into the AIQuantum Crypto ecosystem. Access documentation, research, community, and live testnet in one place.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* LEFT: Quick Action Card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(0,10,5,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,255,159,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              {/* Top edge glow */}
              <div
                className="absolute top-0 left-[10%] right-[10%] h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,255,159,0.25), transparent)",
                }}
              />

              <div className="p-6 md:p-8">
                {/* Network icon + title */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(0,255,159,0.06)",
                      border: "1px solid rgba(0,255,159,0.12)",
                    }}
                  >
                    <svg
                      viewBox="0 0 40 40"
                      width="28"
                      height="28"
                      fill="none"
                    >
                      {/* Network nodes connected by lines */}
                      <circle cx="20" cy="8" r="3" fill="#00ff9f" opacity="0.7">
                        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="8" cy="20" r="3" fill="#00ff9f" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="2s" begin="0.3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="32" cy="20" r="3" fill="#00ff9f" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;0.3;0.5" dur="2s" begin="0.6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="14" cy="32" r="3" fill="#00ff9f" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.2s" begin="0.9s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="26" cy="32" r="3" fill="#00ff9f" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.2s" begin="1.2s" repeatCount="indefinite" />
                      </circle>
                      {/* Connection lines */}
                      <line x1="20" y1="8" x2="8" y2="20" stroke="rgba(0,255,159,0.25)" strokeWidth="0.8" />
                      <line x1="20" y1="8" x2="32" y2="20" stroke="rgba(0,255,159,0.25)" strokeWidth="0.8" />
                      <line x1="8" y1="20" x2="14" y2="32" stroke="rgba(0,255,159,0.25)" strokeWidth="0.8" />
                      <line x1="32" y1="20" x2="26" y2="32" stroke="rgba(0,255,159,0.25)" strokeWidth="0.8" />
                      <line x1="14" y1="32" x2="26" y2="32" stroke="rgba(0,255,159,0.25)" strokeWidth="0.8" />
                      <line x1="8" y1="20" x2="32" y2="20" stroke="rgba(0,255,159,0.12)" strokeWidth="0.5" strokeDasharray="3 2" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-xl md:text-2xl font-bold"
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        color: "#00ff9f",
                      }}
                    >
                      Quick Action
                    </h3>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                        fontWeight: 600,
                      }}
                    >
                      Navigate the Ecosystem
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-[1px] w-full mb-7"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(0,255,159,0.1), transparent)",
                  }}
                />

                {/* 2x2 Link Button Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {links.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="group relative flex items-center gap-3 px-4 py-3.5 md:px-5 md:py-4 rounded-xl transition-all duration-300 no-underline"
                      style={{
                        background:
                          hoveredBtn === i
                            ? "rgba(0,255,159,0.06)"
                            : "rgba(0,255,159,0.02)",
                        border:
                          hoveredBtn === i
                            ? "1px solid rgba(0,255,159,0.25)"
                            : "1px solid rgba(0,255,159,0.06)",
                        boxShadow:
                          hoveredBtn === i
                            ? "0 0 25px rgba(0,255,159,0.08), 0 8px 24px rgba(0,0,0,0.3)"
                            : "0 4px 12px rgba(0,0,0,0.2)",
                        transform:
                          hoveredBtn === i
                            ? "translateY(-2px)"
                            : "translateY(0)",
                      }}
                      onMouseEnter={() => setHoveredBtn(i)}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      {/* Top edge glow on hover */}
                      <div
                        className="absolute top-0 left-[15%] right-[15%] h-[1px] transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(0,255,159,0.35), transparent)",
                          opacity: hoveredBtn === i ? 1 : 0,
                        }}
                      />

                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          background:
                            hoveredBtn === i
                              ? "rgba(0,255,159,0.1)"
                              : "rgba(0,255,159,0.04)",
                          border: "1px solid rgba(0,255,159,0.1)",
                        }}
                      >
                        {link.icon}
                      </div>
                      <span
                        className="text-sm font-semibold tracking-wider uppercase transition-colors duration-300"
                        style={{
                          fontFamily: "'Orbitron', monospace",
                          color:
                            hoveredBtn === i
                              ? "#00ff9f"
                              : "rgba(255,255,255,0.45)",
                          fontSize: 11,
                        }}
                      >
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>

                {/* Bottom mini note */}
                <div className="mt-6 flex items-center gap-2 justify-center">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#00ff9f",
                      boxShadow: "0 0 6px #00ff9f",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    All links open in new context
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Large Robot Head SVG */}
            <div className="flex justify-center items-center">
              <div
                className="relative"
                style={{
                  width: "clamp(260px, 32vw, 380px)",
                  animation: "qa-float 6s ease-in-out infinite",
                }}
              >
                {/* Soft glow behind robot */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0,255,159,0.1) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />

                {/* Robot Head SVG */}
                <svg
                  viewBox="0 0 300 340"
                  className="relative z-10 w-full h-auto"
                  fill="none"
                  style={{
                    filter:
                      "drop-shadow(0 0 30px rgba(0,255,159,0.15)) drop-shadow(0 0 60px rgba(0,255,159,0.05))",
                  }}
                >
                  {/* Antenna */}
                  <line
                    x1="150"
                    y1="30"
                    x2="150"
                    y2="65"
                    stroke="rgba(192,192,192,0.5)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="150" cy="24" r="8" fill="#00ff9f" opacity="0.7">
                    <animate
                      attributeName="r"
                      values="8;11;8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.7;0.4;0.7"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Antenna glow */}
                  <circle cx="150" cy="24" r="14" fill="none" stroke="rgba(0,255,159,0.15)" strokeWidth="1">
                    <animate
                      attributeName="r"
                      values="14;20;14"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Head - rounded rectangle */}
                  <rect
                    x="55"
                    y="65"
                    width="190"
                    height="155"
                    rx="35"
                    fill="rgba(15,18,22,0.95)"
                    stroke="rgba(192,192,192,0.2)"
                    strokeWidth="2"
                  />
                  {/* Head inner border highlight */}
                  <rect
                    x="60"
                    y="70"
                    width="180"
                    height="145"
                    rx="32"
                    fill="none"
                    stroke="rgba(0,255,159,0.05)"
                    strokeWidth="1"
                  />
                  {/* Head top highlight */}
                  <path
                    d="M100 67 Q150 60 200 67"
                    stroke="rgba(192,192,192,0.15)"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Eye sockets */}
                  <rect
                    x="85"
                    y="105"
                    width="50"
                    height="38"
                    rx="12"
                    fill="rgba(0,0,0,0.6)"
                    stroke="rgba(0,255,159,0.15)"
                    strokeWidth="1"
                  />
                  <rect
                    x="165"
                    y="105"
                    width="50"
                    height="38"
                    rx="12"
                    fill="rgba(0,0,0,0.6)"
                    stroke="rgba(0,255,159,0.15)"
                    strokeWidth="1"
                  />

                  {/* Left eye - glowing */}
                  <ellipse cx="110" cy="124" rx="14" ry="10" fill="#00ff9f" opacity="0.85"
                    style={{ animation: "qa-eye-pulse 3s ease-in-out infinite" }}
                  >
                    <animate attributeName="ry" values="10;8;10" dur="4s" repeatCount="indefinite" />
                  </ellipse>
                  {/* Left eye highlight */}
                  <ellipse cx="115" cy="120" rx="5" ry="3.5" fill="white" opacity="0.3" />

                  {/* Right eye - glowing */}
                  <ellipse cx="190" cy="124" rx="14" ry="10" fill="#00ff9f" opacity="0.85"
                    style={{ animation: "qa-eye-pulse 3s ease-in-out infinite 0.5s" }}
                  >
                    <animate attributeName="ry" values="10;8;10" dur="4s" begin="0.5s" repeatCount="indefinite" />
                  </ellipse>
                  {/* Right eye highlight */}
                  <ellipse cx="195" cy="120" rx="5" ry="3.5" fill="white" opacity="0.3" />

                  {/* Eye glow aura */}
                  <ellipse cx="110" cy="124" rx="22" ry="16" fill="none" stroke="rgba(0,255,159,0.1)" strokeWidth="1">
                    <animate attributeName="rx" values="22;26;22" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx="190" cy="124" rx="22" ry="16" fill="none" stroke="rgba(0,255,159,0.1)" strokeWidth="1">
                    <animate attributeName="rx" values="22;26;22" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="0.5s" repeatCount="indefinite" />
                  </ellipse>

                  {/* Nose bridge - subtle line */}
                  <line
                    x1="150"
                    y1="132"
                    x2="150"
                    y2="148"
                    stroke="rgba(192,192,192,0.1)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />

                  {/* Mouth - friendly curved line */}
                  <path
                    d="M115 170 Q130 182 150 182 Q170 182 185 170"
                    stroke="#00ff9f"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.6;0.35;0.6"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>
                  {/* Mouth glow */}
                  <path
                    d="M120 170 Q135 180 150 180 Q165 180 180 170"
                    stroke="rgba(0,255,159,0.1)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.1;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Ear pieces */}
                  <rect
                    x="38"
                    y="115"
                    width="18"
                    height="55"
                    rx="9"
                    fill="rgba(15,18,22,0.9)"
                    stroke="rgba(192,192,192,0.2)"
                    strokeWidth="1.5"
                  />
                  <circle cx="47" cy="135" r="3" fill="#00ff9f" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="47" cy="148" r="2" fill="rgba(0,255,159,0.2)">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                  </circle>

                  <rect
                    x="244"
                    y="115"
                    width="18"
                    height="55"
                    rx="9"
                    fill="rgba(15,18,22,0.9)"
                    stroke="rgba(192,192,192,0.2)"
                    strokeWidth="1.5"
                  />
                  <circle cx="253" cy="135" r="3" fill="#00ff9f" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" begin="0.3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="253" cy="148" r="2" fill="rgba(0,255,159,0.2)">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                  </circle>

                  {/* Neck */}
                  <rect
                    x="120"
                    y="218"
                    width="60"
                    height="22"
                    rx="6"
                    fill="rgba(15,18,22,0.9)"
                    stroke="rgba(192,192,192,0.15)"
                    strokeWidth="1.5"
                  />
                  {/* Neck detail lines */}
                  <line x1="130" y1="224" x2="170" y2="224" stroke="rgba(0,255,159,0.08)" strokeWidth="0.5" />
                  <line x1="132" y1="229" x2="168" y2="229" stroke="rgba(0,255,159,0.06)" strokeWidth="0.5" />
                  <line x1="134" y1="234" x2="166" y2="234" stroke="rgba(0,255,159,0.04)" strokeWidth="0.5" />

                  {/* Shoulders / collar */}
                  <path
                    d="M80 240 Q100 235 120 238 L180 238 Q200 235 220 240 L230 260 Q200 250 150 250 Q100 250 70 260 Z"
                    fill="rgba(15,18,22,0.9)"
                    stroke="rgba(192,192,192,0.15)"
                    strokeWidth="1.5"
                  />
                  {/* Shoulder highlight */}
                  <path
                    d="M90 242 Q120 237 150 238 Q180 237 210 242"
                    stroke="rgba(0,255,159,0.08)"
                    strokeWidth="0.5"
                    fill="none"
                  />

                  {/* Chest plate indicator */}
                  <circle cx="150" cy="278" r="8" fill="none" stroke="rgba(0,255,159,0.15)" strokeWidth="1" />
                  <circle cx="150" cy="278" r="4" fill="#00ff9f" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Forehead detail — decorative lines */}
                  <line x1="110" y1="82" x2="140" y2="82" stroke="rgba(0,255,159,0.08)" strokeWidth="0.5" />
                  <line x1="160" y1="82" x2="190" y2="82" stroke="rgba(0,255,159,0.08)" strokeWidth="0.5" />
                  <circle cx="150" cy="88" r="3" fill="none" stroke="rgba(0,255,159,0.12)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Cheek vents */}
                  <line x1="78" y1="155" x2="88" y2="155" stroke="rgba(192,192,192,0.1)" strokeWidth="0.8" />
                  <line x1="78" y1="159" x2="88" y2="159" stroke="rgba(192,192,192,0.08)" strokeWidth="0.8" />
                  <line x1="78" y1="163" x2="88" y2="163" stroke="rgba(192,192,192,0.06)" strokeWidth="0.8" />

                  <line x1="212" y1="155" x2="222" y2="155" stroke="rgba(192,192,192,0.1)" strokeWidth="0.8" />
                  <line x1="212" y1="159" x2="222" y2="159" stroke="rgba(192,192,192,0.08)" strokeWidth="0.8" />
                  <line x1="212" y1="163" x2="222" y2="163" stroke="rgba(192,192,192,0.06)" strokeWidth="0.8" />
                </svg>

                {/* Label under robot */}
                <div className="text-center mt-4">
                  <span
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(0,255,159,0.35)",
                    }}
                  >
                    XProfit Guardian
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuickAction;
