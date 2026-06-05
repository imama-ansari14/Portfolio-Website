import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// Replace with your actual certificate imports
import cert1 from "../assets/Certificates/Cisco-HTML.PNG";
import cert2 from "../assets/Certificates/Modern-AI.png";
// import cert3 from "../assets/certificate-3.png";

const certificates = [
  {
    image: cert1,
    title: "Full Stack Web Development",
    issuer: "Coursera",
    date: "Mar 2024",
    credentialId: "CERT-2024-FSW",
  },
  {
    image: cert2,
    title: "UI/UX Design Principles",
    issuer: "Google",
    date: "Jan 2024",
    credentialId: "GGL-UX-2024",
  },
  // duplicate for demo — remove if you have more real certs
  {
    image: cert1,
    title: "HTML & CSS Fundamentals",
    issuer: "Cisco",
    date: "Dec 2023",
    credentialId: "CISCO-HTML-2023",
  },
  {
    image: cert2,
    title: "Modern AI Essentials",
    issuer: "DeepLearning.AI",
    date: "Feb 2024",
    credentialId: "DLAI-MOD-AI-24",
  },
  {
    image: cert1,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Oct 2023",
    credentialId: "FCC-RWD-2023",
  },
];

const AUTOPLAY_DELAY = 3000;
const CARD_GAP = 24; // px gap between cards

