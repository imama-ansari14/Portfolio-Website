import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const TechStack = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRefs = useRef([]);

 const techs = [
    // Core Frontend
    { name: 'HTML5', url: 'https://svgl.app/library/html5.svg' },
    { name: 'CSS3', url: 'https://svgl.app/library/css3.svg' },
    { name: 'JavaScript', url: 'https://svgl.app/library/javascript.svg' },
    { name: 'TypeScript', url: 'https://svgl.app/library/typescript.svg' },
    
    // Frameworks & UI
    { name: 'React', url: 'https://svgl.app/library/react.svg' },
    { name: 'Next.js', url: 'https://svgl.app/library/nextjs_icon_dark.svg' },
    { name: 'Tailwind', url: 'https://svgl.app/library/tailwindcss.svg' },
    { name: 'Bootstrap', url: 'https://svgl.app/library/bootstrap.svg' },
    
    // Animation & Design
    { name: 'GSAP', url: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg' },
    { name: 'Figma', url: 'https://svgl.app/library/figma.svg' },
    
    // Tools & Version Control
    { name: 'Git', url: 'https://svgl.app/library/git.svg' },
    { name: 'GitHub', url: 'https://svgl.app/library/github-light.svg' },
    { name: 'VS Code', url: 'https://svgl.app/library/vscode.svg' },
    
    // Backend & Deployment
    { name: 'Supabase', url: 'https://svgl.app/library/supabase.svg' },
    { name: 'Netlify', url: 'https://svgl.app/library/netlify.svg' },
    { name: 'Vercel', url: 'https://svgl.app/library/vercel_light.svg' },
  ];

  useGSAP(() => {
    // 1. Background Text Zoom (Amara Style)
    gsap.fromTo(textRef.current, 
      { scale: 0.7, opacity: 0.1 },
      {
        scale: 1.2,
        opacity: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      }
    );

    // 2. Motion Path Logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%", // Longer scroll = smoother animation
        pin: true,
        scrub: 1,
      }
    });

    tl.to(imgRefs.current, {
      motionPath: {
        path: "#img-path",
        align: "#img-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      stagger: 0.15, // Gap between logos
      duration: 5,
      ease: "power1.inOut",
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-black overflow-hidden min-h-screen">
      <div className="relative h-screen flex items-center justify-center">
        
        {/* Large Background Text */}
        <h2 
          ref={textRef}
          className="absolute z-0 text-[20vw] font-black uppercase tracking-tighter pointer-events-none select-none"
          style={{ 
            WebkitTextStroke: '1px var(--lavender)',
            color: 'transparent'
          }}
        >
          STACK
        </h2>

        {/* The Amara Path (Hidden) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0" viewBox="0 0 1921 556">
          <path 
            id="img-path" 
            d="M0 555.5H955C1114 555.5 1237.5 414.5 1237.5 278C1237.5 119.5 1091 0.5 960 0.5C816 0.5 682.5 132.5 682.5 278C682.5 423.5 818 555.5 966 555.5H1921" 
          />
        </svg>

        {/* Tech Cards Container */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {techs.map((tech, i) => (
            <div
              key={i}
              ref={el => imgRefs.current[i] = el}
              className="absolute w-[100px] h-[120px] md:w-[130px] md:h-[160px] flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-lavender/20 bg-deep-plum/30 backdrop-blur-md shadow-[0_0_30px_rgba(124,76,117,0.2)]"
            >
              <img 
                src={tech.url} 
                alt={tech.name} 
                className="w-12 h-12 md:w-16 md:h-16 object-contain filter drop-shadow-lg" 
              />
              <span className="text-[10px] md:text-xs font-bold text-lavender tracking-widest uppercase text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual Indicator of Progress */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-orchid/40 text-[10px] tracking-[0.8em] uppercase">
        Scroll to Explore
      </div>
    </section>
  );
};

export default TechStack;