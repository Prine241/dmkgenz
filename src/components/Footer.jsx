import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-flag">
            <span></span><span></span><span></span>
          </div>
          <div>
            <div className="footer-logo">DMK GenZ</div>
            <div className="footer-tagline">State Meeting 2026</div>
          </div>
        </div>
        <div className="footer-info">
          <div className="footer-info-item"><FiCalendarIcon /> 21 June 2026, 3:00 PM</div>
          <div className="footer-info-item"><FiMapPin className="fi" /> Kanyakumari, Tamil Nadu</div>
          <div className="footer-info-item"><FiMail className="fi" /> genz@dmk.in</div>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 DMK GenZ Meeting. திராவிட முன்னேற்றக் கழகம்</p>
        <p className="footer-admin-hint">Admin: admin@dmkgenz.in | Admin@2026</p>
      </div>
    </div>
  </footer>
);

const FiCalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default Footer;