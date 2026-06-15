const FeatureCard = ({ color, title, subtitle, rotate }) => {
  return (
    <div
      className={`
        group relative
        w-full sm:w-44
        min-h-[220px] sm:h-64
        ${rotate} sm:${rotate}
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        overflow-hidden
        shadow-[0_30px_100px_rgba(0,0,0,0.65)]
        transition-all duration-500
        sm:hover:-translate-y-3 sm:hover:rotate-0
        hover:shadow-[0_45px_140px_rgba(139,92,246,0.45)]
      `}
    >
      {/* 🌌 Ambient depth glow (desktop only) */}
      <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/20 opacity-40" />

      {/* 🧠 Neural grid (desktop only) */}
      <div className="hidden sm:grid absolute inset-0 grid-cols-4 grid-rows-6 opacity-[0.08]">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="border border-white/10" />
        ))}
      </div>

      {/* 🌀 Rotating halo (desktop only) */}
      <div className="hidden sm:block absolute top-6 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full border border-purple-400/30 animate-spinSlow" />

      {/* ✨ Sparkles (desktop only) */}
      <span className="hidden sm:block absolute top-10 right-6 h-1.5 w-1.5 bg-white rounded-full opacity-70 animate-pulse" />
      <span className="hidden sm:block absolute bottom-20 left-8 h-1 w-1 bg-purple-300 rounded-full opacity-60 animate-pulse delay-300" />

      {/* 📡 Scanning dot (desktop only) */}
      <div className="hidden sm:block absolute left-2 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-400/40 to-transparent">
        <span className="absolute left-[-3px] h-2 w-2 rounded-full bg-purple-400 animate-scanDot" />
      </div>

      {/* 💠 HUD corners */}
      <span className="hidden sm:block absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
      <span className="hidden sm:block absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
      <span className="hidden sm:block absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
      <span className="hidden sm:block absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />

      {/* 🎯 Icon bubble */}
      <div
        className={`
          relative z-10 mx-auto
          mt-6 sm:mt-10
          h-14 w-14 sm:h-16 sm:w-16
          rounded-full
          ${color}
          flex items-center justify-center
          shadow-[0_0_35px_rgba(255,255,255,0.35)]
        `}
      >
        <span className="text-black text-lg sm:text-xl font-bold">
          {title.charAt(0)}
        </span>
      </div>

      {/* 🧠 Text */}
      <div className="relative z-10 mt-4 sm:mt-6 text-center px-6">
        <h3 className="text-base sm:text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="text-sm text-white/60 mt-1">
          {subtitle}
        </p>
      </div>

      {/* 📊 Bottom signal line (desktop only) */}
      <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 h-px w-20 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

      {/* 🔻 Notch (desktop only) */}
      <span
        className="
          hidden sm:block
          absolute -bottom-3 left-1/2 -translate-x-1/2
          w-6 h-6 bg-white/5
          border-b border-r border-white/10
          rotate-45
          shadow-[0_0_30px_rgba(139,92,246,0.3)]
        "
      />
    </div>
  );
};

export default FeatureCard;
