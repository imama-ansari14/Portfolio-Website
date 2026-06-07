import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";

import cert1 from "../assets/Certificates/Cisco-HTML.png";
import cert2 from "../assets/Certificates/Modern-AI.png";
import cert3 from "../assets/Certificates/Hackathon.jpeg";

const originalCertificates = [
  {
    image: cert1,
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    date: "Oct 2025",
  },
  {
    image: cert2,
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "March 2026",
  },
  {
    image: cert3,
    title: "FemHack-2025",
    issuer: "Saylani Mass IT Training",
    date: "Jan 2024",
  },
];

const AUTOPLAY_DELAY = 3000;
const CARD_GAP = 24;

export default function CertificatesSection() {
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const autoplayRef = useRef(null);
  const animRef = useRef(null);

  const certificates = useMemo(
    () => [
      ...originalCertificates,
      ...originalCertificates,
      ...originalCertificates,
    ],
    []
  );

  const totalOriginal = originalCertificates.length;
  // Start the slider at the middle set of clones
  const [currentIndex, setCurrentIndex] = useState(totalOriginal);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const dragState = useRef({
    active: false,
    startX: 0,
    startOffset: 0,
  });

  const calcCardWidth = useCallback(() => {
    if (!trackRef.current?.parentElement) return;
    const cw = trackRef.current.parentElement.clientWidth;
    const visibleCount = cw < 600 ? 1 : cw < 960 ? 2 : 3;
    setCardWidth((cw - CARD_GAP * (visibleCount - 1)) / visibleCount);
  }, []);

  useEffect(() => {
    calcCardWidth();
    const ro = new ResizeObserver(calcCardWidth);
    if (trackRef.current?.parentElement)
      ro.observe(trackRef.current.parentElement);
    return () => ro.disconnect();
  }, [calcCardWidth]);

  // Handle the "Infinite" snap back logic
  const slideTo = useCallback(
    (index, instant = false) => {
      if (!trackRef.current || !cardWidth) return;

      const offset = -(index * (cardWidth + CARD_GAP));

      if (animRef.current) animRef.current.kill();

      animRef.current = gsap.to(trackRef.current, {
        x: offset,
        duration: instant ? 0 : 0.6,
        ease: "power3.out",
        onComplete: () => {
          // If we reached the end set, snap to the middle set instantly
          if (index >= totalOriginal * 2) {
            slideTo(index - totalOriginal, true);
          }
          // If we dragged back too far, snap forward instantly
          else if (index < totalOriginal) {
            slideTo(index + totalOriginal, true);
          }
        },
      });
      setCurrentIndex(index);
    },
    [cardWidth, totalOriginal]
  );

  // Initialize position on first load
  useEffect(() => {
    if (cardWidth) slideTo(totalOriginal, true);
  }, [cardWidth, slideTo, totalOriginal]);

  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        slideTo(next);
        return next;
      });
    }, AUTOPLAY_DELAY);
  }, [slideTo]);

  useEffect(() => {
    if (!isPaused && cardWidth) startAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, cardWidth, startAutoplay]);

  // Progress bar logic
  useEffect(() => {
    if (!progressRef.current || isPaused) return;
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTOPLAY_DELAY / 1000,
        ease: "none",
        transformOrigin: "left",
      }
    );
  }, [currentIndex, isPaused]);

  // Entrance animations
  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );
    gsap.fromTo(
      trackRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.3 }
    );
  }, []);

  const onPointerDown = (e) => {
    clearInterval(autoplayRef.current);
    if (animRef.current) animRef.current.kill();
    dragState.current = {
      active: true,
      startX: e.clientX,
      startOffset: gsap.getProperty(trackRef.current, "x"),
    };
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    gsap.set(trackRef.current, { x: dragState.current.startOffset + dx });
  };

  const onPointerUp = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    const dx = e.clientX - dragState.current.startX;
    const threshold = cardWidth * 0.2;

    let next = currentIndex;
    if (dx < -threshold) next = currentIndex + 1;
    else if (dx > threshold) next = currentIndex - 1;

    slideTo(next);
    if (!isPaused) startAutoplay();
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative py-10 px-6 md:px-12 overflow-hidden bg-[#0f0a0d]"
    >
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-[#7c4c75]/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Syne']">
            Certificates And Achievements
          </h2>
        </div>

        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: `${CARD_GAP}px`, willChange: "transform" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden group border border-[#cf9cc8]/10 bg-[#512b42]/10 transition-all hover:border-[#cf9cc8]/40"
                style={{ width: cardWidth }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                </div>
                <div className="p-5 bg-black/40 backdrop-blur-md">
                  <span className="text-[10px] text-[#cf9cc8] uppercase tracking-widest border border-[#cf9cc8]/20 px-2 py-1 rounded-md mb-2 inline-block">
                    {cert.issuer}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1 font-['Syne']">
                    {cert.title}
                  </h3>
                  <p className="text-[#7c4c75] text-[11px] font-mono">
                    {cert.credentialId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {originalCertificates.map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i + totalOriginal)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: currentIndex % totalOriginal === i ? "32px" : "8px",
                background:
                  currentIndex % totalOriginal === i ? "#cf9cc8" : "#512b42",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
