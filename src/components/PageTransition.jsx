import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './PageTransition.css';

const PageTransition = () => {
    const overlayRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(overlayRef.current, { visibility: 'hidden' });
            }
        });

        tl.set(overlayRef.current, { visibility: 'visible' })
        
            // Phase 1: Clean background slide up
            .fromTo('.transition-bg',
                { top: "100%" },
                { top: "0%", duration: 0.8, ease: "power4.inOut" }
            )
        
            // Phase 2: Simple elegant fade & slide for text
            .fromTo('.transition-char',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.03,
                    ease: "power3.out"
                },
                "-=0.3"
            )
        
            // Phase 3: Hold 
            .to({}, { duration: 0.8 })
        
            // Phase 4: Text Exit
            .to('.transition-char', {
                opacity: 0,
                y: -30,
                duration: 0.4,
                stagger: 0.02,
                ease: "power3.in"
            })
        
            // Phase 5: Background slide up and out
            .to('.transition-bg', {
                top: "-100%",
                duration: 0.8,
                ease: "power4.inOut"
            }, "-=0.1");

        return () => {
            tl.kill();
        };
    }, []);

    const name = "ASWANTH KRISHNA";

    return (
        <div ref={overlayRef} className="page-transition-overlay">
            <div className="transition-bg"></div>
            
            <div className="transition-content">
                <h1 className="transition-title">
                    {name.split("").map((char, i) => (
                        <span key={i} className="transition-char">
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h1>
            </div>
        </div>
    );
};

export default PageTransition;
