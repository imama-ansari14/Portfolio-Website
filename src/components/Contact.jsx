import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// USAGE:
//   3. Drop <ContactSection /> anywhere in your page
// ─────────────────────────────────────────────

const FORMSPREE_ID = "YOUR_FORMSPREE_ID"; // 🔁 Replace this

export default function ContactSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const blobTopRef = useRef(null);
  const blobBotRef = useRef(null);
  const labelRefs = useRef([]);
  const infoRefs = useRef([]);

  // Typewriter
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Let's build something.";

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  // ── Typewriter effect ──
  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTyped(fullText.slice(0, i));
        if (i === fullText.length) {
          clearInterval(interval);
          // blink cursor a few times then stop
          let blinks = 0;
          const blink = setInterval(() => {
            setCursorVisible((v) => !v);
            blinks++;
            if (blinks > 6) {
              clearInterval(blink);
              setCursorVisible(true);
            }
          }, 400);
        }
      }, 65);
      return () => clearInterval(interval);
    }, 600); // wait a beat before starting
    return () => clearTimeout(delay);
  }, []);

  // ── GSAP Scroll Animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient blobs — slow float
      gsap.to(blobTopRef.current, {
        y: 40,
        x: -20,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(blobBotRef.current, {
        y: -30,
        x: 15,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      // Left panel — slide in from left
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right panel — slide in from right
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Info items — stagger up
      gsap.fromTo(
        infoRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Form labels — stagger
      gsap.fromTo(
        labelRefs.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Formspree Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // Button press micro-animation
    gsap.fromTo(
      e.currentTarget.querySelector("button[type='submit']"),
      { scale: 0.97 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Success flash on right panel
        gsap.fromTo(
          rightRef.current,
          { boxShadow: "0 0 0px #cf9cc8" },
          {
            boxShadow: "0 0 60px #cf9cc820",
            duration: 0.8,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          }
        );
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addLabelRef = (el) => {
    if (el && !labelRefs.current.includes(el)) labelRefs.current.push(el);
  };
  const addInfoRef = (el) => {
    if (el && !infoRefs.current.includes(el)) infoRefs.current.push(el);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0f0a0d] flex items-center overflow-hidden py-24 px-6 md:px-12 lg:px-20"
    >
      {/* ── Ambient blobs ── */}
      <div
        ref={blobTopRef}
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, #7c4c7530 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        ref={blobBotRef}
        className="pointer-events-none absolute -bottom-24 -right-16 w-[360px] h-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, #512b4240 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Subtle grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#cf9cc8 1px, transparent 1px), linear-gradient(90deg, #cf9cc8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* ── LEFT ── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          {/* Typewriter headline */}
          <h2
            className="font-['Syne'] text-5xl md:text-6xl font-extrabold text-white leading-tight mb-8"
            style={{
              fontFamily: "var(--font-syne)",
              minHeight: "clamp(120px, 18vw, 168px)",
            }}
          >
            {typed}
            <span
              className="inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-[#cf9cc8]"
              style={{
                opacity: cursorVisible ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            />
          </h2>

          {/* Body copy */}
          <p
            className="text-white/50 font-['DM_Sans'] text-base leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "var(--font-dm)" }}
          >
            Whether it's a bold rebrand, a pixel-perfect interface, or a
            late-night idea — my inbox is always open.
          </p>

          {/* Info list */}
          <ul className="space-y-4">
            {[
              {
                label: "Email",
                value: "ansariimama@yahoo.com",
                href: "mailto:ansariimama@yahoo.com",
              },
              {
                label: "LinkedIn",
                value: "linkedin.com/in/yourname",
                href: "https://www.linkedin.com/in/imama-ansari/",
              },
              { label: "Instagram", value: "instagram.com/webbyimama", href: "#" },
              { label: "Status", value: "Available for freelance ✦" },

            ].map(({ label, value, href }) => (
              <li key={label} ref={addInfoRef} style={{ opacity: 0 }}>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#cf9cc8" }}
                  />
                  <div>
                    <span
                      className="block text-[#cf9cc8]/60 font-['DM_Sans'] text-[10px] tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "var(--font-dm)" }}
                    >
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-white/70 hover:text-[#cf9cc8] font-['DM_Sans'] text-sm transition-colors duration-200"
                        style={{ fontFamily: "var(--font-dm)" }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        className="text-white/70 font-['DM_Sans'] text-sm"
                        style={{ fontFamily: "var(--font-dm)" }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT — Form Card ── */}
        <div
          ref={rightRef}
          style={{ opacity: 0 }}
          className="relative rounded-2xl p-8 md:p-10"
        >
          {/* Card border with gradient */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #512b4230 0%, #7c4c7515 50%, #512b4220 100%)",
              border: "1px solid #512b4260",
            }}
          />
          {/* Inner glass */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.015)",
              backdropFilter: "blur(8px)",
            }}
          />

          <div className="relative z-10">
            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: "#512b4260",
                    border: "1px solid #cf9cc840",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M5 14l7 7L23 7"
                      stroke="#cf9cc8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  className="font-['Syne'] text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Message sent.
                </h3>
                <p
                  className="text-white/50 font-['DM_Sans'] text-sm"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-6">
                  {/* Name */}
                  <div ref={addLabelRef} style={{ opacity: 0 }}>
                    <label
                      htmlFor="contact-name"
                      className="block font-['DM_Sans'] text-[10px] tracking-[0.25em] uppercase mb-2 transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-dm)",
                        color:
                          focusedField === "name" ? "#cf9cc8" : "#cf9cc890",
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      className="w-full bg-transparent pb-2 font-['DM_Sans'] text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-dm)",
                        borderBottom: `1px solid ${
                          focusedField === "name" ? "#cf9cc8" : "#512b4280"
                        }`,
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div ref={addLabelRef} style={{ opacity: 0 }}>
                    <label
                      htmlFor="contact-email"
                      className="block font-['DM_Sans'] text-[10px] tracking-[0.25em] uppercase mb-2 transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-dm)",
                        color:
                          focusedField === "email" ? "#cf9cc8" : "#cf9cc890",
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      className="w-full bg-transparent pb-2 font-['DM_Sans'] text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-dm)",
                        borderBottom: `1px solid ${
                          focusedField === "email" ? "#cf9cc8" : "#512b4280"
                        }`,
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div ref={addLabelRef} style={{ opacity: 0 }}>
                    <label
                      htmlFor="contact-message"
                      className="block font-['DM_Sans'] text-[10px] tracking-[0.25em] uppercase mb-2 transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-dm)",
                        color:
                          focusedField === "message" ? "#cf9cc8" : "#cf9cc890",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      className="w-full bg-transparent pb-2 font-['DM_Sans'] text-sm text-white placeholder:text-white/20 focus:outline-none resize-none transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-dm)",
                        borderBottom: `1px solid ${
                          focusedField === "message" ? "#cf9cc8" : "#512b4280"
                        }`,
                      }}
                    />
                  </div>

                  {/* Error message */}
                  {status === "error" && (
                    <p
                      className="text-red-400/80 font-['DM_Sans'] text-xs"
                      style={{ fontFamily: "var(--font-dm)" }}
                    >
                      Something went wrong. Please try again or email me
                      directly.
                    </p>
                  )}

                  {/* Submit */}
                  <div ref={addLabelRef} style={{ opacity: 0 }}>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group w-full mt-2 py-4 rounded-xl font-['Syne'] font-bold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                      style={{
                        fontFamily: "var(--font-syne)",
                        background: "#512b42",
                        color: "#cf9cc8",
                        border: "1px solid #7c4c7550",
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          background: "#7c4c75",
                          duration: 0.3,
                          ease: "power2.out",
                        });
                        gsap.to(e.currentTarget, {
                          boxShadow: "0 0 32px #7c4c7550",
                          duration: 0.3,
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          background: "#512b42",
                          duration: 0.3,
                          ease: "power2.out",
                        });
                        gsap.to(e.currentTarget, {
                          boxShadow: "0 0 0px transparent",
                          duration: 0.3,
                        });
                      }}
                    >
                      <span className="flex items-center justify-center gap-3">
                        {status === "sending" ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-[#cf9cc8]/30 border-t-[#cf9cc8] animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">
                              →
                            </span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
