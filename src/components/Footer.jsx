import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  const navLinks = ["Home", "About", "Projects", "Certificates", "Contact"];

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{ background: "#0f0a0d", color: "var(--lavender)" }}
    >
      {/* Glow blobs */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(81,43,66,0.35) 0%, transparent 70%)",
          transform: "translate(-60px, -80px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,76,117,0.25) 0%, transparent 70%)",
          transform: "translate(40px, 20px)",
        }}
      />

      {/* Wavy top */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ display: "block", height: "55px", width: "100%" }}
      >
        <path
          d="M0,30 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 L0,60 Z"
          fill="#0f0a0d"
        />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-8 pt-4 pb-6">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Logo + Email */}
          <div>
            <img
              src={logo}
              alt="Imama Ansari"
              style={{
                height: "60px",
                width: "auto",
                marginBottom: "8px",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                fontSize: "15px",
                color: "white",
                fontWeight: 300,
                marginBottom: "16px",
              }}
            >
              MERN Stack Web Developer | Turning ideas into interactive digital
              experiences
            </p>

            <a
              href="mailto:ansariimama@yahoo.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "13px",
                color: "var(--lavender)",
                textDecoration: "none",
                border: "1px solid rgba(207,156,200,0.25)",
                padding: "6px 14px",
                borderRadius: "20px",
                background: "rgba(207,156,200,0.06)",
              }}
            >
              <Mail size={13} /> ansariimama@yahoo.com
            </a>
          </div>

          {/* Nav Links */}
          <div>
            <h2
              style={{
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "white",
                marginBottom: "14px",
              }}
            >
              Navigate
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "9px",
              }}
            >
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{
                      color: "var(--lavender)",
                      textDecoration: "none",
                      fontSize: "13.5px",
                    }}
                  >
                    — {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="font-medium tracking-[0.14em] uppercase text-white text-center mb-3.5">
              Connect
            </h2>

            <div className="flex flex-col gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/imama-ansari14"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[var(--lavender)] no-underline text-sm px-2.5 py-1.5 rounded-lg border border-[rgba(207,156,200,0.15)] transition-colors hover:bg-white/5"
              >
                <span className="bg-[#24292e] text-white rounded-lg w-7.5 h-7.5 flex items-center justify-center shrink-0">
                  <Github size={15} />
                </span>
                GitHub
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/imama-ansari"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[var(--lavender)] no-underline text-sm px-2.5 py-1.5 rounded-lg border border-[rgba(207,156,200,0.15)] transition-colors hover:bg-white/5"
              >
                <span className="bg-[#0077b5] text-white rounded-lg w-7.5 h-7.5 flex items-center justify-center shrink-0">
                  <Linkedin size={15} />
                </span>
                LinkedIn
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/webbyimama"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[var(--lavender)] no-underline text-sm px-2.5 py-1.5 rounded-lg border border-[rgba(207,156,200,0.15)] transition-colors hover:bg-white/5"
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
