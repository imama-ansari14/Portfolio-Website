import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".hero-title span", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      })
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      <h1 className="hero-title text-[12vw] font-black leading-none uppercase flex flex-wrap justify-center overflow-hidden">
        {"Creative Developer".split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-4 text-white">
            {word.split("").map((char, j) => (
              <span key={j} className="inline-block char">
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>
      <p className="hero-sub text-orchid text-xl tracking-[0.3em] uppercase mt-5">
        Imama Ansari
      </p>
    </section>
  );
};
export default Hero;
