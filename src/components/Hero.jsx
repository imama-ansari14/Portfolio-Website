import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hero-title span", { y: 100, opacity: 0, stagger: 0.1, duration: 1, ease: "power4.out" })
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
      .from(".scroll-indicator", { opacity: 0, y: -20, repeat: -1, yoyo: true, duration: 1.5 });
  }, { scope: container });

  return (
    <section ref={container} className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <h1 className="hero-title text-[12vw] font-black leading-none uppercase flex flex-wrap justify-center overflow-hidden">
        {"Creative Developer".split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-4 text-white">
            {word.split("").map((char, j) => <span key={j} className="inline-block char">{char}</span>)}
          </span>
        ))}
      </h1>
      <p className="hero-sub text-orchid text-xl tracking-[0.3em] uppercase mt-5">Imama Ansari</p>
      <div className="scroll-indicator absolute bottom-10 text-lavender/50 text-sm tracking-widest uppercase">Scroll to Explore</div>
    </section>
  );
};
export default Hero;