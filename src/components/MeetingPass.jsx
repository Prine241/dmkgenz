import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import { generateQRData } from '../utils/generateQRCode';
import './MeetingPass.css';

const MeetingPass = ({ user }) => {
  const passRef = useRef(null);

  const downloadPass = () => {
    const canvas = document.createElement('canvas');
    const el = passRef.current;
    if (!el) return;
    
    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(el, { scale: 2, backgroundColor: '#0a0a0a' }).then(c => {
        const link = document.createElement('a');
        link.download = `DMK-GENZ-Pass-${user.registrationId}.png`;
        link.href = c.toDataURL('image/png');
        link.click();
      });
    }).catch(() => {
      // Fallback: print window
      window.print();
    });
  };

  const qrData = generateQRData(user);
  const initial = (user.fullName || '').charAt(0).toUpperCase();

  return (
    <div className="meeting-pass-wrapper">
      <motion.div
        className="meeting-pass"
        ref={passRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        {/* Header */}
        <div className="pass-header">
          <div className="pass-flag-strip">
            <div className="pf-black"></div>
            <div className="pf-red"></div>
            <div className="pf-yellow"></div>
          </div>
          <div className="pass-header-content">
            <div className="pass-logo">DMK</div>
            <div className="pass-header-text">
              <div className="pass-event-name">GenZ State Meeting 2026</div>
              <div className="pass-event-sub">திராவிட முன்னேற்றக் கழகம்</div>
            </div>
            <div className="pass-type">
              <span>ENTRY PASS</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pass-body">
          <div className="pass-left">
            {/* Avatar */}
            <div className="pass-avatar">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" />
              ) : (
                <span>{initial}</span>
              )}
            </div>
            <div className="pass-name">{user.fullName}</div>
            <div className="pass-regid">{user.registrationId}</div>
            <div className="pass-details">
              <div className="pass-detail"><FiCalendar /> 21 June 2026</div>
              <div className="pass-detail"><FiClock /> 3:00 PM</div>
              <div className="pass-detail"><FiMapPin /> Kanyakumari</div>
            </div>
            <div className={`pass-status ${user.status}`}>
              {user.status === 'approved' ? '✓ Approved' : user.status === 'rejected' ? '✗ Rejected' : '⏳ Pending'}
            </div>
          </div>

          <div className="pass-divider">
            <div className="perforation"></div>
          </div>

          <div className="pass-right">
            <div className="pass-qr-label">Scan to Verify</div>
            <div className="pass-qr">
              <QRCodeCanvas
                value={qrData}
                size={130}
                bgColor="transparent"
                fgColor="#FFD700"
                level="H"
              />
            </div>
            <div className="pass-qr-id">{user.registrationId}</div>
            <div className="pass-district">{user.district}</div>
          </div>
        </div>

        {/* Footer Strip */}
        <div className="pass-footer">
          <span>Valid for 21 June 2026 only · Kanyakumari, Tamil Nadu</span>
        </div>
      </motion.div>

      <motion.button
        className="btn-primary download-pass-btn"
        onClick={downloadPass}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiDownload /> Download Pass
      </motion.button>
    </div>
  );
};

export default MeetingPass;