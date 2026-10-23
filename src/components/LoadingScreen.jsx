import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { updateViewCount } from '../api/viewapi';
import lndy from '../assets/image/lndy.webp';
import './LoadingScreen.css';

const splitText = (text) => {
    return text.split(' ').map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="char" style={{ display: 'inline-block' }}>
                        {char}
                    </span>
                ))}
            </span>
            {wordIndex < text.split(' ').length - 1 && (
                <span className="char space" style={{ display: 'inline-block' }}>&nbsp;</span>
            )}
        </React.Fragment>
    ));
};

const LoadingScreen = ({ onEnter }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const canvasRef = useRef(null);
    const bgRef = useRef(null);
    const exitPathRef = useRef(null);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Background Image Animation
        if (bgRef.current) {
            gsap.to(bgRef.current, {
                scale: 1.1,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Lock body and html scroll
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';


        // Removed aggressive event listeners


        // Initial entrance animation
        const ctx = gsap.context(() => {
            gsap.from('.main-title .char', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: 'power4.out',
                delay: 0.2
            });

            gsap.from('.sub-title .char', {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.03,
                ease: 'power3.out',
                delay: 1.5
            });

            gsap.from('.enter-button', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 1
            });
        }, containerRef);

        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';

            ctx.revert();
        };
    }, []);

    // Canvas Animation Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.1})`; // Cyan/Greenish tech color
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(window.innerWidth / 20, 60); // Responsive count optimized
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const connectionDistance = 150;
            const sqDistance = connectionDistance * connectionDistance;

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                p.draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < sqDistance) {
                        const distance = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleEnterClick = () => {
        if (isExiting) return;
        setIsExiting(true);

        const trackSubmission = async () => {
            let ipAddress = 'Unknown';
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                ipAddress = data.ip;
            } catch (err) {
                console.log('IP fetch failed:', err);
            }
            
            updateViewCount(true, {
                ipAddress,
                browserInfo: navigator.userAgent
            }).catch(console.error);
        };
        trackSubmission();

        const ctx = gsap.context(() => {
            // Exit animation
            const tl = gsap.timeline({
                onComplete: onEnter
            });

            tl.to('.main-title .char', {
                y: -50,
                opacity: 0,
                stagger: 0.02,
                duration: 0.4,
                ease: 'power3.in'
            })
                .to('.sub-title .char', {
                    y: -30,
                    opacity: 0,
                    stagger: 0.02,
                    duration: 0.4,
                    ease: 'power3.in'
                }, '<0.2')
                .to('.enter-button', {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.in'
                }, '<')
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, "-=0.2")
                .to(exitPathRef.current, {
                    attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
                    duration: 0.6,
                    ease: "power2.in"
                }, "-=0.8")
                .to(exitPathRef.current, {
                    attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
                    duration: 0.4,
                    ease: "power2.out"
                });

        }, containerRef);
    };

    return (
        <div className="loading-screen" ref={containerRef} onClick={handleEnterClick}>
            <div className="loading-bg">
                <img ref={bgRef} src={lndy} alt="background" />
                <div className="loading-bg-overlay"></div>
            </div>
            <canvas ref={canvasRef} className="loading-canvas"></canvas>
            <div className="loading-content" ref={contentRef}>
                <div className="loading-text-container">
                    <h1 className="main-title">
                        {splitText("WELCOME TO MY UNIVERSE")}
                    </h1>
                    <p className="sub-title">
                        {splitText("DISCOVER MORE")}
                    </p>
                </div>

                <button className="enter-button" onClick={handleEnterClick}>
                    <span className="btn-text">EXPLORE</span>
                    <div className="btn-glow"></div>
                </button>


            </div>
            <div className="loading-overlay"></div>

            {/* Exit Liquid Effect */}
            <svg className="loading-exit-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path ref={exitPathRef} d="M 0 100 V 100 Q 50 100 100 100 V 100 z" fill="#000" />
            </svg>
        </div>

    );
};

export default LoadingScreen;
