import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCheck, FiX, FiDownload, FiUsers, FiClock, FiUserCheck } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const { currentUser, getAllUsers, updateUserStatus } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedUser, setExpandedUser] = useState(null);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.email?.trim().toLowerCase() === 'admin@dmkgenzevent2026.org';

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate('/login');
      return;
    }
    setUsers(getAllUsers());
  }, [currentUser, navigate, getAllUsers, isAdmin]);

  if (!currentUser || !isAdmin) return null;

  const refresh = () => setUsers(getAllUsers());

  const handleApprove = (id) => {
    updateUserStatus(id, 'approved');
    refresh();
  };

  const handleReject = (id) => {
    updateUserStatus(id, 'rejected');
    refresh();
  };

  const filtered = users.filter(u => {
    const matchSearch = !search ||
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.registrationId?.toLowerCase().includes(search.toLowerCase()) ||
      u.district?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || u.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: users.length,
    approved: users.filter(u => u.status === 'approved').length,
    pending: users.filter(u => u.status === 'pending').length,
    rejected: users.filter(u => u.status === 'rejected').length,
  };

  const exportPDF = () => {
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.setFillColor(10, 10, 10);
    pdf.rect(0, 0, 297, 210, 'F');

    pdf.setFillColor(204, 0, 0);
    pdf.rect(0, 0, 297, 10, 'F');

    pdf.setTextColor(255, 215, 0);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DMK GenZ Meeting 2026 — Registered Users', 148, 22, { align: 'center' });

    pdf.setTextColor(200, 200, 200);
    pdf.setFontSize(9);
    pdf.text(`Generated: ${new Date().toLocaleString()} | Total: ${filtered.length}`, 148, 30, { align: 'center' });

    // Table header
    const headers = ['#', 'Name', 'Reg ID', 'Age', 'District', 'Occupation', 'Mobile', 'Status'];
    const cols = [12, 25, 50, 65, 75, 100, 130, 160];
    pdf.setFillColor(30, 10, 10);
    pdf.rect(10, 35, 277, 8, 'F');
    pdf.setTextColor(255, 215, 0);
    pdf.setFontSize(8);
    headers.forEach((h, i) => pdf.text(h, cols[i], 40.5));

    // Table rows
    filtered.slice(0, 40).forEach((u, idx) => {
      const y = 45 + idx * 7;
      if (y > 195) return;
      if (idx % 2 === 0) {
        pdf.setFillColor(20, 5, 5);
        pdf.rect(10, y - 4, 277, 7, 'F');
      }
      pdf.setTextColor(220, 220, 220);
      pdf.setFontSize(7.5);
      pdf.text(String(idx + 1), cols[0], y);
      pdf.text((u.fullName || '').slice(0, 20), cols[1], y);
      pdf.text(u.registrationId || '', cols[2], y);
      pdf.text(String(u.age || ''), cols[3], y);
      pdf.text((u.district || '').slice(0, 16), cols[4], y);
      pdf.text((u.occupation || '').slice(0, 18), cols[5], y);
      pdf.text(u.mobile || '', cols[6], y);
      const statusColor = u.status === 'approved' ? [0,180,80] : u.status === 'rejected' ? [204,0,0] : [200,160,0];
      pdf.setTextColor(...statusColor);
      pdf.text((u.status || 'pending').toUpperCase(), cols[7], y);
    });

    pdf.save('DMK-GENZ-Users-Report.pdf');
  };

  if (!currentUser || currentUser.role !== 'admin') return null;

  return (
    <div className="page-container admin-page">
      <div className="admin-container">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="admin-header">
            <div>
              <h1 className="admin-title gradient-text">Admin Panel</h1>
              <p className="admin-subtitle">DMK GenZ Meeting 2026 — Registration Management</p>
            </div>
            <button className="btn-primary export-btn" onClick={exportPDF}>
              <FiDownload /> Export PDF
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="admin-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {[
            { icon: <FiUsers />, val: stats.total, label: 'Total Registered', color: 'white' },
            { icon: <FiUserCheck />, val: stats.approved, label: 'Approved', color: '#00c864' },
            { icon: <FiClock />, val: stats.pending, label: 'Pending', color: '#FFD700' },
            { icon: <FiX />, val: stats.rejected, label: 'Rejected', color: '#FF4444' },
          ].map((s, i) => (
            <div key={i} className="admin-stat-card glass-card">
              <div className="asc-icon" style={{ color: s.color }}>{s.icon}</div>
              <div className="asc-val" style={{ color: s.color }}>{s.val}</div>
              <div className="asc-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <motion.div className="admin-controls glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, ID, district..."
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div className="users-table-wrapper glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {filtered.length === 0 ? (
            <div className="no-users">No users found</div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Reg ID</th>
                  <th>Age</th>
                  <th>District</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <React.Fragment key={user.id}>
                    <motion.tr
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="td-num">{i + 1}</td>
                      <td>
                        <div className="user-name-cell">
                          <div className="user-mini-avatar">
                            {user.profilePhoto ? (
                              <img src={user.profilePhoto} alt="" />
                            ) : (
                              <span>{(user.fullName || '').charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <div className="user-name">{user.fullName}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="reg-id-badge">{user.registrationId}</span></td>
                      <td className="td-center">{user.age}</td>
                      <td>{user.district}</td>
                      <td>{user.mobile}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status || 'pending'}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn approve" onClick={(e) => { e.stopPropagation(); handleApprove(user.id); }} title="Approve">
                            <FiCheck />
                          </button>
                          <button className="action-btn reject" onClick={(e) => { e.stopPropagation(); handleReject(user.id); }} title="Reject">
                            <FiX />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                    {expandedUser === user.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan="8">
                          <div className="user-detail-panel">
                            <div className="detail-field">
                              <div className="detail-label">Occupation</div>
                              <div className="detail-value">{user.occupation || 'N/A'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Government ID Type</div>
                              <div className="detail-value">{user.governmentIdType || 'N/A'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Government ID Number</div>
                              <div className="detail-value">{user.governmentIdNumber || 'N/A'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Instagram Profile</div>
                              <div className="detail-value">{user.instagram || 'N/A'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Facebook Profile</div>
                              <div className="detail-value">{user.facebook || 'N/A'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Other Profile</div>
                              <div className="detail-value">{user.otherProfile || 'N/A'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Referred By</div>
                              <div className="detail-value">{user.referredBy || 'Direct Registration'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Registration Date</div>
                              <div className="detail-value">{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'N/A'}</div>
                            </div>
                            <div className="detail-field">
                              <div className="detail-label">Attendance Marked</div>
                              <div className="detail-value">{user.attendanceMarked ? '✓ Yes' : '✗ No'}</div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;