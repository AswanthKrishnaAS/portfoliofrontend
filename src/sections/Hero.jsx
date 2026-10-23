import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { portfolioData } from '../data/mock';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Split text into characters for a smoother animation reveal
    const title = titleRef.current;
    const text = title.textContent.trim();
    const words = text.split(' ');

    title.innerHTML = words.map(word => {
      const chars = word.split('').map(char =>
        `<span class="char" style="display: inline-block">${char}</span>`
      ).join('');
      return `<span class="word" style="display: inline-block; white-space: nowrap">${chars}</span>`;
    }).join(' ');

    const charElements = title.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        opacity: 0,
        x: -100, // Left to right
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        stagger: 0.04,
        delay: 0.5,
        ease: 'power4.out',
        force3D: true
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, x: -50 }, // Left to right
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        delay: 1.2,
        ease: 'power3.out'
      }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, x: -30, scale: 0.9 }, // Left to right
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        delay: 1.8,
        ease: 'power3.out'
      }
    );
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          {portfolioData.personal.name}
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          {portfolioData.personal.tagline}
        </p>
        <div ref={ctaRef} className="hero-cta">
          <button onClick={scrollToProjects} className="cta-button">
            View My Work
            <ArrowRight className="cta-icon" />
          </button>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
