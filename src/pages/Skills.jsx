import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/mock';
import { Code, Palette, Sparkles, Zap } from 'lucide-react';
import Navigation from "../components/Navigation";
import Footer from "../sections/Footer";
import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import DotBackground from "../components/DotBackground";
import skillBg from '../assets/image/skbg.jpg';
import { useAudio } from "../context/AudioContext";
import SoundControl from "../components/SoundControl";
import ChatBot from "../components/ChatBot";
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
  const bgRef = useRef(null);

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

    // Services animation
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

    // Skills animation
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

  return (
    <div className="App">
      <SmoothScroll>
        <Cursor />
        <Navigation />
        <SoundControl isPlaying={isPlaying} toggleAudio={toggleAudio} />
        <ChatBot setAudioState={setAudioState} />
        <DotBackground />

        <div className="skills-image-bg">
          <img ref={bgRef} src={skillBg} alt="background" />
          <div className="bg-overlay"></div>
        </div>

        <section className="skills-section">
          <div className="section-container">
            <h1 ref={titleRef} className="section-title">
              Skills & Services
            </h1>

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

            <div className="skills-content-wrapper">
              <h2 className="skills-subtitle">Technical Skills</h2>
              <div className="skills-categories">
                {portfolioData.skills.map((skillCategory, index) => (
                  <div
                    key={index}
                    ref={(el) => (skillsRef.current[index] = el)}
                    className="skill-category"
                  >
                    <h3 className="category-title">{skillCategory.category}</h3>
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
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Skills;
