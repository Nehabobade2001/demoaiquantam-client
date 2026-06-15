import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

/* ── Animated Counter ── */
const Counter = ({ target, prefix = "", suffix = "", decimals = 0 }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ""));
        const ctrl = animate(0, numeric, {
          duration: 2.4, ease: [0.16, 1, 0.3, 1],
          onUpdate: v => {
            if (decimals > 0) setDisplay(v.toFixed(decimals));
            else setDisplay(Math.floor(v).toLocaleString());
          },
          onComplete: () => setDisplay(String(target).replace(/[^0-9.,]/g, "")),
        });
        return () => ctrl.stop();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

const Hero = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 50, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 50, stiffness: 200 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const h = (e) => { cursorX.set(e.clientX - 16); cursorY.set(e.clientY - 16); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [isMobile]);

  /* Canvas — particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * Math.PI * 2,
      blue: Math.random() > 0.3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += 0.006;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        const alpha = (Math.sin(p.a) * 0.5 + 0.5) * 0.4;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.blue ? `rgba(0,210,255,${alpha})` : `rgba(192,192,192,${alpha * 0.5})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  const stagger = { hidden:{opacity:0}, visible:{opacity:1, transition:{staggerChildren:.1}} };
  const fadeUp  = { hidden:{opacity:0,y:28}, visible:{opacity:1,y:0, transition:{duration:.75, ease:[.16,1,.3,1]}} };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&display=swap');

        @property --ga { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes ga-spin   { to { --ga: 360deg; } }
        @keyframes xp-shimmer{ 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes xp-pulse  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes xp-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes xp-orb1   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-25px) scale(1.08)} }
        @keyframes xp-orb2   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,30px)} }
        @keyframes xp-scan   { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @keyframes xp-logo-glow {
          0%,100% { filter: drop-shadow(0 0 25px rgba(0,210,255,0.3)) drop-shadow(0 0 50px rgba(192,192,192,0.1)); }
          50% { filter: drop-shadow(0 0 40px rgba(0,210,255,0.5)) drop-shadow(0 0 80px rgba(192,192,192,0.2)); }
        }
        @keyframes xp-btn-glow {
          0%,100% { box-shadow: inset 0 0 20px rgba(0,210,255,0.08), 0 0 15px rgba(192,192,192,0.08); }
          50% { box-shadow: inset 0 0 30px rgba(0,210,255,0.15), 0 0 25px rgba(192,192,192,0.12), 0 0 50px rgba(0,210,255,0.05); }
        }

        .xp-section {
          min-height: 100vh;
          background: #020617;
          display: flex; align-items: flex-start; justify-content: center;
          position: relative; overflow: clip;
          padding: clamp(4.5rem, 8vw, 5.5rem) 0 3rem; box-sizing: border-box;
          font-family: 'Exo 2', sans-serif;
        }

        .xp-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%);
        }

        .xp-title {
          font-family: 'Orbitron', monospace; font-weight: 900;
          font-size: clamp(2.2rem, 8vw, 7rem);
          line-height: .95; letter-spacing: -.01em;
          white-space: nowrap; position: relative;
        }
        .xp-title-green {
          background: linear-gradient(135deg, #00D2FF 0%, #0891b2 30%, #00D2FF 55%, #0891b2 80%, #06b6d4 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; color: transparent;
          animation: xp-shimmer 5s linear infinite;
        }
        .xp-title-silver {
          background: linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 30%, #d8d8d8 55%, #a8a8a8 80%, #e0e0e0 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; color: transparent;
          animation: xp-shimmer 6s linear infinite 0.5s;
        }
        @media(max-width:600px){ .xp-title{ font-size:clamp(1.6rem,9.5vw,3rem); } }
        @media(max-width:380px){ .xp-title{ font-size:clamp(1.3rem,9vw,2.2rem); } }

        /* Subtitle — gold */
        .xp-subtitle {
          font-family: 'Orbitron', monospace; font-weight: 400;
          font-size: clamp(.55rem, 1.4vw, .85rem);
          letter-spacing: .35em; text-transform: uppercase;
          color: #FFD700; opacity: .85;
        }

        /* Stat card — dark charcoal + silver outer glow */
        .xp-stat {
          background: linear-gradient(145deg, #0f172a 0%, #0c1222 50%, #0f172a 100%);
          border: 1px solid rgba(0,210,255,0.08);
          border-radius: 12px; backdrop-filter: blur(16px);
          padding: clamp(.75rem,2vw,1.25rem);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: all .3s; position: relative; overflow: hidden;
          box-shadow: 0 0 20px rgba(0,210,255,0.04), 0 4px 20px rgba(0,0,0,0.3);
        }
        .xp-stat::before {
          content:''; position:absolute; top:0; left:10%; right:10%; height:1px;
          background: linear-gradient(90deg,transparent,rgba(192,192,192,0.25),transparent);
          opacity:0; transition:opacity .3s;
        }
        .xp-stat:hover { border-color:rgba(0,210,255,0.2); transform:translateY(-4px); box-shadow: 0 0 30px rgba(0,210,255,0.08), 0 8px 30px rgba(0,0,0,0.4); }
        .xp-stat:hover::before { opacity:1; }

        .xp-btnwrap { position:relative; border-radius:8px; padding:2px; display:inline-block; }
        .xp-btnwrap::before {
          content:''; position:absolute; inset:-1px; border-radius:8px;
          background: conic-gradient(from var(--ga),transparent 0deg,rgba(0,210,255,0.5) 60deg,rgba(192,192,192,0.4) 90deg,transparent 130deg);
          animation: ga-spin 2.5s linear infinite;
        }
        .xp-btnwrap::after {
          content:''; position:absolute; inset:-3px; border-radius:8px;
          background: conic-gradient(from var(--ga),transparent 0deg,rgba(0,210,255,0.2) 60deg,transparent 130deg);
          animation: ga-spin 2.5s linear infinite; filter:blur(6px);
        }

        /* Main btn — charcoal + inner cyan glow + white text */
        .xp-btn-main {
          position:relative; z-index:1; border:none; cursor:pointer;
          background: linear-gradient(135deg, #1a1d23, #252a32, #1a1d23);
          color: #ffffff; font-family:'Orbitron',monospace; font-weight:700;
          font-size:clamp(.58rem,1.2vw,.72rem); letter-spacing:.18em; text-transform:uppercase;
          border-radius:7px; padding:clamp(11px,1.8vw,15px) clamp(18px,4vw,36px);
          transition:all .3s; animation: xp-btn-glow 3s ease-in-out infinite;
        }
        .xp-btn-main:hover { filter:brightness(1.2); transform:scale(1.04); }

        /* Login — pure silver */
        .xp-btn-sec {
          position:relative; z-index:1; border:none; cursor:pointer;
          background: rgba(10,10,15,0.9); color: #c0c0c0;
          font-family:'Orbitron',monospace; font-weight:700;
          font-size:clamp(.58rem,1.2vw,.72rem); letter-spacing:.18em; text-transform:uppercase;
          border-radius:7px; padding:clamp(11px,1.8vw,15px) clamp(18px,4vw,36px);
          transition:all .3s;
        }
        .xp-btn-sec:hover { background:rgba(0,210,255,0.08); color:#e8e8e8; }
        .xp-btnwrap-sec::before {
          background: conic-gradient(from var(--ga),transparent 0deg,rgba(192,192,192,0.35) 60deg,rgba(0,210,255,0.25) 90deg,transparent 130deg);
          animation-delay:-1s;
        }
        .xp-btnwrap-sec::after { animation-delay:-1s; }

        .xp-divider { width:80px; height:2px; background: linear-gradient(90deg,transparent,#00D2FF,#c0c0c0,transparent); }

        .xp-badge {
          display:inline-flex; align-items:center; gap:10px;
          padding:7px 18px 7px 10px; border-radius:8px;
          background:rgba(0,210,255,0.05); border:1px solid rgba(0,210,255,0.15);
          backdrop-filter:blur(10px);
        }

        .xp-scan {
          position:absolute; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(0,210,255,0.3),transparent);
          animation:xp-scan 4s ease-in-out infinite; pointer-events:none;
        }
      `}</style>

      {/* Cursor */}
      {!isMobile && (
        <motion.div style={{
          x:springX, y:springY, position:"fixed", width:32, height:32,
          border:"1.5px solid rgba(0,210,255,0.5)",
          borderRadius:"50%", pointerEvents:"none", zIndex:9999,
          boxShadow:"0 0 8px rgba(0,210,255,0.2)",
        }} />
      )}

      <section className="xp-section">
        {/* Background image */}
        <div style={{position:"absolute",inset:0,backgroundImage:"url(/bg.jpg)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",opacity:0.35,pointerEvents:"none"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(2,6,23,0.6) 0%, rgba(2,6,23,0.3) 50%, rgba(2,6,23,0.7) 100%)",pointerEvents:"none"}} />
        <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.45,pointerEvents:"none"}} />
        <div className="xp-grid" />

        {/* Orbs */}
        <div style={{position:"absolute",top:"-8%",right:"-5%",width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,210,255,0.06) 0%,transparent 70%)",animation:"xp-orb1 14s ease-in-out infinite",pointerEvents:"none"}} />
        <div style={{position:"absolute",bottom:"-5%",left:"-5%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(192,192,192,0.04) 0%,transparent 70%)",animation:"xp-orb2 17s ease-in-out infinite",pointerEvents:"none"}} />
        <div style={{position:"absolute",top:"35%",left:"55%",width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,210,255,0.04) 0%,transparent 70%)",animation:"xp-orb1 20s ease-in-out infinite reverse",pointerEvents:"none"}} />

        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 clamp(1rem,4vw,2rem)",position:"relative",zIndex:2,width:"100%"}}>
          <motion.div variants={stagger} initial="hidden" animate="visible"
            style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"clamp(.9rem,2vw,1.4rem)"}}>

            {/* Robot badge — silver metallic + cyan outline */}
            <motion.div variants={fadeUp}>
              <div className="xp-badge">
                <div style={{width:34,height:34,borderRadius:8,flexShrink:0,background:"rgba(192,192,192,0.06)",border:"1px solid rgba(0,210,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg viewBox="0 0 32 40" width="20" height="26">
                    <rect x="6" y="6" width="20" height="16" rx="4" fill="none" stroke="#c0c0c0" strokeWidth="1.5"/>
                    <circle cx="11" cy="13" r="2.5" fill="#c0c0c0"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
                    <circle cx="21" cy="13" r="2.5" fill="#c0c0c0"><animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.3s" repeatCount="indefinite"/></circle>
                    <rect x="10" y="18" width="12" height="2.5" rx="1.25" fill="none" stroke="#00D2FF" strokeWidth="1" opacity="0.6"/>
                    <rect x="4" y="25" width="24" height="12" rx="4" fill="none" stroke="#c0c0c0" strokeWidth="1.5"/>
                    <line x1="16" y1="4" x2="16" y2="6" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="16" cy="3" r="1.8" fill="#00D2FF" opacity="0.7"><animate attributeName="r" values="1.8;2.8;1.8" dur="1.4s" repeatCount="indefinite"/></circle>
                  </svg>
                </div>
                <div style={{textAlign:"left"}}>
                  <p style={{fontSize:".72rem",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:"#fff",lineHeight:1,margin:0,fontFamily:"'Orbitron',monospace"}}>AIQuantumCrypto</p>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginTop:4}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:"#FFD700",boxShadow:"0 0 6px #FFD700",display:"inline-block",animation:"xp-pulse 2s ease-in-out infinite"}} />
                    <span style={{fontSize:".58rem",letterSpacing:".12em",textTransform:"uppercase",fontWeight:700,color:"#ffffff",fontFamily:"'Exo 2',sans-serif"}}>AI Trading Bot — Live</span>
                  </div>
                </div>
              </div>
            </motion.div>



            {/* Title with ghost logo halo behind */}
            <motion.div variants={fadeUp} style={{width:"100%",position:"relative"}}>
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"clamp(200px,40vw,400px)",height:"clamp(100px,20vw,200px)",backgroundImage:"url(/xprof-logo.png)",backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",opacity:0.06,filter:"blur(8px)",pointerEvents:"none"}} />
              <h1 className="xp-title"><span className="xp-title-green">AIQUANTUM</span>
              <br /><span className="xp-title-silver">CRYPTO</span></h1>
              <p className="xp-subtitle" style={{marginTop:10}}>AI-Powered Automated Trading System</p>
              <div className="xp-divider" style={{margin:"12px auto 0"}} />
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} style={{maxWidth:560,fontSize:"clamp(.85rem,1.8vw,1rem)",color:"#ffffff",lineHeight:1.85,fontFamily:"'Exo 2',sans-serif",letterSpacing:".03em",padding:"0 .5rem"}}>
              Harness the power of <span style={{color:"#00D2FF",fontWeight:700}}>AI-driven algorithms</span> to execute
              high-precision trades automatically — 24/7, with{" "}
              <span style={{color:"#FFD700",fontWeight:700}}>consistent daily profits</span> and{" "}
              <span style={{color:"#c0c0c0",fontWeight:700}}>zero manual effort</span>.
            </motion.p>

            {/* Stats — gold numbers, silver labels */}
            <motion.div variants={fadeUp} style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"clamp(.5rem,1.5vw,1rem)",width:"100%",maxWidth:600}}>
              {[
                {val:"24100",prefix:"",suffix:"+",label:"Active Traders"},
                {val:"99.8",prefix:"",suffix:"%",label:"Uptime",decimals:1},
                {val:"5.2",prefix:"$",suffix:"M",label:"Daily Volume",decimals:1},
              ].map((s,i)=>(
                <div key={i} className="xp-stat">
                  <span style={{fontFamily:"'Orbitron',monospace",fontWeight:900,fontSize:"clamp(1.1rem,3.5vw,1.7rem)",background:"linear-gradient(135deg, #FFD700, #f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",display:"block",marginBottom:4,lineHeight:1}}>
                    <Counter target={s.val} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals||0}/>
                  </span>
                  <span style={{fontSize:"clamp(.5rem,.85vw,.62rem)",letterSpacing:".16em",textTransform:"uppercase",color:"#ffffff",fontFamily:"'Exo 2',sans-serif",fontWeight:700}}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA — charcoal btn white text + silver login */}
            <motion.div variants={fadeUp} style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"clamp(.75rem,2vw,1.5rem)",marginTop:".5rem"}}>
              <div className="xp-btnwrap">
                <button className="xp-btn-main" onClick={()=>navigate("/register")}>Start Trading Now</button>
              </div>
              <div className="xp-btnwrap xp-btnwrap-sec">
                <button className="xp-btn-sec" onClick={()=>navigate("/login")}>Login</button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
