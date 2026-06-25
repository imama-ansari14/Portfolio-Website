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

  // Scroll-driven horizontal reveal: as the user scrolls the page down,
  // the section pins and the card track translates from right to left,
  // so every project scrolls past the viewport before the page continues.
  // Runs on ALL screen sizes now — the earlier mobile breakage was caused
  // by fixed-pixel card widths (380/480px), not by the pin/scroll itself.
  // Cards are sized responsively (vw-based) below, so the scroll distance
  // is measured from the real rendered track width at every breakpoint.
  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;

      const scrollDistance = () => track.scrollWidth - section.clientWidth + 40;

      const tween = gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
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

      return () => tween.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen w-full bg-[#0f0a0d] overflow-hidden flex flex-col justify-between"
    >
      {/* ── Header Section ── */}
      <div className="px-6 sm:px-8 md:px-16 flex justify-between items-start z-20">
        <div>
          <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#e8dde5] leading-[1] lg:leading-[0.85] tracking-tighter uppercase mt-5">
            My Latest <br />
            <span className="text-[#cf9cc8]">Work</span>
          </h2>
        </div>
      </div>

      {/* ── Scroll-driven Track ──
          Sized in vw/breakpoint units (not fixed pixels) so cards always fit
          the viewport at every screen size, from small phones to desktop. */}
      <div className="relative flex-1 flex items-center mt-6 sm:mt-8 lg:mt-5 min-h-0">
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-10 px-6 sm:px-8 md:px-16 lg:px-15 will-change-transform h-[62vh] max-h-[400px] sm:max-h-[430px] md:max-h-[450px]"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="relative flex-shrink-0 w-[72vw] max-w-[300px] sm:w-[340px] sm:max-w-none md:w-[400px] lg:w-[480px] h-full bg-[#140b10] rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] border border-[#cf9cc810] overflow-hidden group hover:border-[#cf9cc840] transition-all duration-500"
            >
              {/* Image Area */}
              <div className="relative h-[60%] sm:h-[63%] md:h-[65%] overflow-hidden">
                <div className="absolute top-2 right-3 z-10 font-dm text-[7px] sm:text-[8px] md:text-[9px] tracking-widest text-white bg-[#7c4c75] px-2 py-1 sm:py-1.5 rounded-full uppercase font-bold">
                  {p.category}
                </div>

                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Text Area */}
              <div className="p-4 sm:p-5 md:p-8 h-[40%] sm:h-[37%] md:h-[35%] flex flex-col justify-between bg-[#140b10]">
                <div className="min-w-0">
                  <h3 className="font-syne text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e8dde5] tracking-tight truncate">
                    {p.title}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] md:text-[11px] text-white/30 uppercase tracking-[0.12em] sm:tracking-[0.2em] font-dm mt-1 truncate">
                    {p.tags[0]} — {p.tags[1]}
                  </p>
                </div>

                <div className="flex justify-end mt-2 sm:mt-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#512b42] flex items-center justify-center text-[#cf9cc8] group-hover:bg-[#cf9cc8] group-hover:text-[#512b42] group-hover:rotate-45 transition-all duration-500 shrink-0">
                    <ArrowUpRight size={16} className="sm:hidden" />
                    <ArrowUpRight
                      size={20}
                      className="hidden sm:block md:hidden"
                    />
                    <ArrowUpRight size={22} className="hidden md:block" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress Bar Footer (all screens) ── */}
      <div className="px-6 sm:px-8 md:px-16 w-full flex flex-col gap-4 mt-6 sm:mt-8 pb-4 sm:pb-6 lg:pb-0">
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
