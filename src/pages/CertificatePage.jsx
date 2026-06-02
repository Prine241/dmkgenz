import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import Certificate from '../components/Certificate';
import './CertificatePage.css';

const CertificatePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) { navigate('/login'); return null; }

  if (!currentUser.attendanceMarked) {
    return (
      <div className="page-container cert-page">
        <div className="cert-locked">
          <motion.div
            className="cert-locked-card glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="cert-lock-icon">🔒</div>
            <h2>Certificate Locked</h2>
            <p>You need to mark your attendance first to unlock your certificate.</p>
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container cert-page">
      <div className="cert-page-container">
        <motion.div
          className="cert-page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <FiArrowLeft /> Back to Dashboard
          </button>
          <div>
            <h1 className="section-title gradient-text">Your Certificate</h1>
            <div className="divider"></div>
            <p className="section-subtitle">Download your participation certificate for DMK GenZ Meeting 2026</p>
          </div>
        </motion.div>

        <Certificate user={currentUser} />
      </div>
    </div>
  );
};

export default CertificatePage;