import React from 'react';
import { createPortal } from 'react-dom';
import { X, Smartphone, Globe, Download } from 'lucide-react';
import './ChatModal.css';
import mockupImg from '../assets/image/mobile_app_mockup.png';

const ChatModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="chat-modal-overlay">
            <div className="chat-modal-container animate-up">
                <button className="chat-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="chat-modal-content">
                    <div className="chat-modal-left">
                        <img src={mockupImg} alt="Mobile App Mockup" className="app-mockup-img" />
                    </div>

                    <div className="chat-modal-right">
                        <div className="chat-modal-header">
                            <span className="badge">Beta Available</span>
                            <h2>Chat with Developer</h2>
                            <p>Connect instantly with our dedicated mobile experience or continue through your browser.</p>
                        </div>

                        <div className="chat-options-group">
                            <button className="chat-option-btn primary">
                                <Smartphone size={20} />
                                <div className="btn-text">
                                    <span>Download App</span>
                                    <small>Available for Android & iOS</small>
                                </div>
                                <Download size={16} className="btn-arrow" />
                            </button>

                            <button className="chat-option-btn secondary" onClick={() => {
                                window.open('/chat-entry', '_blank');
                                onClose();
                            }}>
                                <Globe size={20} />
                                <div className="btn-text">
                                    <span>Skip to Web Chat</span>
                                </div>
                            </button>
                        </div>

                        <div className="chat-modal-footer">
                            <p>Fast • Secure • Direct Access</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ChatModal;
