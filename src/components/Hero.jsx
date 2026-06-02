import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const TARGET_DATE = new Date('2026-06-21T15:00:00');

const CountdownUnit = ({ value, label }) => (
  <div className="countdown-unit">
    <div className="countdown-num">{String(value).padStart(2, '0')}</div>
    <div className="countdown-label">{label}</div>
  </div>
);

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = TARGET_DATE - new Date();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {/* Kanyakumari-inspired bg */}
      <div className="hero-bg">
        <div className="hero-sea"></div>
        <div className="hero-glow red-glow"></div>
        <div className="hero-glow yellow-glow"></div>
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 5}`}></div>
          ))}
        </div>
      </div>

      <div className="hero-content">
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-dot"></span>
          திராவிட முன்னேற்றக் கழகம் — DMK YOUTH WING
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="title-genz">GenZ</span>
          <span className="title-meeting">STATE MEETING</span>
          <span className="title-year">2026</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          இளைஞர்களின் குரல் — தமிழகத்தின் எதிர்காலம்
          <br />
          <span>The Voice of the Youth — The Future of Tamil Nadu</span>
        </motion.p>

        {/* Event Info */}
        <motion.div
          className="event-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="event-info-item">
            <FiCalendar className="info-icon" />
            <span>21 June 2026</span>
          </div>
          <div className="info-divider">|</div>
          <div className="event-info-item">
            <FiClock className="info-icon" />
            <span>3:00 PM Onwards</span>
          </div>
          <div className="info-divider">|</div>
          <div className="event-info-item">
            <FiMapPin className="info-icon" />
            <span>Kanyakumari, Tamil Nadu</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="countdown-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="countdown-label-top">Event Starts In</div>
          <div className="countdown">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <div className="countdown-sep">:</div>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <div className="countdown-sep">:</div>
            <CountdownUnit value={timeLeft.minutes} label="Mins" />
            <div className="countdown-sep">:</div>
            <CountdownUnit value={timeLeft.seconds} label="Secs" />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link to="/register" className="btn-primary hero-btn-primary">
            Register Now <FiArrowRight />
          </Link>
          <Link to="/login" className="btn-secondary hero-btn-secondary">
            Already Registered
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
