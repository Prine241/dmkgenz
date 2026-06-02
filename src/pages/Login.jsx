import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdminInfo, setShowAdminInfo] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleAdminInfo = () => {
    setShowAdminInfo(prev => !prev);
  };

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setErrors({ general: result.message });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-glow red"></div>
        <div className="auth-glow yellow"></div>
      </div>

      <div className="auth-container">
        <motion.div
          className="auth-card glass-card"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <div className="auth-flag">
                <div></div><div></div><div></div>
              </div>
              <span>DMK GenZ</span>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to access your dashboard</p>
            <p className="auth-note">Use your registered email and password for secure access.</p>
            <p className="auth-note">Authorized admins can log in to access the Admin Panel.</p>
          </div>

          {errors.general && (
            <motion.div
              className="auth-error-box"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {errors.general}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`form-input input-with-icon ${errors.email ? 'input-error' : ''}`}
                />
              </div>
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`form-input input-with-icon input-with-right-icon ${errors.password ? 'input-error' : ''}`}
                />
                <button type="button" className="input-toggle" onClick={() => setShowPass(p => !p)}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <motion.button
              type="submit"
              className="btn-primary auth-submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="loading-dots"><span></span><span></span><span></span></span>
              ) : (
                <><FiArrowRight /> Login to Dashboard</>
              )}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="auth-link">Register Now</Link></p>
            <Link to="/" className="auth-back">← Back to Home</Link>
          </div>

          <div className="auth-admin-box">
            <button type="button" className="btn-secondary auth-admin-action" onClick={toggleAdminInfo} disabled={loading}>
              Admin Login Info
            </button>
            <p className="auth-admin-hint">Only authorized admins should proceed. Type admin credentials manually if you have them.</p>
            {showAdminInfo && (
              <div className="auth-admin-note">Admin login is restricted. Enter valid admin email and password manually to access the Admin Panel.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
