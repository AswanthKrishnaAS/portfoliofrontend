import React, { useState } from 'react';
import { LayoutDashboard, Users, LogOut, Zap, AlertTriangle, Globe, Download, FileText, Music, MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import profileImg from '../../assets/image/myimg.png';
import './Sidebar.css';
import './Dashboard.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Globe, label: 'Website Visits', path: '/admin/visits' },
        { icon: Download, label: 'CV Downloads', path: '/admin/downloads' },
        { icon: MessageSquare, label: 'Enquiries', path: '/admin/enquiries' },
        { icon: FileText, label: 'Upload CV', path: '/admin/upload' },
        { icon: Music, label: 'Music Upload', path: '/admin/music' },
    ];

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    return (
        <>
            <aside className="dashboard-sidebar">
            <div>
                <div className="logo-wrapper">
                    <div className="logo-icon">A</div>
                    <span className="logo-text">Asw!</span>
                </div>

                <div style={{ marginTop: '32px' }}>
                    <p className="sidebar-main-menu-title">Main Menu</p>
                    <nav className="sidebar-nav-list">
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <div
                                    key={index}
                                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                                    onClick={() => item.path && navigate(item.path)}
                                >
                                    <item.icon className="icon" />
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div className="pro-teaser-card">
                    <div className="pro-teaser-card-icon">
                        <Zap size={16} color="#4ade80" />
                        <span className="pro-teaser-card-title">Go Pro Plan</span>
                    </div>
                    <p className="pro-teaser-card-desc">
                        Unlock all premium features and get unlimited insights.
                    </p>
                    <button className="pro-teaser-btn">
                        Upgrade Now
                    </button>
                </div>

                <div className="sidebar-user-area">
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-avatar-wrapper">
                            <img 
                                src={profileImg} 
                                className="sidebar-user-avatar" 
                                alt="User" 
                            />
                            <span className="sidebar-user-status"></span>
                        </div>
                        <div className="sidebar-user-details">
                            <span className="sidebar-user-name">Aswanth</span>
                            <span className="sidebar-user-role">Admin Area</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="sidebar-logout-btn"
                        title="Sign Out"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
            </aside>

            {/* Logout Confirmation Modal - Using Global Dashboard Style */}
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

export default Sidebar;
