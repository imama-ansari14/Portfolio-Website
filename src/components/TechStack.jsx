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

const TechStack = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRefs = useRef([]);

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

  useGSAP(
    () => {
      // 1. Background Text Zoom
      gsap.fromTo(
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

      // 2. Motion Path Logic
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden min-h-screen"
    >
      <div className="relative h-screen flex items-center justify-center">
        <h2
          ref={textRef}
          className="absolute z-0 text-[20vw] font-black uppercase tracking-tighter pointer-events-none select-none"
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
        >
          <path
            id="img-path"
            d="M0 555.5H955C1114 555.5 1237.5 414.5 1237.5 278C1237.5 119.5 1091 0.5 960 0.5C816 0.5 682.5 132.5 682.5 278C682.5 423.5 818 555.5 966 555.5H1921"
          />
        </svg>

        <div className="absolute inset-0 z-20 pointer-events-none">
          {techs.map((tech, i) => (
            <div
              key={i}
              ref={(el) => (imgRefs.current[i] = el)}
              className="absolute w-[100px] h-[120px] md:w-[130px] md:h-[160px] flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-lavender/20 bg-deep-plum/30 backdrop-blur-md shadow-2xl"
            >
              <img
                src={tech.url}
                alt={tech.name}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
              <span className="text-[10px] md:text-xs font-bold text-lavender tracking-widest uppercase text-center">
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
