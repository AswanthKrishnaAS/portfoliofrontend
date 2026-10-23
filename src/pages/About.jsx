import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/mock";
import Navigation from "../components/Navigation";
import Footer from "../sections/Footer";
import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import DotBackground from "../components/DotBackground";
import myImg from '../assets/image/myimg.png';
import abBg from '../assets/image/abbg.jpg';
import { useAudio } from "../context/AudioContext";
import SoundControl from "../components/SoundControl";
import ChatBot from "../components/ChatBot";
import "./About.css";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const bgRef = useRef(null);

  const { isPlaying, toggleAudio, setAudioState } = useAudio();

  useEffect(() => {
    window.scrollTo(0, 0);


    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      }
    );

    // Background Image Animation
    gsap.to(bgRef.current, {
      scale: 1.05, // Slightly reduced scale for performance
      duration: 25, // More gradual animation
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true // Hardware acceleration
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

        <div className="about-image-bg">
          <img ref={bgRef} src={abBg} alt="background" />
          <div className="bg-overlay"></div>
        </div>
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
                    <span className="detail-value">
                      {portfolioData.personal.title}
                    </span>
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
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default About;
