import React, { useState, useEffect } from 'react';
import { Bell, Search, Menu, X, User, MessageCircle, LogOut, AlertTriangle, LayoutGrid, Globe, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/image/myimg.png';
import './Header.css';
import './Dashboard.css';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: 'Admin' });
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Close dropdowns if clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.header-profile-container') && isProfileDropdownOpen) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileDropdownOpen]);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleSidebar = () => {
        document.body.classList.toggle('sidebar-closed');
    };

    return (
        <>
            <header className="dashboard-header-container">
                <div className="header-left">
                    <button className="header-icon-btn" onClick={toggleSidebar}>
                        <Menu size={20} />
                    </button>
                    <button className="header-icon-btn hidden md:flex" style={{ display: 'none' }}>
                        <Search size={16} />
                    </button>
                </div>

                <div className="header-right-custom">
                    <div className="header-search-bar">
                        <input
                            type="text"
                            placeholder="Search dashboard..."
                            className="header-search-input"
                        />
                        <span className="header-search-shortcut">⌘ K</span>
                    </div>

                    <button
                        className="header-icon-btn"
                        style={{ position: 'relative' }}
                        onClick={() => setIsNotifOpen(true)}
                    >
                        <Bell size={18} />
                        <span className="header-notif-badge">2</span>
                    </button>

                    <div className="header-profile-container" style={{ position: 'relative' }}>
                        <div
                            className="header-profile-section"
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            title="Profile Menu"
                        >
                            <div className="header-profile-img-wrapper">
                                <img
                                    src={profileImg}
                                    className="header-profile-img"
                                    alt="Profile"
                                />
                                <span className="header-status-dot"></span>
                            </div>
                        </div>

                        {/* Profile Dropdown */}
                        {isProfileDropdownOpen && (
                            <div className="header-profile-dropdown">
                                <div className="dropdown-user-info">
                                    <p className="dropdown-username">{user.username}</p>
                                    <p className="dropdown-role">Administrator</p>
                                </div>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item">
                                    <User size={14} />
                                    <span>Profile</span>
                                </button>
                                <button className="dropdown-item">
                                    <MessageCircle size={14} />
                                    <span>Chat</span>
                                </button>
                                <div className="dropdown-divider"></div>
                                <button
                                    className="dropdown-item text-red-500 hover:bg-red-500/10 hover:text-red-500"
                                    onClick={() => {
                                        setIsProfileDropdownOpen(false);
                                        setIsLogoutModalOpen(true);
                                    }}
                                >
                                    <LogOut size={14} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Right Side Notification Offcanvas */}
            <div className={`notif-offcanvas ${isNotifOpen ? 'open' : ''}`}>
                <div className="notif-header">
                    <h3 className="notif-title">Notifications</h3>
                    <button className="notif-close-btn" onClick={() => setIsNotifOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                <div className="notif-body">
                    <div className="notif-item unread">
                        <div className="notif-item-dot"></div>
                        <div className="notif-item-content">
                            <p className="notif-item-text">New user registered: <strong>John Doe</strong></p>
                            <p className="notif-item-time">2 mins ago</p>
                        </div>
                    </div>
                    <div className="notif-item">
                        <div className="notif-item-dot" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}></div>
                        <div className="notif-item-content">
                            <p className="notif-item-text">Server backup completed successfully without errors.</p>
                            <p className="notif-item-time">1 hour ago</p>
                        </div>
                    </div>
                </div>
            </div>

            {isNotifOpen && (
                <div className="notif-backdrop" onClick={() => setIsNotifOpen(false)}></div>
            )}

            {/* Premium Logout Confirmation Modal - Using Global Dashboard UI */}
            {isLogoutModalOpen && (
                <div className="dashboard-modal-overlay">
                    <div className="dashboard-modal animate-up">
                        <div className="dashboard-modal-icon">
                            <AlertTriangle size={32} color="#f97316" />
                        </div>
                        <h3 className="dashboard-modal-title">Sign Out Confirmation</h3>
                        <p className="dashboard-modal-text">
                            Are you sure you want to sign out of the admin dashboard? You will need to log in again to access these features.
                        </p>
                        <div className="dashboard-modal-actions">
                            <button
                                className="dashboard-cancel-btn"
                                onClick={() => setIsLogoutModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="dashboard-confirm-btn"
                                onClick={() => {
                                    localStorage.removeItem('userInfo');
                                    navigate('/admin/login');
                                }}
                            >
                                Yes, Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
