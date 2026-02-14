import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myImg from "../assets/my-image.jpeg"; // Replace with your actual image path

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef();
  const textRef = useRef();
  const physicsItems = useRef([]);

  const aboutText =
    "I am a digital artisan specialized in building high-performance websites. I don't do boring websites or ordinary apps — I specialize in crafting the wildest, most unconventional digital experiences out there.";

  useGSAP(
    () => {
      // 1. SMOOTH GRADIENT TEXT HIGHLIGHT
      gsap.to(".smooth-highlight", {
        backgroundPositionX: "0%",
        stagger: 0.02,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1, // High scrub value for extra smoothness
        },
      });

      // 2. GRAVITY COLLISION FOR IMAGE & ACTION CARDS
      gsap.from(physicsItems.current, {
        y: -1200, // Start far off-screen
        rotation: () => Math.random() * 60 - 30,
        opacity: 0,
        duration: 1.8,
        stagger: 0.15,
        ease: "bounce.out", // The "Luxury" collision feel
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    
    <section
      ref={containerRef}
      className="relative w-full bg-black py-24 md:py-40 px-[8vw] overflow-hidden"
    >
        
   
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           {/* Background Section Title (Luxury aesthetic) */}
      <div className="absolute -bottom-10 left-0 opacity-5 pointer-events-none select-none">
        <h1 className="text-[25vw] font-black text-lavender italic leading-none">ABOUT</h1>
      </div>
        {/* Falling Identity Image */}
        <div
          ref={(el) => (physicsItems.current[0] = el)}
          className="lg:col-span-4 w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10"
        >
          <img
            src={myImg}
            alt="Identity"
            className="w-full h-full object-cover transition-all duration-1000"
          />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* THE AMARA SCROLL HIGHLIGHT TEXT */}
          <div
            ref={textRef}
            className="flex flex-wrap text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[1.1]"
          >
            {aboutText.split(" ").map((word, i) => (
              <span
                key={i}
                className="smooth-highlight inline-block mr-[0.25em]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, white 50%, rgba(255,255,255,0.1) 50%)",
                  backgroundSize: "200% 100%",
                  backgroundPositionX: "100%", // Start at the grey/dimmed side
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transition: "none",
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* PHYSICS ACTION CARDS: CV & GITHUB */}
          <div className="flex flex-wrap gap-6 pt-10">
            {/* CV Download Card */}
            <a
              href="/path-to-your-cv.pdf"
              download
              ref={(el) => (physicsItems.current[1] = el)}
              className="group relative px-12 py-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl hover:border-orchid/50 transition-colors"
            >
              <span className="block text-lavender/40 text-[10px] tracking-[0.4em] uppercase mb-2">
                Portfolio
              </span>
              <span className="text-xl font-bold text-white uppercase italic">
                Download CV
              </span>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-orchid animate-pulse" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/imama-ansari14"
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (physicsItems.current[2] = el)}
              className="group relative px-12 py-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl hover:border-white/40 transition-colors"
            >
              <span className="block text-lavender/40 text-[10px] tracking-[0.4em] uppercase mb-2">
                Connect
              </span>
              <span className="text-xl font-bold text-white uppercase italic">
                GitHub Profile
              </span>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
