import React from "react";

const BackGround = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">

      {/* LEFT TOP CIRCLE */}
      <div
        className="
          fixed
          top-[-120px] left-[-120px]
          w-[420px]
          aspect-square
          rounded-full
          blur-[160px]
          animate-floatGlow
          will-change-transform
          pointer-events-none
        "
        style={{ background: "rgba(0,210,255,0.15)" }}
      />

      {/* RIGHT BOTTOM CIRCLE */}
      <div
        className="
          fixed
          bottom-[-120px] right-[-120px]
          w-[420px]
          aspect-square
          rounded-full
          blur-[160px]
          animate-floatGlowSlow
          will-change-transform
          pointer-events-none
        "
        style={{ background: "rgba(0,180,220,0.1)" }}
      />

    </div>
  );
};

export default BackGround;
