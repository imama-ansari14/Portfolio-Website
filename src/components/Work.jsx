// Work.jsx
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../data/index";

const categories = ["All", "Web Design", "Functionality"];

const ProjectCard = ({ p }) => {
  return (
    <div
      className="project-card group relative overflow-hidden rounded-2xl"
      style={{
        background: "#140b10",
        border: "1px solid rgba(207,156,200,0.1)",
        transition: "border-color 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(207,156,200,0.3)";
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(207,156,200,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Featured bar */}
      {p.featured && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] z-20"
          style={{ background: "linear-gradient(180deg, #cf9cc8, #512b42)" }}
        />
      )}

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.75)" }}
        />

        {/* Overlay on hover — slides up */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(15,10,13,0.97) 0%, rgba(15,10,13,0.5) 60%, transparent 100%)",
          }}
        >
          {/* Desc + links — hidden by default, visible on hover */}
          <div
            className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
          >
            <p
              style={{
                fontSize: "12px",
                color: "rgba(207,156,200,0.75)",
                lineHeight: 1.6,
                marginBottom: "12px",
              }}
            >
              {p.desc}
            </p>
            <div className="flex gap-2">
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-[5px] transition-all duration-200"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--lavender)",
                  textDecoration: "none",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  border: "1px solid rgba(207,156,200,0.3)",
                  background: "rgba(207,156,200,0.08)",
                }}
              >
                <ExternalLink size={10} /> Live
              </a>
              
              <a  href={p.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-[5px] transition-all duration-200"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--lavender)",
                  textDecoration: "none",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  border: "1px solid rgba(207,156,200,0.3)",
                  background: "rgba(207,156,200,0.08)",
                }}
              >
                <Github size={10} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Card bottom — title + tags */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "var(--orchid)",
                marginBottom: "4px",
              }}
            >
              {p.id}
            </p>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#e8dde5",
                lineHeight: 1.3,
              }}
            >
              {p.title}
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[5px]">
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "9px",
                letterSpacing: "0.08em",
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
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }
    );
  }, [filter]);

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
            paddingBottom: "40px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--orchid)",
                marginBottom: "8px",
              }}
            >
              // selected works
            </p>
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 58px)",
                fontWeight: 700,
                color: "#e8dde5",
                lineHeight: 1,
              }}
            >
              Work
              <span style={{ color: "var(--lavender)" }}>.</span>
            </h2>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "7px 20px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  border:
                    filter === cat
                      ? "1px solid rgba(207,156,200,0.4)"
                      : "1px solid rgba(124,76,117,0.3)",
                  background:
                    filter === cat
                      ? "var(--deep-plum)"
                      : "transparent",
                  color:
                    filter === cat
                      ? "var(--lavender)"
                      : "var(--orchid)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;