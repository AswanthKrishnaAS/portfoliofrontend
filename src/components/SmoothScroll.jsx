import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children, locked }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Consistent "buttery" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Handle initial lock state
    if (locked) lenis.stop();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (locked) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [locked]);

  return (
    <div className="smooth-scroll-container">
      {children}
    </div>
  );
};

export default SmoothScroll;