export default function CertificatesSection() {
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const autoplayRef = useRef(null);
  const animRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Drag state
  const dragState = useRef({ active: false, startX: 0, startOffset: 0, currentOffset: 0 });

  const total = certificates.length;

  // ── Calculate card width based on container (show ~3 cards) ──
  const calcCardWidth = useCallback(() => {
    if (!trackRef.current?.parentElement) return;
    const cw = trackRef.current.parentElement.clientWidth;
    setContainerWidth(cw);
    // on mobile: 1 card, tablet: 2, desktop: 3
    const visibleCount = cw < 600 ? 1 : cw < 960 ? 2 : 3;
    setCardWidth((cw - CARD_GAP * (visibleCount - 1)) / visibleCount);
  }, []);

  useEffect(() => {
    calcCardWidth();
    const ro = new ResizeObserver(calcCardWidth);
    if (trackRef.current?.parentElement) ro.observe(trackRef.current.parentElement);
    return () => ro.disconnect();
  }, [calcCardWidth]);

  // ── Animate track to index ──
  const slideTo = useCallback((index, instant = false) => {
    if (!trackRef.current || !cardWidth) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    const offset = -(clamped * (cardWidth + CARD_GAP));
    if (animRef.current) animRef.current.kill();
    animRef.current = gsap.to(trackRef.current, {
      x: offset,
      duration: instant ? 0 : 0.55,
      ease: "power3.out",
    });
    setCurrentIndex(clamped);
  }, [cardWidth, total]);

  // ── Auto-advance ──
  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1 >= total ? 0 : prev + 1;
        slideTo(next);
        return next;
      });
    }, AUTOPLAY_DELAY);
  }, [slideTo, total]);

  useEffect(() => {
    if (!isPaused && cardWidth) startAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, cardWidth, startAutoplay]);

  // ── Progress bar ──
  useEffect(() => {
    if (!progressRef.current || isPaused) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: AUTOPLAY_DELAY / 1000, ease: "linear", transformOrigin: "left center" }
    );
  }, [currentIndex, isPaused]);

  // ── Entrance animations ──
  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );
    gsap.fromTo(trackRef.current,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );
  }, []);

  // ── Pointer (drag) handlers ──
  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    clearInterval(autoplayRef.current);
    if (animRef.current) animRef.current.kill();
    const currentX = gsap.getProperty(trackRef.current, "x");
    dragState.current = {
      active: true,
      startX: e.clientX,
      startOffset: currentX,
      currentOffset: currentX,
    };
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    const newX = dragState.current.startOffset + dx;
    dragState.current.currentOffset = newX;
    gsap.set(trackRef.current, { x: newX });
  };

  const onPointerUp = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    const dx = e.clientX - dragState.current.startX;
    const threshold = cardWidth * 0.25;

    let next = currentIndex;
    if (dx < -threshold) next = Math.min(currentIndex + 1, total - 1);
    else if (dx > threshold) next = Math.max(currentIndex - 1, 0);

    slideTo(next);
    if (!isPaused) startAutoplay();
  };

  const goTo = (i) => {
    slideTo(i);
    if (!isPaused) {
      clearInterval(autoplayRef.current);
      startAutoplay();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative py-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-[#7c4c75]/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-[#512b42]/25 blur-[90px]" />

      <div className="relative max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-12 text-center" style={{ opacity: 0 }}>
          <p className="text-[#cf9cc8] font-['DM_Sans'] text-xs tracking-[0.35em] uppercase mb-3">
            Credentials
          </p>
          <h2
            className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Certificates & Achievements
          </h2>
        </div>

        {/* Slider viewport — overflow hidden */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); startAutoplay(); }}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex"
            style={{
              gap: `${CARD_GAP}px`,
              cursor: dragState.current.active ? "grabbing" : "grab",
              userSelect: "none",
              willChange: "transform",
              opacity: 0,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden relative group"
                style={{
                  width: cardWidth || "calc(33.333% - 16px)",
                  border: "1px solid rgba(207,156,200,0.15)",
                  background: "rgba(124,76,117,0.06)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(207,156,200,0.4)";
                  e.currentTarget.style.boxShadow = "0 0 40px rgba(124,76,117,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(207,156,200,0.15)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Certificate image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ pointerEvents: "none" }}
                  />
                </div>

                {/* Info bar below image */}
                <div
                  className="p-4 md:p-5"
                  style={{ background: "rgba(15,10,13,0.7)", backdropFilter: "blur(10px)" }}
                >
                  {/* Badge */}
                  <span
                    className="inline-block font-['DM_Sans'] text-[9px] tracking-[2px] uppercase px-3 py-1 rounded-full border mb-3"
                    style={{
                      color: "var(--lavender)",
                      borderColor: "rgba(207,156,200,0.25)",
                      background: "rgba(81,43,66,0.55)",
                      fontFamily: "var(--font-dm)",
                    }}
                  >
                    {cert.issuer} · {cert.date}
                  </span>

                  <h3
                    className="font-['Syne'] text-white text-sm md:text-base font-bold leading-snug mb-1"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {cert.title}
                  </h3>

                  <p
                    className="font-['DM_Sans'] text-[10px] tracking-widest"
                    style={{ color: "rgba(124,76,117,0.8)", fontFamily: "var(--font-dm)" }}
                  >
                    {cert.credentialId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="h-[2px] w-full mt-6 rounded-full overflow-hidden"
          style={{ background: "rgba(81,43,66,0.35)" }}
        >
          <div
            ref={progressRef}
            className="h-full w-full"
            style={{
              background: "linear-gradient(90deg, var(--orchid), var(--lavender))",
              transform: "scaleX(0)",
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Prev */}
          <button
            onClick={() => goTo(Math.max(currentIndex - 1, 0))}
            aria-label="Previous"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200"
            style={{
              borderColor: "rgba(207,156,200,0.25)",
              background: "rgba(15,10,13,0.5)",
              color: "var(--lavender)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--deep-plum)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15,10,13,0.5)"}
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === currentIndex ? "28px" : "8px",
                  background: i === currentIndex ? "var(--lavender)" : "rgba(124,76,117,0.4)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(Math.min(currentIndex + 1, total - 1))}
            aria-label="Next"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200"
            style={{
              borderColor: "rgba(207,156,200,0.25)",
              background: "rgba(15,10,13,0.5)",
              color: "var(--lavender)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--deep-plum)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15,10,13,0.5)"}
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}