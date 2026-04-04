// Work.jsx
import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../data/index";

const categories = ["All", "Web Design", "Functionality"];

const ProjectCard = ({ p, tall = false }) => {
  const cardRef = useRef();

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const sp = cardRef.current?.querySelector(".spotlight");
    if (sp)
      sp.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(81,43,66,0.55) 0%, rgba(40,15,30,0.35) 45%, transparent 70%)`;
  }, []);

  const handleMouseEnter = useCallback((e) => {
    e.currentTarget.style.borderColor = "rgba(207,156,200,0.38)";
    e.currentTarget.style.transform = "translateY(-5px)";
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.borderColor = "rgba(207,156,200,0.1)";
    e.currentTarget.style.transform = "translateY(0)";
    const sp = cardRef.current?.querySelector(".spotlight");
    if (sp) sp.style.background = "none";
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card group relative overflow-hidden rounded-[18px]"
      style={{
        background: "#140b10",
        border: "1px solid rgba(207,156,200,0.1)",
        transition: "border-color 0.3s, transform 0.35s",
        cursor: "pointer",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Featured bar */}
      {p.featured && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] z-20"
          style={{ background: "linear-gradient(180deg, #cf9cc8, #512b42)" }}
        />
      )}

      {/* Glow dot */}
      <div
        className="absolute top-3 right-3 w-[6px] h-[6px] rounded-full z-20"
        style={{ background: "#cf9cc8", opacity: 0.45 }}
      />

      {/* Spotlight */}
      <div className="spotlight absolute inset-0 z-10 pointer-events-none rounded-[18px]" />

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={p.img}
          alt={p.title}
          className="w-full block object-cover transition-transform duration-700 group-hover:scale-105"
          style={{
            height: tall ? "220px" : "130px",
            filter: "brightness(0.7)",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback */}
        <div
          style={{
            height: tall ? "220px" : "130px",
            background: "linear-gradient(135deg, #1e0d18, #0f0a0d)",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "rgba(207,156,200,0.18)",
          }}
        >
          {p.title}
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,10,13,0.97) 0%, rgba(15,10,13,0.4) 55%, transparent 100%)",
          }}
        />

        {/* Slide-up on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)" }}
        >
          <p
            style={{
              fontSize: "11.5px",
              color: "rgba(207,156,200,0.78)",
              lineHeight: 1.6,
              marginBottom: "10px",
            }}
          >
            {p.desc}
          </p>
          <div className="flex gap-2">
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1"
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--lavender)",
                textDecoration: "none",
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(207,156,200,0.3)",
                background: "rgba(207,156,200,0.07)",
              }}
            >
              <ExternalLink size={10} /> Live
            </a>

            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1"
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--lavender)",
                textDecoration: "none",
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(207,156,200,0.3)",
                background: "rgba(207,156,200,0.07)",
              }}
            >
              <Github size={10} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 18px 18px" }}>
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "rgba(124,76,117,0.7)",
            marginBottom: "5px",
          }}
        >
          {p.id}
          {p.featured ? " — Featured" : ""}
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#e8dde5",
            marginBottom: "10px",
            lineHeight: 1.3,
          }}
        >
          {p.title}
        </p>
        <div className="flex flex-wrap gap-[5px]">
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "9px",
                letterSpacing: "0.07em",
                padding: "2px 9px",
                borderRadius: "20px",
                border: "1px solid rgba(207,156,200,0.15)",
                color: "var(--lavender)",
                background: "rgba(207,156,200,0.04)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const [filter, setFilter] = useState("All");
  const container = useRef();

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "power3.out" }
    );
  }, [filter]);

  // Alternating layout — odd rows: big left + 2 small right
  //                      even rows: 2 small left + big right
  const renderAlternating = () => {
    const rows = [];
    let i = 0;
    let rowIndex = 0;

    while (i < filteredProjects.length) {
      const isOdd = rowIndex % 2 === 0;

      if (isOdd) {
        // Big LEFT, 2 small RIGHT
        const big = filteredProjects[i];
        const small1 = filteredProjects[i + 1];
        const small2 = filteredProjects[i + 2];

        rows.push(
          <div
            key={rowIndex}
            className="grid gap-4"
            style={{ gridTemplateColumns: "1.6fr 1fr" }}
          >
            {/* Big card */}
            {big && <ProjectCard p={big} tall={true} />}

            {/* 2 small stacked */}
            <div className="flex flex-col gap-4">
              {small1 && <ProjectCard p={small1} tall={false} />}
              {small2 && <ProjectCard p={small2} tall={false} />}
            </div>
          </div>
        );
        i += 3;
      } else {
        // 2 small LEFT, big RIGHT
        const small1 = filteredProjects[i];
        const small2 = filteredProjects[i + 1];
        const big = filteredProjects[i + 2];

        rows.push(
          <div
            key={rowIndex}
            className="grid gap-4"
            style={{ gridTemplateColumns: "1fr 1.6fr" }}
          >
            {/* 2 small stacked */}
            <div className="flex flex-col gap-4">
              {small1 && <ProjectCard p={small1} tall={false} />}
              {small2 && <ProjectCard p={small2} tall={false} />}
            </div>

            {/* Big card */}
            {big && <ProjectCard p={big} tall={true} />}
          </div>
        );
        i += 3;
      }

      rowIndex++;
    }

    return rows;
  };

  return (
    <section
      id="projects"
      ref={container}
      style={{ background: "#0f0a0d", padding: "100px 40px" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          style={{
            borderBottom: "1px solid rgba(207,156,200,0.1)",
            paddingBottom: "36px",
          }}
        >
          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "6px 18px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  border:
                    filter === cat
                      ? "1px solid rgba(207,156,200,0.4)"
                      : "1px solid rgba(124,76,117,0.35)",
                  background:
                    filter === cat ? "var(--deep-plum)" : "transparent",
                  color: filter === cat ? "var(--lavender)" : "var(--orchid)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating layout */}
        <div className="flex flex-col gap-4">{renderAlternating()}</div>
      </div>
    </section>
  );
};

export default Work;
