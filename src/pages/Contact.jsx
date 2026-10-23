import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/mock';
import { Mail, Linkedin, Send } from 'lucide-react';
import Navigation from "../components/Navigation";
import Footer from "../sections/Footer";
import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import DotBackground from "../components/DotBackground";
import contactBg from '../assets/image/conbg.jpg';
import { useAudio } from "../context/AudioContext";
import SoundControl from "../components/SoundControl";
import ChatBot from "../components/ChatBot";
import { createEnquiry } from '../api/enquiryapi';
import './Contact.css';


gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  const bgRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { isPlaying, toggleAudio, setAudioState } = useAudio();

  useEffect(() => {
    window.scrollTo(0, 0);


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

    // Form animation
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      }
    );

    // Social links animation
    gsap.fromTo(
      socialRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: socialRef.current,
          start: 'top 80%',
        },
      }
    );

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save enquiry directly to database
      await createEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: new Date().toISOString()
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="App">
      <SmoothScroll>
        <Cursor />
        <Navigation />
        <SoundControl isPlaying={isPlaying} toggleAudio={toggleAudio} />
        <ChatBot setAudioState={setAudioState} />
        <DotBackground />

        <div className="contact-image-bg">
          <img ref={bgRef} src={contactBg} alt="background" />
          <div className="bg-overlay"></div>
        </div>

        <section className="contact-section">
          <div className="section-container">
            <h1 ref={titleRef} className="section-title">
              Let's Connect
            </h1>
            <div className="contact-grid">
              <div ref={formRef} className="contact-form-wrapper">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Mobile Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="form-input"
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button" disabled={submitting || submitted}>
                    {submitting ? (
                      'Sending Message...'
                    ) : submitted ? (
                      'Message Sent Successfully!'
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              </div>
              <div ref={socialRef} className="contact-info">
                <div className="info-section">
                  <h3 className="info-title">Get in Touch</h3>
                  <p className="info-text">
                    I'm always open to discussing new projects, creative ideas, or
                    opportunities to be part of your vision.
                  </p>
                  <a href={`mailto:${portfolioData.personal.email}`} className="email-link">
                    <Mail size={24} />
                    {portfolioData.personal.email}
                  </a>
                </div>
                <div className="social-links-section">
                  <h3 className="info-title">Follow Me</h3>
                  <div className="social-icons">
                    <a
                      href={portfolioData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={28} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Contact;
