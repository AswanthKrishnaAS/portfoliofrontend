import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/mock';
import './About.css';

import myImg from '../assets/image/myimg.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Character reveal for the About title
    const title = titleRef.current;
    if (title) {
      const text = title.textContent.trim();
      title.innerHTML = text.split('').map(char =>
        `<span class="char" style="display: inline-block; transform-style: preserve-3d; backface-visibility: hidden;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      const chars = title.querySelectorAll('.char');

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          x: -80, // Left to right
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.03,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          }
        }
      );
    }

    // Content entrance
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.5,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.8,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <h2 ref={titleRef} className="section-title">
          About Me
        </h2>
        <div className="about-grid">
          <div ref={contentRef} className="about-content">
            <p className="about-text">{portfolioData.personal.bio}</p>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Role</span>
                <span className="detail-value">{portfolioData.personal.title}</span>
              </div>
            </div>
          </div>
          <div ref={imageRef} className="about-image">
            <img
              src={myImg}
              alt="About"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
