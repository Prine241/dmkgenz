import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiAward } from 'react-icons/fi';
import { generateCertificate } from '../utils/generateCertificate';
import './Certificate.css';

const Certificate = ({ user }) => {
  const handleDownload = () => {
    generateCertificate(user);
  };

  return (
    <motion.div
      className="certificate-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Preview */}
      <div className="certificate-preview">
        <div className="cert-border-top"></div>
        <div className="cert-border-bottom"></div>
        <div className="cert-side-left"></div>
        <div className="cert-side-right"></div>
        <div className="cert-inner">
          <div className="cert-badge-row">
            <div className="cert-flag">
              <div></div><div></div><div></div>
            </div>
            <span className="cert-org">DMK GenZ Meeting 2026</span>
            <div className="cert-flag">
              <div></div><div></div><div></div>
            </div>
          </div>
          <div className="cert-title-label">CERTIFICATE</div>
          <div className="cert-title-sub">OF PARTICIPATION</div>
          <div className="cert-line-deco"></div>
          <div className="cert-presented">This certificate is proudly presented to</div>
          <div className="cert-name">{user.fullName}</div>
          <div className="cert-name-underline"></div>
          <div className="cert-body-text">
            for actively participating in the
          </div>
          <div className="cert-event-name">DMK GenZ State Meeting 2026</div>
          <div className="cert-venue">Kanyakumari, Tamil Nadu · 21 June 2026, 3:00 PM</div>
          <div className="cert-footer-row">
            <div className="cert-footer-col">
              <div className="cert-footer-label">Reg. ID</div>
              <div className="cert-footer-val">{user.registrationId}</div>
            </div>
            <div className="cert-footer-col">
              <div className="cert-footer-label">Issued</div>
              <div className="cert-footer-val">21 June 2026</div>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        className="btn-primary cert-download-btn"
        onClick={handleDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiDownload /> Download Certificate (PDF)
      </motion.button>
    </motion.div>
  );
};

export default Certificate;