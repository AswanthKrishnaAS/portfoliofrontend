import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Paperclip, Smile, Search, ArrowLeft, CheckCheck } from 'lucide-react';
import './ChatPage.css';

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { id: 1, sender: 'system', text: 'Quantum Encrypted Connection Established. Welcome to Chaties.', time: '12:00' },
        { id: 2, sender: 'other', text: 'Hey! Glad you made it. How can I help you today?', time: '12:01', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }
    ]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const newMessage = {
                id: Date.now(),
                sender: 'me',
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'sent'
            };
            setChatHistory([...chatHistory, newMessage]);
            setMessage('');

            setTimeout(() => {
                const reply = {
                    id: Date.now() + 1,
                    sender: 'other',
                    text: 'That sounds interesting! Tell me more.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
                };
                setChatHistory(prev => [...prev, reply]);
            }, 1500);
        }
    };

    return (
        <div className="chat-interface">
            <div className="chat-blur-bg"></div>

            <aside className="chat-sidebar">
                <div className="sidebar-header">
                    <h2>Chaties</h2>
                    <div className="search-wrap">
                        <Search size={16} />
                        <input type="text" placeholder="Search conversations..." />
                    </div>
                </div>
                <div className="conversations-list">
                    <div className="conv-item active">
                        <div className="avatar-wrap online">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Support" />
                        </div>
                        <div className="conv-info">
                            <div className="conv-name">Support Team</div>
                            <div className="conv-last">How can I help you?</div>
                        </div>
                        <div className="conv-meta">
                            <div className="time">12:01</div>
                            <div className="unread">1</div>
                        </div>
                    </div>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="conv-item">
                            <div className="avatar-wrap">
                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                            </div>
                            <div className="conv-info">
                                <div className="conv-name">Quantum User {i}</div>
                                <div className="conv-last">Encrypted message...</div>
                            </div>
                            <div className="conv-meta">
                                <div className="time">Yesterday</div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="chat-window">
                <header className="chat-header">
                    <div className="header-left">
                        <button className="mobile-back"><ArrowLeft size={20} /></button>
                        <div className="avatar-wrap online">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Support" />
                        </div>
                        <div className="user-details">
                            <h3>Support Team</h3>
                            <span className="user-status">Always online</span>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn"><Phone size={20} /></button>
                        <button className="action-btn"><Video size={20} /></button>
                        <button className="divider"></button>
                        <button className="action-btn"><MoreVertical size={20} /></button>
                    </div>
                </header>

                <div className="chat-messages" ref={scrollRef}>
                    {chatHistory.map((msg) => (
                        <div key={msg.id} className={`message-row ${msg.sender}`}>
                            {msg.sender === 'other' && (
                                <div className="msg-avatar">
                                    <img src={msg.avatar} alt="Avatar" />
                                </div>
                            )}
                            <div className="message-content">
                                <div className="msg-bubble">
                                    <p>{msg.text}</p>
                                    <div className="msg-meta">
                                        <span>{msg.time}</span>
                                        {msg.sender === 'me' && (
                                            <CheckCheck size={14} className="text-blue-400" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="chat-input-area">
                    <div className="input-actions">
                        <button className="action-btn">< Smile size={22} /></button>
                        <button className="action-btn"><Paperclip size={22} /></button>
                    </div>
                    <form className="input-form" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Quantum encrypted message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="send-btn" disabled={!message.trim()}>
                            <Send size={20} />
                        </button>
                    </form>
                </footer>
            </main>
        </div>
    );
};

export default ChatPage;
