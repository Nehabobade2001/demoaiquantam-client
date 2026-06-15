import { useEffect } from "react";

const CursorStarTrail = () => {
  useEffect(() => {
    const container = document.createElement("div");
    container.id = "star-container";
    document.body.appendChild(container);

    const createStar = (e) => {
      const star = document.createElement("span");
      star.className = "cursor-star";

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 40 + 20;

      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;
      star.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      star.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

      container.appendChild(star);
      setTimeout(() => star.remove(), 800);
    };

    window.addEventListener("mousemove", createStar);

    return () => {
      window.removeEventListener("mousemove", createStar);
      container.remove();
    };
  }, []);

  return null;
};

export default CursorStarTrail;
