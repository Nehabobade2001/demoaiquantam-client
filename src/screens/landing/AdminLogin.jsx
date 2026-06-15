import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import { MainContent } from "../../constants/mainContent";
import {
  AuthenticatedUserRouters,
  LandingRouters,
} from "../../constants/routes";
import { loginUser } from "../../redux/slices/authSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import { toast } from "react-toastify";
import { adminLogin } from "../../api/admin.api";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await adminLogin(payload);
      if (response?.success) {
        await dispatch(
          loginUser({
            token: response?.token,
            userId: response?.data?._id,
            role: response?.data?.role,
            data: response?.data,
          })
        );
        localStorage.setItem("adminId", response?.data?._id);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome to Admin Dashboard",
          timer: 2500,
          showConfirmButton: false,
        }).then(() => navigate(AuthenticatedUserRouters.DASHBOARD));
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e, field) => {
    setPayload({ ...payload, [field]: e.target.value });
  };

  return (
    <>
      <style>{`
        @keyframes adm-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes adm-glow-breathe {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes adm-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes adm-pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.08); opacity: 0.05; }
        }
        @keyframes adm-scan {
          0% { top: -2px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes adm-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes adm-btn-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,255,159,0.2), 0 0 40px rgba(0,255,159,0.06); }
          50% { box-shadow: 0 0 30px rgba(0,255,159,0.4), 0 0 60px rgba(0,255,159,0.12); }
        }
        @keyframes adm-node-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.4); }
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#000" }}>

        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url(/bg1.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)" }} />

        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 30% 40%, rgba(0,255,159,0.05) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 40% at 70% 60%, rgba(0,255,159,0.04) 0%, transparent 65%)", animation: "adm-glow-breathe 8s ease-in-out infinite" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(rgba(0,255,159,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,159,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 20%, transparent 100%)",
        }} />

        {/* Floating dots */}
        {[
          { top: "12%", left: "10%", d: "0s", s: 3 },
          { top: "25%", right: "15%", d: "1s", s: 4 },
          { top: "60%", left: "8%", d: "2s", s: 3 },
          { top: "80%", right: "10%", d: "0.5s", s: 4 },
          { top: "45%", left: "85%", d: "1.5s", s: 3 },
        ].map((dot, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            top: dot.top, left: dot.left, right: dot.right,
            width: dot.s, height: dot.s, background: "#00ff9f",
            boxShadow: `0 0 ${dot.s * 3}px rgba(0,255,159,0.5)`,
            animation: `adm-node-pulse 3.5s ease-in-out infinite ${dot.d}`,
          }} />
        ))}

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-[1px] pointer-events-none z-[1]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,159,0.08), transparent)", animation: "adm-scan 10s linear infinite" }} />


        {/* ═══════ CONTENT ═══════ */}
        <div className="relative z-10 w-full max-w-6xl flex items-center justify-between gap-14 px-6">

          {/* ── Left: Login Card ── */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden" style={{
              background: "linear-gradient(rgba(0,10,5,0.6), rgba(0,10,5,0.6)) padding-box, linear-gradient(135deg, rgba(34,197,94,0.12), rgba(163,230,53,0.12)) border-box",
              border: "1px solid transparent",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,159,0.04)",
            }}>
              {/* Top edge glow */}
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,159,0.3), transparent)" }} />

              <div className="p-8 md:p-10">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
                      background: "linear-gradient(rgba(0,255,159,0.04), rgba(0,255,159,0.04)) padding-box, linear-gradient(135deg, rgba(34,197,94,0.15), rgba(163,230,53,0.15)) border-box",
                    }}>
                      <img src={MainContent.appLogo} alt="Logo" className="w-32 h-24 object-contain" style={{ filter: "drop-shadow(0 0 10px rgba(0,255,159,0.3))" }} />
                    </div>
                   
                  </div>
                </div>

                {/* Badge */}
                <div className="flex justify-center mb-5">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{
                    background: "linear-gradient(rgba(0,255,159,0.04), rgba(0,255,159,0.04)) padding-box, linear-gradient(135deg, rgba(34,197,94,0.15), rgba(163,230,53,0.15)) border-box",
                    border: "1px solid transparent",
                  }}>
                    <Shield size={13} style={{ color: "#00ff9f" }} />
                    <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Orbitron', monospace", background: "linear-gradient(135deg, #22c55e, #a3e635)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      Secure Admin Access
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                  <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 800, marginBottom: 8 }}>
                    <span className="text-white">Admin </span>
                    <span style={{ background: "linear-gradient(135deg, #22c55e, #a3e635)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "adm-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,255,163,0.4))" }}>Portal</span>
                  </h1>
                  <p className="text-sm" style={{ color: "#ffffff" }}>Sign in to manage the platform</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="text-xs tracking-wider uppercase font-semibold mb-2 block" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Orbitron', monospace" }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: focusedField === "email" ? "#00ff9f" : "rgba(255,255,255,0.25)" }} />
                      <input
                        type="email"
                        placeholder="admin@example.com"
                        className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300"
                        style={{
                          background: "rgba(0,255,159,0.02)",
                          border: focusedField === "email" ? "1px solid rgba(0,255,159,0.3)" : "1px solid rgba(255,255,255,0.06)",
                          boxShadow: focusedField === "email" ? "0 0 20px rgba(0,255,159,0.06)" : "none",
                        }}
                        value={payload.email}
                        onChange={(e) => handleChange(e, "email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs tracking-wider uppercase font-semibold mb-2 block" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Orbitron', monospace" }}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: focusedField === "password" ? "#00ff9f" : "rgba(255,255,255,0.25)" }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="w-full rounded-xl py-3.5 pl-11 pr-16 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300"
                        style={{
                          background: "rgba(0,255,159,0.02)",
                          border: focusedField === "password" ? "1px solid rgba(0,255,159,0.3)" : "1px solid rgba(255,255,255,0.06)",
                          boxShadow: focusedField === "password" ? "0 0 20px rgba(0,255,159,0.06)" : "none",
                        }}
                        value={payload.password}
                        onChange={(e) => handleChange(e, "password")}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] tracking-wider uppercase font-bold cursor-pointer transition-colors duration-200"
                        style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Orbitron', monospace" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#00ff9f"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      background: "linear-gradient(135deg, #22c55e, #a3e635)",
                      color: "#000",
                      animation: "adm-btn-glow 3s ease-in-out infinite",
                      marginTop: 8,
                    }}
                  >
                    Sign In
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00ff9f", boxShadow: "0 0 4px #00ff9f" }} />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Enterprise-grade security enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Illustration ── */}
          <div className="hidden lg:flex flex-col items-center w-1/2 space-y-8">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,255,159,0.08) 0%, rgba(0,255,159,0.02) 40%, transparent 70%)", filter: "blur(40px)" }} />

              {/* Pulse rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full pointer-events-none" style={{ background: "linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, rgba(34,197,94,0.08), rgba(163,230,53,0.08)) border-box", border: "1px solid transparent", animation: "adm-pulse-ring 5s ease-in-out infinite" }} />

              <img
                src={MainContent.appLogo}
                alt="Illustration"
                className="relative z-10 w-full max-w-sm object-contain"
                style={{ animation: "adm-float 5s ease-in-out infinite", filter: "drop-shadow(0 0 30px rgba(0,255,159,0.2)) drop-shadow(0 0 60px rgba(0,255,159,0.08))" }}
              />
            </div>

            <div className="text-center max-w-md">
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 800, marginBottom: 8 }}>
                <span className="text-white">Control & </span>
                <span style={{ background: "linear-gradient(135deg, #22c55e, #a3e635)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto", animation: "adm-shimmer 4s linear infinite", filter: "drop-shadow(0 0 30px rgba(0,255,163,0.4))" }}>Monitor</span>
              </h2>
              <p className="text-sm" style={{ color: "#ffffff" }}>
                Powerful admin tools to manage and scale your platform securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
