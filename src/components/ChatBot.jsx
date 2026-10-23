
import React, { useState } from 'react';
import './ChatBot.css';
import GeminiChat from '../pages/ChatPage';

const ChatBot = ({ setAudioState }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState) {
            document.body.classList.add('no-custom-cursor');
        } else {
            document.body.classList.remove('no-custom-cursor');
        }

        // If opening (newState is true), turn sound OFF (pass false).
        // If closing (newState is false), turn sound ON (pass true).
        if (setAudioState) {
            setAudioState(!newState);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        document.body.classList.remove('no-custom-cursor');
        // Force sound ON when closing from inside the chat
        if (setAudioState) {
            setAudioState(true);
        }
    };

    React.useEffect(() => {
        return () => {
            document.body.classList.remove('no-custom-cursor');
        };
    }, []);


    return (
        <>
            {isOpen && <GeminiChat onClose={handleClose} />}

            <div
                className="chatbot-wrapper"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }}
            >
                <button
                    className="chatbot-button"
                    style={{
                        background: isOpen ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(5px)',
                        border: isOpen ? '1px solid #00ff88' : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        color: isOpen ? '#00ff88' : '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: isOpen ? '0 0 20px rgba(0, 255, 136, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        if (!isOpen) {
                            e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.3)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.borderColor = '#00ff88';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isOpen) {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }
                    }}
                    onClick={handleToggle}
                >
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="10" rx="2" />
                            <circle cx="12" cy="5" r="2" />
                            <path d="M12 7v4" />
                            <line x1="8" y1="16" x2="8" y2="16" />
                            <line x1="16" y1="16" x2="16" y2="16" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
};

export default ChatBot;
