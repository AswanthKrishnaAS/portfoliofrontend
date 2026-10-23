import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/mock';
import { Code, Palette, Sparkles, Zap } from 'lucide-react';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Code: Code,
  Palette: Palette,
  Sparkles: Sparkles,
  Zap: Zap,
};

const Skills = () => {
  const titleRef = useRef(null);
  const servicesRef = useRef([]);
  const skillsRef = useRef([]);

  const subtitleRef = useRef(null);

  useEffect(() => {
    // Character reveal for titles
    const titles = [titleRef.current, subtitleRef.current];
    titles.forEach(title => {
      if (!title) return;
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
    });

    servicesRef.current.forEach((service, index) => {
      if (service) {
        gsap.fromTo(
          service,
          { opacity: 0, scale: 0.8, rotation: -5 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: service,
              start: 'top 85%',
            },
          }
        );
      }
    });

    skillsRef.current.forEach((skill, index) => {
      if (skill) {
        gsap.fromTo(
          skill,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: skill,
              start: 'top 85%',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <h2 ref={titleRef} className="section-title">
          Skills & Services
        </h2>

        <div className="services-grid">
          {portfolioData.services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={index}
                ref={(el) => (servicesRef.current[index] = el)}
                className="service-card"
              >
                <div className="service-icon">
                  {IconComponent && <IconComponent size={40} />}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="skills-section-inner">
          <h3 ref={subtitleRef} className="skills-subtitle">Technical Skills</h3>
          <div className="skills-categories">
            {portfolioData.skills.map((skillCategory, index) => (
              <div
                key={index}
                ref={(el) => (skillsRef.current[index] = el)}
                className="skill-category"
              >
                <h4 className="category-title">{skillCategory.category}</h4>
                <div className="skills-list">
                  {skillCategory.items.map((skill, idx) => (
                    <span key={idx} className="skill-item" title={typeof skill === 'object' ? skill.description : ''}>
                      {typeof skill === 'object' ? `${skill.name} - ${skill.experience}` : skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
