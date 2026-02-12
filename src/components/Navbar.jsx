import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const navRef = useRef();

  useGSAP(() => {
    gsap.from(navRef.current, { y: -100, opacity: 0, duration: 1.2, ease: "power4.out" });
  });

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-[100] px-10 py-6 flex justify-between items-center bg-dark/30 backdrop-blur-lg border-b border-plum/20">
      <div className="text-2xl font-bold tracking-tighter text-white">IMAMA<span className="text-lavender">.</span></div>
      <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em] font-medium">
        {['About', 'Projects', 'Stack', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-lavender transition-colors">{item}</a>
        ))}
      </div>
    </nav>
  );
};
export default Navbar;