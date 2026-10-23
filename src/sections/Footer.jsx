import { portfolioData } from '../data/mock';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">AK</h3>
            <p className="footer-tagline">{portfolioData.personal.tagline}</p>
          </div>
          <button onClick={scrollToTop} className="back-to-top">
            Back to Top ↑
          </button>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
