import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

const navItems = ["About", "Projects", "Stack", "Contact"];

const Navbar = () => {
  const navRef = useRef();
  const sidebarRef = useRef();
  const overlayRef = useRef();
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });
  });

  const openSidebar = () => {
    setOpen(true);
    gsap.to(sidebarRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    gsap.to(overlayRef.current, {
      opacity: 1,
      pointerEvents: "all",
      duration: 0.3,
    });
  };

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      x: "100%",
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => setOpen(false),
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
    });
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <div ref={navRef} className="fixed top-0 w-full z-[100] ">
        {/* Main bar */}
        <div
          className="w-full px-8 md:px-12 h-[68px] flex items-center justify-between relative"
          style={{
            background: "rgba(81,43,66,0.5)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Left lavender accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{ background: "linear-gradient(180deg, #cf9cc8, #7c4c75)" }}
          />

          {/* Logo */}
          <img src={Logo} alt="logo" className="w-30 h-auto" />

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center gap-[2px] px-[7px] py-[5px] rounded-full border border-lavender/15"
            style={{ background: "rgba(15,10,13,0.5)" }}
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] uppercase tracking-[0.13em] font-medium text-white/55 px-[15px] py-[6px] rounded-full hover:bg-lavender/15 hover:text-lavender transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={openSidebar}
            className="md:hidden text-lavender p-1 w-10"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* ── WAVY EDGE ── */}
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "40px", marginTop: "-1px" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,20 Q30,40 60,20 Q90,0 120,20 Q150,40 180,20 Q210,0 240,20 Q270,40 300,20 Q330,0 360,20 Q390,40 420,20 Q450,0 480,20 Q510,40 540,20 Q570,0 600,20 Q630,40 660,20 Q690,0 720,20 Q750,40 780,20 Q810,0 840,20 Q870,40 900,20 Q930,0 960,20 Q990,40 1020,20 Q1050,0 1080,20 Q1110,40 1140,20 Q1170,0 1200,20 Q1230,40 1260,20 Q1290,0 1320,20 Q1350,40 1380,20 Q1410,0 1440,20 L1440,0 Z"
            fill="rgba(81,43,66,0.5)"
          />
          <path
            d="M0,20 Q30,40 60,20 Q90,0 120,20 Q150,40 180,20 Q210,0 240,20 Q270,40 300,20 Q330,0 360,20 Q390,40 420,20 Q450,0 480,20 Q510,40 540,20 Q570,0 600,20 Q630,40 660,20 Q690,0 720,20 Q750,40 780,20 Q810,0 840,20 Q870,40 900,20 Q930,0 960,20 Q990,40 1020,20 Q1050,0 1080,20 Q1110,40 1140,20 Q1170,0 1200,20 Q1230,40 1260,20 Q1290,0 1320,20 Q1350,40 1380,20 Q1410,0 1440,20"
            fill="none"
            stroke="rgba(207,156,200,0.3)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ── OVERLAY ── */}
      <div
        ref={overlayRef}
        onClick={closeSidebar}
        className="fixed inset-0 z-[200]"
        style={{
          background: "rgba(15,10,13,0.7)",
          backdropFilter: "blur(5px)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── SIDEBAR ── */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full z-[201] flex flex-col gap-2"
        style={{
          width: "260px",
          background: "#1a0d15",
          borderLeft: "1px solid rgba(207,156,200,0.15)",
          padding: "28px 24px",
          transform: "translateX(100%)",
        }}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center mb-8">
          <img src={Logo} alt="logo" className="w-20 h-auto" />
          <button
            onClick={closeSidebar}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lavender"
            style={{
              background: "rgba(207,156,200,0.1)",
              border: "1px solid rgba(207,156,200,0.2)",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Sidebar links */}
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={closeSidebar}
            className="text-[13px] uppercase tracking-[0.12em] font-medium text-white/60 px-4 py-[14px] rounded-xl border border-transparent hover:bg-lavender/8 hover:border-lavender/15 hover:text-lavender transition-all duration-200"
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
