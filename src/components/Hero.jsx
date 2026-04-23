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

  /* ── GSAP entrance animations ── */
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-kicker", {
        y: 24,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-h-line",
          {
            y: 80,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          ".hero-type-row",
          {
            y: 60,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.5"
        )
        .from(
          ".hero-sub",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta-wrap",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
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
        .from(
          ".hero-grid",
          {
            opacity: 0,
            duration: 2,
          },
          0
        );

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

      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

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

  const handlePrimaryHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const handlePrimaryLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={container}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0f0a0d" }}
    >
      <div
        className="hero-grid absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#512b4214 1px, transparent 1px), linear-gradient(90deg, #512b4214 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div
        className="glow-blob glow-blob-1 absolute rounded-full pointer-events-none"
        style={{
          width: 520,
          height: 520,
          left: "-120px",
          top: "50%",
          transform: "translateY(-50%)",
          background:
            "radial-gradient(circle, #512b4260 0%, #512b4222 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="glow-blob glow-blob-2 absolute rounded-full pointer-events-none"
        style={{
          width: 440,
          height: 440,
          right: "-80px",
          bottom: "-60px",
          background:
            "radial-gradient(circle, #7c4c7548 0%, #7c4c7518 45%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="glow-blob glow-blob-3 absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          right: "20%",
          top: "-40px",
          background: "radial-gradient(circle, #cf9cc822 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 200deg at 15% 65%, #512b4230 0deg, transparent 55deg)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 20deg at 85% 25%, #7c4c7522 0deg, transparent 70deg)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
        <div
          className="hero-kicker flex items-center gap-3 mb-8"
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              width: 32,
              height: 1,
              background: "linear-gradient(90deg, transparent, #512b42)",
            }}
          />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.45em",
              color: "#7c4c75",
              textTransform: "uppercase",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
            }}
          >
            Mern Stack Developer | Designer
          </span>
          <div
            style={{
              width: 32,
              height: 1,
              background: "linear-gradient(90deg, #512b42, transparent)",
            }}
          />
        </div>

        {/* Updated static headline font */}
        <div style={{ overflow: "hidden", marginBottom: 4 }}>
          <h1
            className="hero-h-line"
            style={{
              fontSize: "clamp(44px, 7.5vw, 88px)",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#ffffff",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            YOUR IDEA DESERVES
          </h1>
        </div>

        {/* Updated typewriter row font */}
        <div
          className="hero-type-row"
          style={{
            fontSize: "clamp(44px, 7.5vw, 88px)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
            fontFamily: "'Syne', sans-serif",
            minHeight: "clamp(52px, 9vw, 100px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <span
            ref={typeRef}
            style={{
              background: "linear-gradient(135deg, #cf9cc8 0%, #7c4c75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
          <span
            ref={cursorRef}
            style={{
              display: "inline-block",
              width: 4,
              height: "clamp(38px, 6.5vw, 72px)",
              background: "#cf9cc8",
              marginLeft: 6,
              borderRadius: 2,
              flexShrink: 0,
              WebkitTextFillColor: "#cf9cc8",
            }}
          />
        </div>

        <p
          className="hero-sub"
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.38)",
            fontFamily: "sans-serif",
            letterSpacing: "0.06em",
            lineHeight: 1.7,
            maxWidth: 460,
            marginBottom: 36,
          }}
        >
          I craft unconventional digital experiences. No templates. No boring.
          Just fast, wild, conversion-focused websites.
        </p>

        <div className="hero-cta-wrap flex gap-4 items-center flex-wrap justify-center">
          <button
            onMouseEnter={handlePrimaryHover}
            onMouseLeave={handlePrimaryLeave}
            style={{
              background: "linear-gradient(135deg, #512b42 0%, #7c4c75 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "14px 34px",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              position: "relative",
              overflow: "hidden",
            }}
          >
            VIEW PROJECTS
          </button>

          <button
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25 })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { scale: 1, duration: 0.25 })
            }
            style={{
              background: "transparent",
              color: "#cf9cc8",
              border: "1px solid rgba(124, 76, 117, 0.5)",
              borderRadius: 8,
              padding: "14px 28px",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            CONTACT ME
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: "translateX(-50%)" }}
      >
        <span
          style={{
            fontSize: 8,
            letterSpacing: "0.35em",
            color: "#512b42",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          SCROLL
        </span>
        <div
          className="scroll-arrow"
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, #512b42, transparent)",
          }}
        />
      </div>

      {[
        { top: 24, left: 24, borderTop: true, borderLeft: true },
        { top: 24, right: 24, borderTop: true, borderRight: true },
        { bottom: 24, left: 24, borderBottom: true, borderLeft: true },
        { bottom: 24, right: 24, borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right,
            borderTop: pos.borderTop ? "1px solid #512b4266" : "none",
            borderBottom: pos.borderBottom ? "1px solid #512b4266" : "none",
            borderLeft: pos.borderLeft ? "1px solid #512b4266" : "none",
            borderRight: pos.borderRight ? "1px solid #512b4266" : "none",
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
