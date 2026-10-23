import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, MessageSquare, ShieldCheck, ChevronDown } from "lucide-react";
import "./Navigation.css";
import profileImg from "../assets/image/myimg.png";
import DownloadModal from "./DownloadModal";
import ChatModal from "./ChatModal";
import { trackPdfDownload } from "../api/downloadapi";
import { getActivePdf } from "../api/pdfapi";
import resumePdf from "../assets/image/resume.pdf";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/skills", label: "Skills" },
    { path: "/contact", label: "Contact" },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDownloadClick = () => {
    setIsModalOpen(true);
    closeMenu();
  };

  const confirmDownload = async () => {
    setIsModalOpen(false);

    try {
        // 1. Prepare tracking info
        const systemInfo = {
            browserInfo: navigator.userAgent,
            ipAddress: 'Unknown'
        };
        
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const data = await ipRes.json();
            systemInfo.ipAddress = data.ip;
        } catch (e) {
            console.log('Could not fetch IP', e);
        }
        
        // 2. Record the download (non-blocking)
        trackPdfDownload(true, 'successful', systemInfo)
           .then(() => console.log('Successfully recorded the download!'))
           .catch(e => console.log('Could not track download', e));

        // 3. Trigger the download using the imported resume.pdf asset
        const link = document.createElement('a');
        link.href = resumePdf;
        link.download = 'ASWANTH_KRISHNA_RESUME.pdf';
        link.target = "_blank"; // Support opening in new tab if browser prefers
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        console.error("Download failed:", error);
        alert("The download could not be completed at this time.");
    }
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isModalOpen]);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/home" className="nav-logo" onClick={closeMenu}>
          AK
        </Link>

        <button
          className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={handleMenuToggle}
          aria-label="Toggle navigation"
        >
          <span className="hamburger"></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <button className="nav-link nav-download-btn" onClick={handleDownloadClick}>
            <Download size={18} />
            CV
          </button>

          {/* Profile Dropdown */}
          <div className="nav-profile-container">
            <div 
              className={`nav-profile-trigger ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={profileImg} alt="Profile" className="nav-profile-img" />
              <ChevronDown size={14} className={`nav-profile-chevron ${isDropdownOpen ? 'rotate' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="nav-profile-dropdown animate-up">
                <Link to="/admin/login" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                  <ShieldCheck size={16} />
                  <span>Admin Dashboard</span>
                </Link>
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsChatModalOpen(true);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <MessageSquare size={16} />
                  <span>Chat with Developer</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDownload}
      />

      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </nav>
  );
};


export default Navigation;
