import { useEffect, useRef } from "react";

const RobotWatcher = () => {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const updateEyes = () => {
      [leftEyeRef.current, rightEyeRef.current].forEach((eye) => {
        if (!eye) return;

        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = mouse.current.x - eyeX;
        const dy = mouse.current.y - eyeY;

        const angle = Math.atan2(dy, dx);
        const maxMove = 6;

        eye.style.transform = `translate(
          ${Math.cos(angle) * maxMove}px,
          ${Math.sin(angle) * maxMove}px
        )`;
      });

      rafId.current = requestAnimationFrame(updateEyes);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(updateEyes);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="hidden md:flex robot-container">
      <div className="robot-head">
        <div className="robot-eye">
          <div className="robot-pupil" ref={leftEyeRef} />
        </div>
        <div className="robot-eye">
          <div className="robot-pupil" ref={rightEyeRef} />
        </div>
        <div className="robot-mouth" />
      </div>
    </div>
  );
};

export default RobotWatcher;
