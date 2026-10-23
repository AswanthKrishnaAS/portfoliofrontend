import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const hoverEffect = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(follower, { scale: 1.5, duration: 0.2 });
    };

    const unhoverEffect = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', hoverEffect);
      link.addEventListener('mouseleave', unhoverEffect);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', hoverEffect);
        link.removeEventListener('mouseleave', unhoverEffect);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
};

export default Cursor;
