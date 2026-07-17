import { useEffect, useRef } from "react";
import gsap from "gsap";

// Elements that make the ring grow when hovered
const INTERACTIVE =
  "a, button, input, textarea, select, label, [role='button'], .cursor-pointer, .cursor-grab";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only on devices with a real mouse (skip phones/tablets)
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasMouse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Center both elements on the pointer
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    // Dot follows instantly, ring follows with a smooth lag
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;

    const onMove = (e) => {
      if (!visible) {
        visible = true;
        // jump to the first position so it doesn't fly in from the corner
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1.8, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      }
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.25 });

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Big translucent ring (lags behind) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-10 h-10 rounded-full bg-[#cf9cc8]/35 border border-[#cf9cc8]/40"
      />
      {/* Small solid dot (exact pointer position) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 rounded-full bg-[#cf9cc8] shadow-[0_0_10px_#cf9cc8]"
      />
    </>
  );
};

export default CustomCursor;