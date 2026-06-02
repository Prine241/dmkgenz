import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiStar, FiShield, FiArrowRight, FiMic, FiTarget } from 'react-icons/fi';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import './Home.css';

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    className="feature-card glass-card"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(204,0,0,0.2)' }}
  >
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{desc}</p>
  </motion.div>
);

const StatCard = ({ value, label, delay }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="stat-value gradient-text">{value}</div>
    <div className="stat-label">{label}</div>
  </motion.div>
);

const Home = () => {
  return (
    <div className="home-page">
      <Hero />

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <StatCard value="10,000+" label="Expected Attendees" delay={0} />
            <StatCard value="38" label="Districts Represented" delay={0.1} />
            <StatCard value="1" label="Historic Event" delay={0.2} />
            <StatCard value="2026" label="Year of Change" delay={0.3} />
          </div>
        </div>
      </section>

      {/* About Banner */}
      <section className="about-section">
        <div className="section-container">
          <motion.div
            className="about-banner glass-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="about-banner-left">
              <div className="about-badge badge badge-yellow">About This Event</div>
              <h2 className="about-title">
                <span className="gradient-text">GenZ Rising —</span><br />
                Tamil Nadu's Future Speaks
              </h2>
              <p className="about-desc">
                The DMK GenZ State Meeting 2026 is a landmark gathering of young leaders,
                thinkers, and changemakers aged 18–35 from all 38 districts of Tamil Nadu.
                Unite at the historic shores of Kanyakumari — where three seas meet —
                to chart the course of progressive Tamil politics.
              </p>
              <div className="about-points">
                <div className="about-point"><span>✦</span> Policy discussions led by youth</div>
                <div className="about-point"><span>✦</span> Keynote speeches from DMK leaders</div>
                <div className="about-point"><span>✦</span> Cultural programs & recognition awards</div>
              </div>
              <Link to="/register" className="btn-primary about-cta">
                Secure Your Spot <FiArrowRight />
              </Link>
            </div>
            <div className="about-banner-right">
              <div className="event-date-card">
                <div className="edc-month">JUNE</div>
                <div className="edc-day">21</div>
                <div className="edc-year">2026</div>
                <div className="edc-divider"></div>
                <div className="edc-time">3:00 PM</div>
                <div className="edc-venue">Kanyakumari</div>
                <div className="edc-state">Tamil Nadu</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="section-title">What Awaits You</div>
            <div className="divider"></div>
          </motion.div>
          <div className="features-grid">
            <FeatureCard icon={<FiMic />} title="Powerful Speeches" desc="Hear from top DMK leaders and inspiring Gen Z voices shaping Tamil Nadu's future." delay={0} />
            <FeatureCard icon={<FiUsers />} title="Network & Connect" desc="Meet 10,000+ young leaders from every district. Build your political network." delay={0.1} />
            <FeatureCard icon={<FiTarget />} title="Youth Policy Forum" desc="Participate in shaping real policies that matter to the youth of Tamil Nadu." delay={0.2} />
            <FeatureCard icon={<FiStar />} title="Recognition Awards" desc="Outstanding youth leaders will be recognized for their service and contribution." delay={0.3} />
            <FeatureCard icon={<FiShield />} title="Digital Registration" desc="Seamless digital registration with QR-coded entry pass and certificate." delay={0.4} />
            <FeatureCard icon={<FiArrowRight />} title="Referral Rewards" desc="Invite friends and earn exclusive referral rewards. Track your network's growth." delay={0.5} />
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="cta-section">
        <div className="section-container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Make History?</h2>
            <p>Join thousands of GenZ leaders at Kanyakumari. Register before seats fill up.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">Register Now <FiArrowRight /></Link>
              <Link to="/login" className="btn-secondary">Login</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;