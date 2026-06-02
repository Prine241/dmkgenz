
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCopy, FiCheck, FiUsers, FiAward, FiUser, FiCalendar, FiMapPin } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import MeetingPass from '../components/MeetingPass';
import './Dashboard.css';

const TabButton = ({ label, icon, active, onClick }) => (
  <button className={`tab-btn ${active ? 'active' : ''}`} onClick={onClick}>
    {icon} {label}
  </button>
);

const Dashboard = () => {
  const { currentUser, markAttendance } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pass');
  const [copied, setCopied] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(currentUser?.attendanceMarked || false);

  if (!currentUser) { navigate('/login'); return null; }

  const copyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkAttendance = () => {
    markAttendance();
    setAttendanceMarked(true);
  };

  return (
    <div className="page-container dashboard-page">
      <div className="dashboard-bg">
        <div className="dash-glow"></div>
      </div>

      <div className="dashboard-container">
        {/* Welcome Header */}
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="dash-welcome">
            <div className="dash-avatar">
              {currentUser.profilePhoto ? (
                <img src={currentUser.profilePhoto} alt="Profile" />
              ) : (
                <span>{(currentUser.fullName || '').charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="dash-greeting">Welcome back,</div>
              <div className="dash-name">{currentUser.fullName}</div>
              <div className="dash-sub">{currentUser.district} · {currentUser.occupation}</div>
            </div>
          </div>
          <div className="dash-meta">
            <div className="dash-meta-item">
              <FiCalendar /> 21 June 2026
            </div>
            <div className="dash-meta-item">
              <FiMapPin /> Kanyakumari
            </div>
            <div className={`dash-status ${currentUser.status}`}>
              {currentUser.status === 'approved' ? '✓ Approved' : currentUser.status === 'rejected' ? '✗ Rejected' : '⏳ Pending'}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="dash-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="dash-stat-card glass-card">
            <div className="dsc-icon"><FiAward /></div>
            <div className="dsc-value">{currentUser.registrationId}</div>
            <div className="dsc-label">Registration ID</div>
          </div>
          <div className="dash-stat-card glass-card">
            <div className="dsc-icon"><FiUsers /></div>
            <div className="dsc-value">{currentUser.referralCount || 0}</div>
            <div className="dsc-label">Friends Referred</div>
          </div>
          <div className="dash-stat-card glass-card">
            <div className="dsc-icon"><FiUser /></div>
            <div className="dsc-value">{currentUser.district}</div>
            <div className="dsc-label">Your District</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="dash-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="tab-bar">
            <TabButton label="Meeting Pass" icon={<FiAward />} active={activeTab === 'pass'} onClick={() => setActiveTab('pass')} />
            <TabButton label="Referral" icon={<FiUsers />} active={activeTab === 'referral'} onClick={() => setActiveTab('referral')} />
            <TabButton label="Attendance" icon={<FiCheck />} active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} />
          </div>

          <div className="tab-content">
            {/* Meeting Pass Tab */}
            {activeTab === 'pass' && (
              <motion.div key="pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <MeetingPass user={currentUser} />
              </motion.div>
            )}

            {/* Referral Tab */}
            {activeTab === 'referral' && (
              <motion.div key="referral" className="referral-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="referral-card glass-card">
                  <h3 className="referral-title">Your Referral Code</h3>
                  <p className="referral-subtitle">Share this code with friends. Help them join the movement!</p>
                  <div className="referral-code-box">
                    <span className="referral-code">{currentUser.referralCode}</span>
                    <button className="copy-btn" onClick={copyReferral}>
                      {copied ? <FiCheck color="#00c864" /> : <FiCopy />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="referral-stats">
                    <div className="ref-stat">
                      <div className="ref-stat-val">{currentUser.referralCount || 0}</div>
                      <div className="ref-stat-label">Total Referrals</div>
                    </div>
                    <div className="ref-stat">
                      <div className="ref-stat-val">{(currentUser.friendsJoined || []).length}</div>
                      <div className="ref-stat-label">Friends Joined</div>
                    </div>
                  </div>
                  {currentUser.friendsJoined && currentUser.friendsJoined.length > 0 && (
                    <div className="friends-list">
                      <div className="friends-list-title">Friends Who Joined</div>
                      {currentUser.friendsJoined.map((name, i) => (
                        <div key={i} className="friend-item"><FiUsers /> {name}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="referral-share-msg">
                  Share: "Join DMK GenZ Meeting 2026 at Kanyakumari! Register using my code <strong>{currentUser.referralCode}</strong> at dmkgenz.in"
                </div>
              </motion.div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <motion.div key="attendance" className="attendance-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="attendance-card glass-card">
                  {attendanceMarked || currentUser.attendanceMarked ? (
                    <div className="attendance-marked">
                      <div className="att-check">✓</div>
                      <h3>Attendance Marked!</h3>
                      <p>Your attendance has been recorded for DMK GenZ Meeting 2026.</p>
                      <button className="btn-primary cert-nav-btn" onClick={() => navigate('/certificate')}>
                        <FiAward /> Get Your Certificate
                      </button>
                    </div>
                  ) : (
                    <div className="attendance-pending">
                      <div className="att-icon"><FiCalendar /></div>
                      <h3>Mark Your Attendance</h3>
                      <p>Click the button below on the day of the event to mark your attendance and unlock your certificate.</p>
                      <div className="att-event-info">
                        <div>📅 21 June 2026</div>
                        <div>⏰ 3:00 PM</div>
                        <div>📍 Kanyakumari, Tamil Nadu</div>
                      </div>
                      <button className="btn-primary att-btn" onClick={handleMarkAttendance}>
                        <FiCheck /> Mark Attendance
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;