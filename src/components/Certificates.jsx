import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Replace these with your actual images from /src/assets
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
  // {
  //   image: cert3,
  //   title: "AWS Cloud Practitioner",
  //   issuer: "Amazon Web Services",
  //   date: "Nov 2023",
  //   credentialId: "AWS-CLF-C02",
  // },
];

const AUTOPLAY_DELAY = 4000; // 4 seconds

export default function CertificatesSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const headingRef = useRef(null);
  const progressRef = useRef(null);
  const autoplayRef = useRef(null);

  const total = certificates.length;

  const goTo = (index) => {
    const next = (index + total) % total;
    if (next === active) return;
    setActive(next);
  };

  const nextSlide = () => goTo(active + 1);
  const prevSlide = () => goTo(active - 1);

  // Animate slide change
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 0.96, x: 24 },
          { autoAlpha: 1, scale: 1, x: 0, duration: 0.7, ease: "power3.out" }
        );
      } else {
        gsap.to(el, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      }
    });
  }, [active]);

  // Entrance animation on mount / scroll into view
  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
    gsap.fromTo(
      sectionRef.current.querySelector(".cert-slider"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: "power3.out" }
    );
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    autoplayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, total]);

  // Progress bar animation (resets every time `active` changes)
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTOPLAY_DELAY / 1000,
        ease: "linear",
        transformOrigin: "left center",
      }
    );
    if (isPaused) gsap.killTweensOf(progressRef.current);
  }, [active, isPaused]);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-[#7c4c75]/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-[#512b42]/25 blur-[90px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 text-center">
          <p
            className="font-syne uppercase text-[11px] tracking-[4px] mb-3"
            style={{ color: "var(--orchid)" }}
          >
            — Recognition
          </p>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-white">
            Certif<span style={{ color: "var(--lavender)" }}>icates</span>
          </h2>
        </div>

        {/* Slider */}
        <div
          className="cert-slider relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative rounded-2xl border overflow-hidden"
            style={{
              borderColor: "rgba(207,156,200,0.18)",
              background: "rgba(124,76,117,0.06)",
            }}
          >
            {/* Slides stack */}
            <div className="relative aspect-[16/9] md:aspect-[16/8]">
              {certificates.map((cert, i) => (
                <div
                  key={i}
                  ref={(el) => (slideRefs.current[i] = el)}
                  className="absolute inset-0"
                  style={{
                    visibility: i === active ? "visible" : "hidden",
                    opacity: i === active ? 1 : 0,
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Caption overlay */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-5 md:p-7"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,10,13,0.95) 0%, rgba(15,10,13,0.35) 60%, transparent 100%)",
                    }}
                  >
                    <span
                      className="font-syne inline-block uppercase text-[10px] tracking-[2px] px-3 py-1 rounded-full border mb-2"
                      style={{
                        color: "var(--lavender)",
                        borderColor: "rgba(207,156,200,0.3)",
                        background: "rgba(81,43,66,0.6)",
                      }}
                    >
                      {cert.issuer} · {cert.date}
                    </span>
                    <h3 className="font-syne text-white text-base md:text-xl font-bold leading-snug">
                      {cert.title}
                    </h3>
                    <p
                      className="font-syne text-[10px] tracking-[1.5px] mt-1"
                      style={{ color: "rgba(124,76,117,0.85)" }}
                    >
                      {cert.credentialId}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={prevSlide}
              aria-label="Previous certificate"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border transition-colors duration-200"
              style={{
                borderColor: "rgba(207,156,200,0.3)",
                background: "rgba(15,10,13,0.55)",
                color: "var(--lavender)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--deep-plum)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15,10,13,0.55)";
              }}
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next certificate"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border transition-colors duration-200"
              style={{
                borderColor: "rgba(207,156,200,0.3)",
                background: "rgba(15,10,13,0.55)",
                color: "var(--lavender)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--deep-plum)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15,10,13,0.55)";
              }}
            >
              →
            </button>
          </div>

          {/* Autoplay progress bar */}
          <div
            className="h-[2px] w-full mt-4 rounded-full overflow-hidden"
            style={{ background: "rgba(81,43,66,0.4)" }}
          >
            <div
              ref={progressRef}
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--orchid), var(--lavender))",
                transform: "scaleX(0)",
              }}
            />
          </div>

          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to certificate ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "28px" : "8px",
                  background:
                    i === active
                      ? "var(--lavender)"
                      : "rgba(124,76,117,0.4)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}