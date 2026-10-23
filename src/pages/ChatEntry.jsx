import React, { useState, useEffect } from 'react';
import { User, MessageCircle, ArrowRight, UserCircle2, Download, Shield, Zap, Globe, Lock, Sparkles, ChevronLeft, ChevronRight, Users, Share2, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ChatEntry.css';
import chatHero from '../assets/image/chat.jpg';
import fPrivacy from '../assets/image/f_privacy.png';
import fCalling from '../assets/image/f_calling.png';
import fGroups from '../assets/image/f_groups.png';
import fCommunities from '../assets/image/f_communities.png';
import fStatus from '../assets/image/f_status.png';
import fVoice from '../assets/image/f_voice.png';

const ChatEntry = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', gender: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        if (formData.name && formData.gender) {
            try {
                const response = await fetch(`${apiUrl}/api/chat-users/initiate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setIsSubmitted(true);
                    setTimeout(() => {
                        navigate('/chat');
                    }, 2500);
                } else {
                    console.error('Failed to initiate chat session');
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Connection error:', error);
                alert('Connection error. Please check your internet.');
            }
        }
    };

    const carouselRef = React.useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 400;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const features = [
        { id: 1, title: 'Privacy', desc: 'Encrypted chats.', img: fPrivacy, icon: <Shield size={18} /> },
        { id: 2, title: 'Calling', desc: 'HD Voice & Video.', img: fCalling, icon: <Mic size={18} /> },
        { id: 3, title: 'Groups', desc: 'Connect everyone.', img: fGroups, icon: <Users size={18} /> },
        { id: 4, title: 'Communities', desc: 'Organize groups.', img: fCommunities, icon: <Globe size={18} /> },
        { id: 5, title: 'Status', desc: 'Share moments.', img: fStatus, icon: <Share2 size={18} /> },
        { id: 6, title: 'Voice', desc: 'Fast messaging.', img: fVoice, icon: <Zap size={18} /> }
    ];

    return (
        <div className="chat-entry-page" style={{
            '--mouse-x': `${mousePos.x}px`,
            '--mouse-y': `${mousePos.y}px`
        }}>
            <div className="bg-glow"></div>

            <header className="entry-nav-header">
                <div className="entry-nav-logo">
                    <div className="logo-icon-wrap">
                        <MessageCircle className="text-green-400" size={24} />
                    </div>
                    <span>Chaties<span className="dot text-green-400">.</span></span>
                </div>
                <div className="entry-nav-actions">
                    <button className="entry-download-pill">
                        <Download size={16} />
                        <span>Download Mobile App</span>
                    </button>
                </div>
            </header>

            <main className="chat-entry-main">
                <div className="entry-grid-container">
                    <div className="entry-visual-side">
                        <div className="visual-experience-glass">
                            <div className="visual-badge">
                                <Sparkles size={14} />
                                <span>NEXT-GEN MESSAGING</span>
                            </div>
                            <h2 className="glitch-text">
                                Connect <br />
                                <span className="gradient-text">Beyond Limits.</span>
                            </h2>
                            <p className="description">
                                Experience a world where privacy meets perfection.
                                Secure, fast, and beautifully designed for those who value every word.
                            </p>
                            <div className="floating-mockup-area">
                                <div className="mockup-frame">
                                    <img src={chatHero} alt="Chat Previews" className="chat-previews-img" />
                                </div>
                                <div className="status-floating-card">
                                    <div className="pulse-dot"></div>
                                    <span>2.4k+ active chats now</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="entry-form-side">
                        <div className="chat-entry-card-premium">
                            <div className="card-header">
                                <div className="secure-tag"><Lock size={12} /> SECURE GATEWAY</div>
                                <h1>Get Started</h1>
                                <p>Begin your encrypted journey with us today.</p>
                            </div>

                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="chat-entry-form">
                                    <div className="premium-input-group">
                                        <div className="input-header">
                                            <label>FULL NAME</label>
                                            <Shield size={14} className="opacity-30" />
                                        </div>
                                        <div className="premium-input-wrapper">
                                            <User className="input-icon" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Type your name..."
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="premium-input-group">
                                        <div className="input-header">
                                            <label>GENDER IDENTITY</label>
                                            <Zap size={14} className="opacity-30" />
                                        </div>
                                        <div className="gender-grid">
                                            {['male', 'female', 'other'].map(g => (
                                                <button
                                                    key={g}
                                                    type="button"
                                                    className={`gender-select-btn ${formData.gender === g ? 'active' : ''}`}
                                                    onClick={() => setFormData({ ...formData, gender: g })}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button type="submit" className="grand-submit-btn" disabled={!formData.name || !formData.gender}>
                                        <div className="btn-shine"></div>
                                        <span>INITIATE CONNECTION</span>
                                        <ArrowRight size={20} />
                                    </button>
                                </form>
                            ) : (
                                <div className="pro-success-screen">
                                    <div className="loading-ring">
                                        <div className="ring-inner">
                                            <UserCircle2 size={40} className="text-green-400" />
                                        </div>
                                    </div>
                                    <h3>Welcome, {formData.name.split(' ')[0]}</h3>
                                    <p>Establishing quantum-secure channel...</p>
                                    <div className="status-bars">
                                        {[1, 2, 3].map(i => <div key={i} className="s-bar"></div>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Discover More Section */}

            </main>
            <section className="discover-features-section">
                <div className="discover-header">
                    <div className="discover-title">
                        <h2>Discover <br /> more features</h2>
                        <p>Explore the powerful tools integrated within Chataties.</p>
                    </div>
                    <div className="discover-nav">
                        <button className="nav-circle" onClick={() => scroll('left')}><ChevronLeft size={20} /></button>
                        <button className="nav-circle" onClick={() => scroll('right')}><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className="features-carousel-wrapper">
                    <div className="features-carousel-inner" ref={carouselRef}>
                        {features.map((f) => (
                            <div key={f.id} className="feature-card-sliding animate-glow">
                            <div className="feature-img-wrap">
                                <img src={f.img} alt={f.title} />
                                <div className="feature-icon-badge">{f.icon}</div>
                            </div>
                            <div className="feature-info-lifestyle">
                                <div className="f-title-row">
                                    <h3>{f.title}</h3>
                                    <span className="f-desc-tag">{f.desc}</span>
                                </div>
                                <a href="#" className="learn-more">Learn more <ArrowRight size={14} /></a>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
            <footer className="glass-footer">
                <div className="footer-content">
                    <div className="f-left">
                        <p>© 2026 CHATIES OPERATING SYSTEM</p>
                    </div>
                    <div className="f-right">
                        <a href="#">ENCRYPTION PROTOCOL</a>
                        <a href="#">DATA PROTECTION</a>
                        <a href="#">SYSTEM STATUS</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatEntry;
