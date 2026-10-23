import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/mock';
import { ExternalLink } from 'lucide-react';
import Navigation from "../components/Navigation";
import Footer from "../sections/Footer";
import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import DotBackground from "../components/DotBackground";
import projBg from '../assets/image/probg.jpg';
import { useAudio } from "../context/AudioContext";
import SoundControl from "../components/SoundControl";
import ChatBot from "../components/ChatBot";
import './Projects.css';


gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const titleRef = useRef(null);
  const websiteProjectsRef = useRef([]);
  const figmaProjectsRef = useRef([]);
  const bgRef = useRef(null);
  const subheadingRefs = useRef([]);

  const { isPlaying, toggleAudio, setAudioState } = useAudio();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      }
    );

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

    // Website Projects animation
    websiteProjectsRef.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(
          project,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: project,
              start: 'top 85%',
            },
          }
        );
      }
    });

    // Figma Projects animation
    figmaProjectsRef.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(
          project,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: project,
              start: 'top 85%',
            },
          }
        );
      }
    });

    // Background Image Animation
    gsap.to(bgRef.current, {
      scale: 1.05,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true
    });
  }, []);

  const renderProjectCard = (project, index, refArray) => (
    <div
      key={project.id}
      ref={(el) => (refArray.current[index] = el)}
      className="project-card"
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
    <div className="App">
      <SmoothScroll>
        <Cursor />
        <Navigation />
        <SoundControl isPlaying={isPlaying} toggleAudio={toggleAudio} />
        <ChatBot setAudioState={setAudioState} />
        <DotBackground />

        <div className="projects-image-bg">
          <img ref={bgRef} src={projBg} alt="background" />
          <div className="bg-overlay"></div>
        </div>

        <section className="projects-section">
          <div className="section-container">
            <h1 ref={titleRef} className="section-title">
              Featured Projects
            </h1>

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
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Projects;
