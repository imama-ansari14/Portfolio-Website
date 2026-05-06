import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PHRASES = [
  "BETTER EXECUTION",
  "BOLD DESIGN",
  "WILD CREATIVITY",
  "REAL PERFORMANCE",
  "ZERO COMPROMISE",
];

const Hero = () => {
  const container = useRef();
  const typeRef = useRef();
  const cursorRef = useRef();
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timerRef = useRef(null);

  /* ── Typewriter ── */
  useEffect(() => {
    const el = typeRef.current;
    if (!el) return;

    const SPEED_TYPE = 55;
    const SPEED_DELETE = 28;
    const PAUSE_AFTER = 2200;

    const tick = () => {
      const phrase = PHRASES[phraseIndex.current];

      if (!isDeleting.current) {
        charIndex.current++;
        el.textContent = phrase.slice(0, charIndex.current);
        if (charIndex.current === phrase.length) {
          isDeleting.current = true;
          timerRef.current = setTimeout(tick, PAUSE_AFTER);
          return;
        }
        timerRef.current = setTimeout(tick, SPEED_TYPE);
      } else {
        charIndex.current--;
        el.textContent = phrase.slice(0, charIndex.current);
        if (charIndex.current === 0) {
          isDeleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
        }
        timerRef.current = setTimeout(tick, SPEED_DELETE);
      }
    };

    timerRef.current = setTimeout(tick, 800);
    return () => clearTimeout(timerRef.current);
  }, []);

  /* ── GSAP Animations ── */
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-kicker", { y: 24, opacity: 0, duration: 0.8 })
        .from(
          ".hero-h-line",
          { y: 80, opacity: 0, stagger: 0.12, duration: 1 },
          "-=0.4"
        )
        .from(".hero-type-row", { y: 60, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-cta-wrap", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(
          ".glow-blob",
          {
            scale: 0.4,
            opacity: 0,
            stagger: 0.2,
            duration: 2,
            ease: "power2.out",
          },
          0
        )
        .from(".hero-grid", { opacity: 0, duration: 2 }, 0);

      // Floating Blobs
      gsap.to(".glow-blob-1", {
        x: 30,
        y: -20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".glow-blob-2", {
        x: -25,
        y: 30,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
      gsap.to(".glow-blob-3", {
        x: 15,
        y: 25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Cursor Blink
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      // Scroll Indicator
      gsap.to(".scroll-arrow", {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    },
    { scope: container }
  );

  const handlePrimaryHover = (e) =>
    gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25 });
  const handlePrimaryLeave = (e) =>
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25 });

  return (
    <section
      ref={container}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0f0a0d]"
    >
      {/* Grid Overlay */}
      <div
        className="hero-grid absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#512b4214 1px, transparent 1px), linear-gradient(90deg, #512b4214 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Decorative Blobs */}
      <div
        className="glow-blob glow-blob-1 absolute rounded-full w-[300px] h-[300px] md:w-[520px] md:h-[520px] -left-20 top-1/2 -translate-y-1/2 bg-radial-gradient from-[#512b4260] via-[#512b4222] to-transparent blur-[40px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #512b4260 0%, #512b4222 45%, transparent 75%)",
        }}
      />
      <div
        className="glow-blob glow-blob-2 absolute rounded-full w-[250px] h-[250px] md:w-[440px] md:h-[440px] -right-10 -bottom-10 bg-radial-gradient from-[#7c4c7548] via-[#7c4c7518] to-transparent blur-[50px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #7c4c7548 0%, #7c4c7518 45%, transparent 75%)",
        }}
      />
      <div
        className="glow-blob glow-blob-3 absolute rounded-full w-[200px] h-[200px] md:w-[300px] md:h-[300px] right-[10%] top-[-20px] bg-radial-gradient from-[#cf9cc822] to-transparent blur-[30px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #cf9cc822 0%, transparent 70%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
        {/* Kicker */}
        <div className="hero-kicker flex items-center gap-3 mb-6 md:mb-8 overflow-hidden">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#512b42]" />
          <span className="text-[10px] tracking-[0.45em] text-[#7c4c75] uppercase font-semibold font-['Syne']">
            Mern Stack Developer | Designer
          </span>
          <div className="w-8 h-[1px] bg-gradient-to-r from-[#512b42] to-transparent" />
        </div>

        {/* Main Headline */}
        <div className="overflow-hidden mb-1">
          <h1 className="hero-h-line text-[38px] sm:text-[52px] md:text-[72px] lg:text-[84px] font-extrabold uppercase text-white leading-[0.95] tracking-tight font-['Syne']">
            YOUR IDEA DESERVES
          </h1>
        </div>

        {/* Typewriter Row */}
        <div className="hero-type-row flex items-center justify-center min-h-[50px] md:min-h-[90px] mb-6 md:mb-8 text-[38px] sm:text-[52px] md:text-[72px] lg:text-[84px] font-extrabold uppercase leading-[0.95] tracking-tight font-['Syne']">
          <span
            ref={typeRef}
            className="bg-gradient-to-br from-[#cf9cc8] to-[#7c4c75] bg-clip-text text-transparent"
          />
          <span
            ref={cursorRef}
            className="inline-block w-1 md:w-[6px] h-[34px] sm:h-[48px] md:h-[64px] bg-[#cf9cc8] ml-2 rounded-sm"
          />
        </div>

        {/* Subtext */}
        <p className="hero-sub text-[13px] md:text-[14px] text-white/40 font-sans tracking-wide leading-relaxed max-w-[90%] md:max-w-[460px] mb-10">
          I craft unconventional digital experiences. No templates. No boring.
          Just fast, wild, conversion-focused websites.
        </p>

        {/* CTAs */}
        <div className="hero-cta-wrap flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onMouseEnter={handlePrimaryHover}
            onMouseLeave={handlePrimaryLeave}
            className="w-full sm:w-auto bg-gradient-to-br from-[#512b42] to-[#7c4c75] text-white px-8 py-4 rounded-lg text-[11px] tracking-[0.22em] font-bold uppercase font-['Syne'] cursor-pointer transition-transform"
          >
            VIEW PROJECTS
          </button>

          <button
            onMouseEnter={handlePrimaryHover}
            onMouseLeave={handlePrimaryLeave}
            className="w-full sm:w-auto bg-transparent text-[#cf9cc8] border border-[#7c4c7580] px-8 py-4 rounded-lg text-[11px] tracking-[0.22em] font-bold uppercase font-['Syne'] cursor-pointer transition-transform"
          >
            CONTACT ME
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[8px] tracking-[0.35em] text-[#512b42] uppercase font-sans">
          SCROLL
        </span>
        <div className="scroll-arrow w-[1px] h-8 bg-gradient-to-b from-[#512b42] to-transparent" />
      </div>

      {/* Corner Accents */}
      {[
        { top: "top-6", left: "left-6", border: "border-t border-l" },
        { top: "top-6", right: "right-6", border: "border-t border-r" },
        { bottom: "bottom-6", left: "left-6", border: "border-b border-l" },
        { bottom: "bottom-6", right: "right-6", border: "border-b border-r" },
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute w-7 h-7 border-[#512b4266] ${pos.top} ${pos.bottom} ${pos.left} ${pos.right} ${pos.border}`}
        />
      ))}
    </section>
  );
};

export default Hero;
