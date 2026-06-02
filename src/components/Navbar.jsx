import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser, FiHome, FiUserPlus, FiSettings } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdminUser = currentUser?.role === 'admin' || currentUser?.email?.trim().toLowerCase() === 'admin@dmkgenzevent2026.org';
  const navLinks = currentUser
    ? isAdminUser
      ? [{ to: '/admin', label: 'Admin Panel', icon: <FiSettings /> }]
      : [
          { to: '/dashboard', label: 'Dashboard', icon: <FiUser /> },
          { to: '/certificate', label: 'Certificate', icon: <FiUser /> },
        ]
    : [
        { to: '/', label: 'Home', icon: <FiHome /> },
        { to: '/login', label: 'Login', icon: <FiUser /> },
        { to: '/register', label: 'Register', icon: <FiUserPlus /> },
      ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-flag">
            <span className="flag-black"></span>
            <span className="flag-red"></span>
            <span className="flag-yellow"></span>
          </div>
          <div className="brand-text">
            <span className="brand-main">DMK</span>
            <span className="brand-sub">GenZ Meeting 2026</span>
          </div>
        </Link>

        <div className="navbar-links desktop">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          {currentUser && (
            <button className="nav-logout" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="mobile-nav-link">
                {link.icon} {link.label}
              </Link>
            ))}
            {currentUser && (
              <button className="mobile-nav-link logout-btn" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;