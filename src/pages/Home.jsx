import { useState, useEffect } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';
import SmoothScroll from '../components/SmoothScroll';
import Cursor from '../components/Cursor';
import ParallaxBackground from '../components/ParallaxBackground';
import SoundControl from '../components/SoundControl';
import ChatBot from '../components/ChatBot';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import { useAudio } from '../context/AudioContext';
import { gsap } from 'gsap';



function Home() {
  const { isPlaying, toggleAudio, setAudioState } = useAudio();

  useEffect(() => {
    // Ensure scrolling is enabled when coming to home
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';

    // Prevent huge jumps when the tab is inactive or heavy tasks run
    gsap.ticker.lagSmoothing(1000, 16);

    // Trigger a resize event to ensure parallax and GSAP triggers are correct
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  }, []);

  return (
    <div className="App home-page-container">

      <SmoothScroll>
        <Cursor />
        <ParallaxBackground />
        <Navigation />
        <SoundControl isPlaying={isPlaying} toggleAudio={toggleAudio} />
        {/* <ChatBot setAudioState={setAudioState} /> */}
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </SmoothScroll>
    </div >
  );
}

export default Home;
