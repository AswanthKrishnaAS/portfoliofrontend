import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import p1 from '../assets/image/p1.jpg';
import p2 from '../assets/image/p2.jpg';
import p3 from '../assets/image/p3.jpg';
import p5 from '../assets/image/p5.jpg';

gsap.registerPlugin(ScrollTrigger);

const ParallaxBackground = () => {
  const containerRef = useRef(null);
  const colorOverlayRef = useRef(null);
  const particlesRef = useRef(null);
  const particlesRef2 = useRef(null);
  const thunderRef = useRef(null);
  const thunderRef2 = useRef(null);
  const thunderHangRef = useRef(null);
  const lightningLinesRef = useRef(null);

  useEffect(() => {

    // Use gsap.context for proper cleanup. REMOVED SCOPE to ensure global ID selectors work.
    const ctx = gsap.context(() => {
      // Create multiple particle systems
      createParticles();
      createParticles2();



      // Hero section - Dawn to Morning - Enhanced parallax
      gsap.fromTo(
        '.layer-hero-1',
        { y: 0, scale: 1.2, rotation: 0.5, x: 0 },
        {
          y: 500,
          scale: 1.5,
          rotation: 1.2,
          x: 50,
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.layer-hero-2',
        { y: 0, scale: 1.1, rotation: -0.5, x: 0 },
        {
          y: 350,
          scale: 1.4,
          rotation: -1.2,
          x: -40,
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // Hero to About transition - REMOVED FILTERS
      gsap.to('.layer-hero-1, .layer-hero-2', {
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'top 40%',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.layer-about-1, .layer-about-2',
        {
          opacity: 0,
          scale: 1.1
        },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // About section - Morning Light - Enhanced parallax
      gsap.fromTo(
        '.layer-about-1',
        { y: 0, scale: 1.1, rotation: 0.3, x: 0 },
        {
          y: 450,
          scale: 1.3,
          rotation: 0.8,
          x: 60,
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.layer-about-2',
        { y: 0, scale: 1.05, rotation: -0.3, x: 0 },
        {
          y: 300,
          scale: 1.25,
          rotation: -0.8,
          x: -50,
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // About to Projects transition - REMOVED FILTERS
      gsap.to('.layer-about-1, .layer-about-2', {
        opacity: 0,
        scrollTrigger: {
          trigger: '#projects',
          start: 'top bottom',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.layer-projects-1, .layer-projects-2',
        {
          opacity: 0,
          scale: 1.15
        },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: '#projects',
            start: 'top bottom',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Projects section - Golden Hour - Enhanced parallax
      gsap.fromTo(
        '.layer-projects-1',
        { y: 0, scale: 1.1, rotation: 0.2, x: 0 },
        {
          y: 400,
          scale: 1.4,
          rotation: 0.6,
          x: 70,
          scrollTrigger: {
            trigger: '#projects',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.layer-projects-2',
        { y: 0, scale: 1.05, rotation: -0.2, x: 0 },
        {
          y: 280,
          scale: 1.3,
          rotation: -0.6,
          x: -60,
          scrollTrigger: {
            trigger: '#projects',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // Projects to Skills transition - REMOVED FILTERS
      gsap.to('.layer-projects-1, .layer-projects-2', {
        opacity: 0,
        scrollTrigger: {
          trigger: '#skills',
          start: 'top bottom',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.layer-skills-1, .layer-skills-2',
        {
          opacity: 0,
          scale: 1.2
        },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: '#skills',
            start: 'top bottom',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Skills section - Sunset - Enhanced parallax
      gsap.fromTo(
        '.layer-skills-1',
        { y: 0, scale: 1.08, rotation: 0.1, x: 0 },
        {
          y: 380,
          scale: 1.35,
          rotation: 0.4,
          x: 80,
          scrollTrigger: {
            trigger: '#skills',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.layer-skills-2',
        { y: 0, scale: 1.04, rotation: -0.1, x: 0 },
        {
          y: 250,
          scale: 1.25,
          rotation: -0.4,
          x: -70,
          scrollTrigger: {
            trigger: '#skills',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // Skills to Contact transition - REMOVED FILTERS
      gsap.to('.layer-skills-1, .layer-skills-2', {
        opacity: 0,
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'top 30%',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.layer-contact-1, .layer-contact-2',
        {
          opacity: 0,
          scale: 1.25
        },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Contact section - Night - Enhanced parallax
      gsap.fromTo(
        '.layer-contact-1',
        { y: 0, scale: 1.05, x: 0, rotation: 0 },
        {
          y: 320,
          scale: 1.3,
          x: 50,
          rotation: 0.2,
          scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.layer-contact-2',
        { y: 0, scale: 1.02, x: 0, rotation: 0 },
        {
          y: 220,
          scale: 1.2,
          x: -40,
          rotation: -0.2,
          scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // Color overlay transitions
      const overlays = [
        {
          trigger: '#hero',
          colors: 'linear-gradient(135deg, rgba(0, 40, 85, 0.8) 0%, rgba(100, 180, 255, 0.3) 50%, rgba(0, 40, 85, 0.8) 100%)'
        },
        {
          trigger: '#about',
          colors: 'linear-gradient(135deg, rgba(255, 240, 180, 0.6) 0%, rgba(255, 220, 100, 0.4) 50%, rgba(255, 240, 180, 0.6) 100%)'
        },
        {
          trigger: '#projects',
          colors: 'linear-gradient(135deg, rgba(255, 200, 120, 0.7) 0%, rgba(255, 140, 60, 0.5) 50%, rgba(255, 200, 120, 0.7) 100%)'
        },
        {
          trigger: '#skills',
          colors: 'linear-gradient(135deg, rgba(255, 100, 80, 0.8) 0%, rgba(200, 60, 40, 0.6) 50%, rgba(255, 100, 80, 0.8) 100%)'
        },
        {
          trigger: '#contact',
          colors: 'linear-gradient(135deg, rgba(20, 30, 120, 0.9) 0%, rgba(40, 20, 80, 0.7) 50%, rgba(10, 10, 40, 0.9) 100%)'
        }
      ];

      overlays.forEach(({ trigger, colors }) => {
        gsap.to(colorOverlayRef.current, {
          background: colors,
          scrollTrigger: {
            trigger,
            start: 'top 40%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      });

      // Enhanced particle animation - visible throughout but more intense at night
      gsap.to(particlesRef.current, {
        opacity: 0.5,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(particlesRef.current, {
        opacity: 0.85,
        scrollTrigger: {
          trigger: '#contact',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Second particle layer animation
      gsap.to(particlesRef2.current, {
        opacity: 0.4,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(particlesRef2.current, {
        opacity: 0.75,
        scrollTrigger: {
          trigger: '#contact',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    }); // Changed: Removed containerRef scope so ID selectors work globally

    return () => {
      ctx.revert();

    };
  }, []);

  const createParticles = () => {
    if (particlesRef.current) {
      // Clear existing particles first
      particlesRef.current.innerHTML = '';

      const particleCount = 50; // Optimized for performance

      const fragment = document.createDocumentFragment();

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1; // Slightly larger to compensate for fewer particles
        const opacity = Math.random() * 0.5 + 0.2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `rgba(255, 255, 255, ${opacity})`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        // REMOVED box-shadow for performance
        // REMOVED dynamic filter blur for performance - use static opacity/size instead
        particle.style.pointerEvents = 'none';
        particle.style.willChange = 'transform, opacity';
        particle.style.transform = 'translate3d(0,0,0)'; // Enforce GPU

        fragment.appendChild(particle);

        // Optimized: Simple movement
        const moveX = Math.random() * 100 - 50;
        const moveY = Math.random() * 100 - 50;
        const duration = Math.random() * 15 + 10; // Slower, smoother

        gsap.to(particle, {
          x: moveX,
          y: moveY,
          opacity: opacity * 0.5,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true
        });
      }

      particlesRef.current.appendChild(fragment);
    }
  };

  const createParticles2 = () => {
    if (particlesRef2.current) {
      particlesRef2.current.innerHTML = '';

      const particleCount = 30; // DRASTICALLY Optimized (was 100)
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        // Simplified colors
        const colorVariation = Math.random();
        let color;
        if (colorVariation > 0.8) {
          color = `rgba(200, 220, 255, ${opacity})`;
        } else if (colorVariation > 0.6) {
          color = `rgba(255, 250, 200, ${opacity})`;
        } else {
          color = `rgba(255, 255, 255, ${opacity})`;
        }

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        // REMOVED box-shadow
        // REMOVED filter blur
        particle.style.pointerEvents = 'none';
        particle.style.willChange = 'transform, opacity';
        particle.style.transform = 'translate3d(0,0,0)';

        fragment.appendChild(particle);

        const moveX = Math.random() * 80 - 40;
        const moveY = Math.random() * 80 - 40;
        const duration = Math.random() * 15 + 8;

        gsap.to(particle, {
          x: moveX,
          y: moveY,
          opacity: opacity * 0.4,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          force3D: true
        });
      }

      particlesRef2.current.appendChild(fragment);
    }
  };

  // Inline styles for the component
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: -1,
      overflow: 'hidden',
      perspective: '1000px',
      willChange: 'transform',
      transform: 'translateZ(0)', // GPU acceleration
    },
    layer: {
      position: 'absolute',
      top: '-10%',
      left: '-10%',
      width: '120%',
      height: '120%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      willChange: 'transform, opacity',
      transformStyle: 'preserve-3d',
      transition: 'filter 0.3s ease',
    },
    hero1: { zIndex: 1, transform: 'translateZ(-400px) scale(1.5)' },
    hero2: { zIndex: 2, transform: 'translateZ(-300px) scale(1.4)' },
    about1: { zIndex: 3, transform: 'translateZ(-200px) scale(1.3)' },
    about2: { zIndex: 4, transform: 'translateZ(-100px) scale(1.2)' },
    projects1: { zIndex: 5, transform: 'translateZ(-150px) scale(1.25)' },
    projects2: { zIndex: 6, transform: 'translateZ(-50px) scale(1.15)' },
    skills1: { zIndex: 7, transform: 'translateZ(-120px) scale(1.22)' },
    skills2: { zIndex: 8, transform: 'translateZ(-20px) scale(1.12)' },
    contact1: { zIndex: 9, transform: 'translateZ(-100px) scale(1.2)' },
    contact2: { zIndex: 10, transform: 'translateZ(0) scale(1.1)' },
    colorOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 11,
      background: 'linear-gradient(135deg, rgba(0, 10, 20, 0.7) 0%, rgba(0, 30, 60, 0.5) 50%, rgba(0, 20, 40, 0.7) 100%)',
      mixBlendMode: 'overlay',
      transition: 'background 1s ease',
    },
    darkOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 12,
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 20%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0.9) 100%)',
      pointerEvents: 'none',
    },
    particleOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 13,
      pointerEvents: 'none',
      opacity: 0.6,
      willChange: 'opacity',
      transform: 'translateZ(0)', // GPU acceleration
    },
    particleOverlay2: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 14,
      pointerEvents: 'none',
      opacity: 0.5,
      willChange: 'opacity',
      transform: 'translateZ(0)', // GPU acceleration
    },
    lightRays: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    thunderOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 15,
      // Cool Atmospheric Glow (Red/Violet)
      background: 'linear-gradient(135deg, rgba(255, 100, 100, 0.75) 0%, rgba(140, 100, 255, 0.3) 50%, rgba(100, 100, 255, 0.4) 100%)',
      opacity: 0.4,
      pointerEvents: 'none',
      mixBlendMode: 'color-dodge', // Better for "lighting up" the scene
      filter: 'blur(30px)', // Soften the light source
    },
    thunderOverlay2: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 16,
      background: 'linear-gradient(45deg, rgba(180, 200, 255, 1) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(220, 240, 255, 0.8) 100%)',
      opacity: 0,
      pointerEvents: 'none',
      mixBlendMode: 'overlay',
      filter: 'blur(2px)',
    },
    thunderHang: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 17,
      background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, rgba(200, 220, 255, 0.2) 30%, transparent 70%)',
      opacity: 0,
      pointerEvents: 'none',
      mixBlendMode: 'screen',
      filter: 'blur(3px)',
    },
    lightningContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 18,
      pointerEvents: 'none',
      overflow: 'hidden',
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Light rays effect */}
      <div style={styles.lightRays} />

      {/* Hero - Dawn */}
      <div
        className="parallax-layer layer-hero-1"
        style={{
          ...styles.layer,
          ...styles.hero1,
          backgroundImage: `url(${p5})`,
        }}
      />
      <div
        className="parallax-layer layer-hero-2"
        style={{
          ...styles.layer,
          ...styles.hero2,
          backgroundImage: `url(${p5})`,
        }}
      />

      {/* About - Morning */}
      <div
        className="parallax-layer layer-about-1"
        style={{
          ...styles.layer,
          ...styles.about1,
          backgroundImage: `url(${p1})`,
        }}
      />
      <div
        className="parallax-layer layer-about-2"
        style={{
          ...styles.layer,
          ...styles.about2,
          backgroundImage: `url(${p1})`,
        }}
      />

      {/* Projects - Golden Hour */}
      <div
        className="parallax-layer layer-projects-1"
        style={{
          ...styles.layer,
          ...styles.projects1,
          backgroundImage: `url(${p1})`,
        }}
      />
      <div
        className="parallax-layer layer-projects-2"
        style={{
          ...styles.layer,
          ...styles.projects2,
          backgroundImage: `url(${p1})`,
        }}
      />

      {/* Skills - Sunset */}
      <div
        className="parallax-layer layer-skills-1"
        style={{
          ...styles.layer,
          ...styles.skills1,
          backgroundImage: `url(${p3})`,
        }}
      />
      <div
        className="parallax-layer layer-skills-2"
        style={{
          ...styles.layer,
          ...styles.skills2,
          backgroundImage: `url(${p3})`,
        }}
      />

      {/* Contact - Night */}
      <div
        className="parallax-layer layer-contact-1"
        style={{
          ...styles.layer,
          ...styles.contact1,
          backgroundImage: `url(${p2})`,
        }}
      />
      <div
        className="parallax-layer layer-contact-2"
        style={{
          ...styles.layer,
          ...styles.contact2,
          backgroundImage: `url(${p2})`,
        }}
      />

      {/* Enhanced overlays */}
      <div ref={colorOverlayRef} style={styles.colorOverlay} />
      <div style={styles.darkOverlay} />

      {/* Particle systems - Multiple layers */}
      <div ref={particlesRef} style={styles.particleOverlay} />
      <div ref={particlesRef2} style={styles.particleOverlay2} />

      {/* Thunder effects - Multiple layers for more dramatic effect */}
      <div ref={thunderRef} style={styles.thunderOverlay} />
      <div ref={thunderRef2} style={styles.thunderOverlay2} />

      {/* Thunder hang effect - Lingering glow */}
      <div ref={thunderHangRef} style={styles.thunderHang} />

      {/* Lightning bolt lines */}
      <div ref={lightningLinesRef} style={styles.lightningContainer} />
    </div>
  );
};

export default ParallaxBackground;