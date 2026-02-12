import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation - split text effect
      const heading = headingRef.current;
      const words = heading.textContent.split(' ');
      heading.innerHTML = words
        .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
        .join(' ');

      gsap.fromTo(
        heading.querySelectorAll('span span'),
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          scale: 1.2,
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text paragraphs fade in from bottom
      const paragraphs = textRef.current.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      statItems.forEach((item, index) => {
        const number = item.querySelector('.stat-number');
        const targetValue = parseInt(number.getAttribute('data-value'));

        gsap.fromTo(
          item,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Counter animation
        gsap.fromTo(
          number,
          { textContent: 0 },
          {
            textContent: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
              number.textContent = Math.ceil(number.textContent);
            },
          }
        );
      });

      // Background shapes parallax
      gsap.to('.shape-1', {
        y: -100,
        x: 50,
        rotation: 45,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.shape-2', {
        y: 100,
        x: -50,
        rotation: -45,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-20 px-6 overflow-hidden"
    >
      {/* Background decorative shapes */}
      <div className="shape-1 absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="shape-2 absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="mb-20">
          <h2
            ref={headingRef}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            About Me
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image Section */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
            </div>
            {/* Decorative border */}
            <div className="absolute -inset-4 border-2 border-blue-500/20 rounded-2xl -z-10"></div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              Hi! I'm a passionate <span className="text-blue-400 font-semibold">Full Stack Developer</span> with
              a keen eye for creating beautiful, functional, and user-centric digital experiences.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              With expertise in modern web technologies, I transform ideas into elegant solutions
              that make a difference. I believe in writing clean, maintainable code and staying
              updated with the latest industry trends.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer community.
            </p>

            {/* CTA Button */}
            <div className="pt-6">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Let's Connect
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="stat-item text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div
              className="stat-number text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
              data-value="50"
            >
              0
            </div>
            <div className="text-gray-400 font-medium">Projects Completed</div>
          </div>

          <div className="stat-item text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div
              className="stat-number text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
              data-value="3"
            >
              0
            </div>
            <div className="text-gray-400 font-medium">Years Experience</div>
          </div>

          <div className="stat-item text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div
              className="stat-number text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
              data-value="30"
            >
              0
            </div>
            <div className="text-gray-400 font-medium">Happy Clients</div>
          </div>

          <div className="stat-item text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            <div
              className="stat-number text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
              data-value="15"
            >
              0
            </div>
            <div className="text-gray-400 font-medium">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;