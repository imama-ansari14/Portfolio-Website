import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Importing local assets from your src/assets/ folder
import htmlLogo from "../assets/Stack/html5.svg";
import cssLogo from "../assets/Stack/css.svg";
import jsLogo from "../assets/Stack/javascript.svg";
import tsLogo from "../assets/Stack/typescript.svg";
import reactLogo from "../assets/Stack/react.svg";
import nextLogo from "../assets/Stack/nextjs.svg";
import tailwindLogo from "../assets/Stack/tailwindcss.svg";
import bootstrapLogo from "../assets/Stack/bootstrap.svg";
import gsapLogo from "../assets/Stack/gsap.svg";
import figmaLogo from "../assets/Stack/figma.svg";
import viteLogo from "../assets/Stack/vite.svg";
import gitLogo from "../assets/Stack/git.svg";
import githubLogo from "../assets/Stack/github.svg";
import vscodeLogo from "../assets/Stack/vscode.svg";
import supabaseLogo from "../assets/Stack/supabase.svg";
import netlifyLogo from "../assets/Stack/netlify.svg";
import vercelLogo from "../assets/Stack/vercel.svg";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const techs = [
  { name: "HTML5", url: htmlLogo },
  { name: "CSS3", url: cssLogo },
  { name: "JavaScript", url: jsLogo },
  { name: "TypeScript", url: tsLogo },
  { name: "React", url: reactLogo },
  { name: "Next.js", url: nextLogo },
  { name: "Tailwind", url: tailwindLogo },
  { name: "Bootstrap", url: bootstrapLogo },
  { name: "GSAP", url: gsapLogo },
  { name: "Figma", url: figmaLogo },
  { name: "Vite", url: viteLogo },
  { name: "Git", url: gitLogo },
  { name: "GitHub", url: githubLogo },
  { name: "VS Code", url: vscodeLogo },
  { name: "Supabase", url: supabaseLogo },
  { name: "Netlify", url: netlifyLogo },
  { name: "Vercel", url: vercelLogo },
];

const TechStack = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRefs = useRef([]);

  // Split the tech list into 3 rows for the mobile marquee.
  // Each row is duplicated in the JSX below so the CSS animation
  // (translateX 0 → -50%) loops seamlessly with no visible seam.
  const marqueeRows = [
    techs.slice(0, 6),
    techs.slice(6, 12),
    techs.slice(12, 17),
  ];

  // The swirling motion-path animation now runs on tablet AND desktop
  // ("md" breakpoint, 768px+). Only small phones fall back to the
  // marquee below, since that's where the wide 1921x556 path geometry
  // stopped fitting comfortably.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Background Text Zoom
        const zoomTween = gsap.fromTo(
          textRef.current,
          { scale: 0.7, opacity: 0.1 },
          {
            scale: 1.2,
            opacity: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );

        // Motion Path Logic
        const isTablet = window.innerWidth < 1024;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${isTablet ? 300 : 500}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(imgRefs.current, {
          motionPath: {
            path: "#img-path",
            align: "#img-path",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          stagger: 0.18,
          duration: 5,
          ease: "power1.inOut",
        });

        return () => {
          zoomTween.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden md:min-h-screen py-20 md:py-0"
    >
      {/* ── Small mobile only: auto-scrolling marquee ── */}
      <div className="md:hidden px-0">
        <h2
          className="text-center text-[15vw] font-black uppercase tracking-tighter mb-8 px-6"
          style={{
            WebkitTextStroke: "1px var(--lavender)",
            color: "transparent",
          }}
        >
          Stack
        </h2>

        <div className="flex flex-col gap-3">
          {marqueeRows.map((row, i) => (
            <div key={i} className="marquee-track">
              <div
                className={`flex gap-3 w-max ${
                  i % 2 === 0 ? "marquee-left" : "marquee-right"
                }`}
                style={{ animationDuration: `${20 + i * 6}s` }}
              >
                {/* row rendered twice back-to-back so the loop has no seam */}
                {[...row, ...row].map((tech, idx) => (
                  <div
                    key={`${tech.name}-${idx}`}
                    className="flex items-center gap-2 shrink-0 bg-lavender/5 border border-lavender/20 rounded-full pl-3 pr-4 py-2"
                  >
                    <img
                      src={tech.url}
                      alt={tech.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-[11px] font-bold text-lavender tracking-wide uppercase whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tablet + Desktop (md+): pinned swirling motion-path showcase ── */}
      <div className="hidden md:flex relative h-screen items-center justify-center">
        <h2
          ref={textRef}
          className="absolute z-0 text-[18vw] lg:text-[20vw] font-black uppercase tracking-tighter pointer-events-none select-none"
          style={{
            WebkitTextStroke: "1px var(--lavender)",
            color: "transparent",
          }}
        >
          STACK
        </h2>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
          viewBox="0 0 1921 556"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            id="img-path"
            d="M0 555.5H955C1114 555.5 1237.5 414.5 1237.5 278C1237.5 119.5 1091 0.5 960 0.5C816 0.5 682.5 132.5 682.5 278C682.5 423.5 818 555.5 966 555.5H1921"
          />
        </svg>

        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {techs.map((tech, i) => (
            <div
              key={i}
              ref={(el) => (imgRefs.current[i] = el)}
              className="absolute w-[100px] h-[130px] lg:w-[130px] lg:h-[160px] flex flex-col items-center justify-center gap-2 lg:gap-3 p-3 lg:p-4 rounded-2xl border border-lavender/20 bg-deep-plum/30 backdrop-blur-md shadow-2xl"
            >
              <img
                src={tech.url}
                alt={tech.name}
                className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
              />
              <span className="text-[10px] lg:text-xs font-bold text-lavender tracking-widest uppercase text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
