import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShare, FaCopy, FaCheckCircle, FaUsers, FaLink, FaWhatsapp } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import Footer from '../components/Footer';
import './Referralpage.css';

const ReferralPage = () => {
  const { user, users } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const referredUsers = users.filter(u => u.referredBy === user.referralCode);
  const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(
      `Join me at DMK GenZ Meeting 2026 in Kanyakumari! Register using my referral code: ${user.referralCode}\n\nRegister: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="referral-page">
      <div className="referral-hero glass-card">
        <div className="referral-hero-icon"><FaShare /></div>
        <div>
          <h1>Referral System</h1>
          <p>Invite friends to join DMK GenZ Meeting 2026 at Kanyakumari.</p>
        </div>
      </div>

      <div className="referral-content">
        <motion.div className="referral-card" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="referral-label">Your unique referral code</div>
          <div className="referral-code-row">
            <div className="referral-code-box">{user.referralCode}</div>
            <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyCode}>
              {copied ? <FaCheckCircle /> : <FaCopy />}
            </button>
          </div>
          <div className="referral-actions">
            <button className="secondary-btn" onClick={copyCode}>
              <FaLink /> Copy link
            </button>
            <button className="secondary-btn whatsapp-btn" onClick={shareWhatsApp}>
              <FaWhatsapp /> Share WhatsApp
            </button>
          </div>
        </motion.div>

        <div className="referral-grid">
          <motion.div className="referral-stat glass-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <div className="referral-stat-icon"><FaUsers /></div>
            <div className="referral-stat-value">{referredUsers.length}</div>
            <div className="referral-stat-label">Friends Joined</div>
          </motion.div>
          <motion.div className="referral-stat glass-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <div className="referral-stat-icon"><FaShare /></div>
            <div className="referral-stat-value">{referredUsers.length}</div>
            <div className="referral-stat-label">Total Referrals</div>
          </motion.div>
        </div>

        {referredUsers.length > 0 && (
          <motion.div className="friends-panel glass-card" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="friends-header">Friends You Referred</div>
            <div className="friends-list">
              {referredUsers.map((u) => (
                <div key={u.id} className="friend-item">
                  <div className="friend-avatar">{u.fullName?.charAt(0)}</div>
                  <div className="friend-meta">
                    <div className="friend-name">{u.fullName}</div>
                    <div className="friend-sub">{u.district} · {u.registrationId}</div>
                  </div>
                  <span className={`status-pill ${u.status}`}>{u.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ReferralPage;
