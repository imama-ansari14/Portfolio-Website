import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const navLinks = ["Home", "About", "Projects", "Certificates", "Contact"];

  const headingCls =
    "font-medium tracking-[0.14em] uppercase text-white mb-3.5 text-center md:text-left";
  const socialCls =
    "flex items-center justify-center md:justify-start gap-2.5 text-[var(--lavender)] no-underline text-sm px-2.5 py-1.5 rounded-lg border border-[rgba(207,156,200,0.15)] transition-colors hover:bg-white/5";

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#0f0a0d] text-[var(--lavender)]"
    >
      {/* Glow blobs */}
      <div
        className="absolute top-0 left-0 pointer-events-none w-[320px] h-[320px] rounded-full -translate-x-[60px] -translate-y-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(81,43,66,0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none w-[240px] h-[240px] rounded-full translate-x-[40px] translate-y-[20px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,76,117,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Wavy top */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-[55px] w-full"
      >
        <path
          d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z"
          fill="#0f0a0d"
        />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-8 pt-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          {/* Logo + Email */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src={logo}
              alt="Imama Ansari"
              className="h-[60px] w-auto mb-2 object-contain"
            />
            <p className="text-[15px] text-white font-light mb-4">
              MERN Stack Web Developer | Turning ideas into interactive digital
              experiences
            </p>
            <a
              href="mailto:ansariimama@yahoo.com"
              className="inline-flex items-center gap-[7px] text-[13px] text-[var(--lavender)] no-underline border border-[rgba(207,156,200,0.25)] px-3.5 py-1.5 rounded-[20px] bg-[rgba(207,156,200,0.06)]"
            >
              <Mail size={13} /> ansariimama@yahoo.com
            </a>
          </div>

          {/* Nav Links */}
          <div>
            <h2 className={headingCls}>Navigate</h2>
            <ul className="list-none p-0 m-0 flex flex-col items-center md:items-start gap-[9px]">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[var(--lavender)] no-underline text-[13.5px]"
                  >
                    — {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className={`${headingCls} md:text-center`}>Connect</h2>
            <div className="flex flex-col gap-3 max-w-xs mx-auto md:max-w-none">
              <a
                href="https://github.com/imama-ansari14"
                target="_blank"
                rel="noreferrer"
                className={socialCls}
              >
                <span className="bg-[#24292e] text-white rounded-lg w-7.5 h-7.5 flex items-center justify-center shrink-0">
                  <Github size={15} />
                </span>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/imama-ansari"
                target="_blank"
                rel="noreferrer"
                className={socialCls}
              >
                <span className="bg-[#0077b5] text-white rounded-lg w-7.5 h-7.5 flex items-center justify-center shrink-0">
                  <Linkedin size={15} />
                </span>
                LinkedIn
              </a>
              <a
                href="https://instagram.com/webbyimama"
                target="_blank"
                rel="noreferrer"
                className={socialCls}
              >
                <span className="bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] text-white rounded-lg w-7.5 h-7.5 flex items-center justify-center shrink-0">
                  <Instagram size={15} />
                </span>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
