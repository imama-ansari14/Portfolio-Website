import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import { PROJECTS } from '../constants';

const Work = () => {
  const [filter, setFilter] = useState('All');
  const container = useRef();
  const categories = ['All', 'Web Design', 'Functionality'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  useGSAP(() => {
    gsap.fromTo(".project-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5 });
  }, [filter]);

  return (
    <section id="projects" ref={container} className="py-20 px-10 bg-[#0c0c0c]">
      <div className="flex justify-between items-end mb-16 border-b border-plum/30 pb-10">
        <h2 className="text-6xl font-bold">Work<span className="text-plum">.</span></h2>
        <div className="flex gap-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} 
              className={`px-6 py-2 rounded-full text-xs uppercase border transition-all ${filter === cat ? 'bg-plum border-lavender' : 'border-orchid/30 text-orchid'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredProjects.map((p, i) => (
          <div key={i} className="project-card group relative overflow-hidden rounded-2xl aspect-video bg-plum/10">
            <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={p.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-bold">{p.title}</h3>
              <p className="text-lavender text-sm italic">{p.tags.join(" / ")}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Work;