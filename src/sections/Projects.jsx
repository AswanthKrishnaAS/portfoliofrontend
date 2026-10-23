import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/mock';
import { ExternalLink } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const titleRef = useRef(null);
  const websiteProjectsRef = useRef([]);
  const figmaProjectsRef = useRef([]);
  const subheadingRefs = useRef([]);

  useEffect(() => {
    // Character reveal for the title
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
          x: -80,
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

    // Subheading Animation
    subheadingRefs.current.forEach((sub, index) => {
      if (sub) {
        gsap.fromTo(
          sub,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: sub,
              start: 'top 90%',
            }
          }
        );
      }
    });

    // Animate Website Projects
    websiteProjectsRef.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(
          project,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: project,
              start: 'top 85%',
            },
            force3D: true
          }
        );
      }
    });

    // Animate Figma Projects
    figmaProjectsRef.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(
          project,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: project,
              start: 'top 85%',
            },
            force3D: true
          }
        );
      }
    });
  }, []);

  const renderProjectCard = (project, index, refArray) => (
    <div
      key={project.id}
      ref={(el) => (refArray.current[index] = el)}
      className="project-card"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <div className="project-links">
            <a href={project.link} className="project-link" aria-label="View project" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="project-info">
        <h3 className="project-name">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <h2 ref={titleRef} className="section-title">
          Featured Projects
        </h2>

        {/* Website Category */}
        <div className="category-header">
          <h3 ref={el => subheadingRefs.current[0] = el} className="project-category-title">
            Website Development
          </h3>
          <div className="category-line"></div>
        </div>
        <div className="projects-grid">
          {portfolioData.projects.website.map((project, index) =>
            renderProjectCard(project, index, websiteProjectsRef)
          )}
        </div>

        {/* Figma UI Category */}
        <div className="category-header figma-category">
          <h3 ref={el => subheadingRefs.current[1] = el} className="project-category-title">
            Figma UI Designs
          </h3>
          <div className="category-line"></div>
        </div>
        <div className="projects-grid">
          {portfolioData.projects.figma.map((project, index) =>
            renderProjectCard(project, index, figmaProjectsRef)
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
