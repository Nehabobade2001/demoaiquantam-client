const PhaseCard = ({ phase, title, points }) => {
  return (
    <div
      className="
        group relative overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-6
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_35px_100px_rgba(0,255,159,0.15)]
      "
    >
      {/* Gradient glow border */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          bg-gradient-to-br from-[#00ff9f]/20 via-transparent to-[#00cc7a]/20
          opacity-0 group-hover:opacity-100
          transition duration-500
        "
      />

      {/* Light sweep */}
      <div
        className="
          pointer-events-none absolute -left-full top-0 h-full w-full
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          group-hover:left-full
          transition-all duration-700
        "
      />

      {/* Accent dot */}
      <span
        className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full"
        style={{
          background: "#00ff9f",
          boxShadow: "0 0 14px rgba(0,255,159,0.8)",
        }}
      />

      {/* Phase */}
      <p className="text-lg tracking-widest md:text-xl font-bold uppercase mb-2"
        style={{ color: "#00ff9f" }}
      >
        {phase}
      </p>

      {/* Title */}
      <h3 className="text-md md:text-lg font-semibold"
        style={{ color: "rgba(0,255,159,0.75)" }}
      >
        {title}
      </h3>

      {/* Divider */}
      <div className="mt-3 h-px w-12"
        style={{ background: "linear-gradient(90deg, #00ff9f, transparent)" }}
      />

      {/* Points */}
      <ul className="mt-4 space-y-2 text-sm text-white/55">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span style={{ color: "#00ff9f" }}>▸</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {/* Notch */}
      <span
        className="
          absolute -bottom-3 left-10
          w-6 h-6 bg-white/5
          border-b border-r border-white/10
          rotate-45
        "
        style={{ boxShadow: "0 0 25px rgba(0,255,159,0.15)" }}
      />
    </div>
  );
};

export default PhaseCard;
