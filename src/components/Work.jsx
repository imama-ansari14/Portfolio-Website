import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/index";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef();
  const trackRef = useRef();
  const progressBarRef = useRef();

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;

      const scrollDistance = track.scrollWidth - window.innerWidth + 100;

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen w-full bg-[#0f0a0d] overflow-hidden flex flex-col justify-between "
    >
      {/* ── Header Section (Fixed Overlap) ── */}
      <div className="px-6 md:px-16 flex justify-between items-start z-20">
        <div>
          <p className="font-dm text-[10px] tracking-[0.3em] text-[#7c4c75] uppercase mb-2">
            ✦ Selected Work
          </p>
          <h2 className="font-syne text-6xl md:text-8xl font-extrabold text-[#e8dde5] leading-[0.85] tracking-tighter uppercase">
            Our Latest <br />
            <span className="text-[#cf9cc8]">Projects</span>
          </h2>
        </div>
      </div>

      {/* ── Scrollable Track (Fixed Card Sizes) ── */}
      <div className="relative flex-1 flex items-center mt-10">
        <div
          ref={trackRef}
          className="flex gap-10 px-16 will-change-transform h-[450px]"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="relative flex-shrink-0 w-[380px] md:w-[480px] h-full bg-[#140b10] rounded-[32px] border border-[#cf9cc810] overflow-hidden group hover:border-[#cf9cc840] transition-all duration-500"
            >
              {/* Image Area */}
              <div className="relative h-[65%] overflow-hidden">
               
                <div className="absolute top-2 right-3 z-10 font-dm text-[9px] tracking-widest text-white bg-[#7c4c75] px-2 py-1.5 rounded-full uppercase font-bold">
                  {p.category}
                </div>

                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Text Area */}
              <div className="p-8 h-[35%] flex flex-col justify-between bg-[#140b10]">
                <div>
                  <h3 className="font-syne text-3xl font-bold text-[#e8dde5] tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-dm mt-1">
                    {p.tags[0]} — {p.tags[1]}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-[11px] font-dm text-[#7c4c75] font-black tracking-widest">
                    2024
                  </p>
                  <div className="w-12 h-12 rounded-full bg-[#512b42] flex items-center justify-center text-[#cf9cc8] group-hover:bg-[#cf9cc8] group-hover:text-[#512b42] group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight size={22} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress Bar Footer ── */}
      <div className="px-16 w-full flex flex-col gap-4 mt-8">
        <div className="w-full h-[1px] bg-white/10 relative">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-[#cf9cc8] shadow-[0_0_10px_#cf9cc8]"
          />
        </div>
      </div>
    </section>
  );
};

export default Work;
