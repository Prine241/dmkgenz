import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCamera, FiArrowRight, FiHash, FiLock } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaGlobe } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { validateRegistration } from '../utils/validation';
import './Register.css';

const DISTRICTS = [
  'Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri',
  'Dindigul','Erode','Kallakurichi','Kancheepuram','Kanyakumari','Karur',
  'Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Namakkal',
  'Nilgiris','Perambalur','Pudukkottai','Ramanathapuram','Ranipet',
  'Salem','Sivaganga','Tenkasi','Thanjavur','Theni','Thoothukudi',
  'Tiruchirappalli','Tirunelveli','Tirupattur','Tiruppur','Tiruvallur',
  'Tiruvannamalai','Tiruvarur','Vellore','Villupuram','Virudhunagar'
];

const OCCUPATIONS = [
  'Student','Software Engineer','Government Employee','Business/Entrepreneur',
  'Doctor/Medical','Lawyer','Teacher/Educator','Farmer','Journalist',
  'Social Worker','Politician/Party Worker','Other'
];

const GOV_ID_TYPES = [
  'Aadhaar Card','PAN Card','Voter ID','Passport','Other'
];

const Register = () => {
  const [form, setForm] = useState({
    fullName: '', age: '', mobile: '', email: '',
    district: '', occupation: '', referredBy: '',
    instagram: '', facebook: '', otherProfile: '',
    governmentIdType: '', governmentIdNumber: '', password: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [ageWarning, setAgeWarning] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: '' }));

    // Live age check
    if (name === 'age') {
      const n = parseInt(value);
      if (n > 35) setAgeWarning('Sorry, only participants aged 18–35 are eligible.');
      else if (n < 18 && value) setAgeWarning('Minimum age is 18 years.');
      else setAgeWarning('');
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result);
      setProfilePhoto(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(form);
    if (!form.password) validationErrors.password = 'Password is required';
    if (form.password && form.password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const result = await register({ ...form, profilePhoto });
    setLoading(false);

    if (result?.success) navigate('/dashboard');
    else setErrors({ general: result.message });
  };

  return (
    <div className="register-page">
      <div className="auth-bg">
        <div className="auth-glow red"></div>
        <div className="auth-glow yellow"></div>
      </div>

      <div className="register-container">
        <motion.div
          className="register-card glass-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
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
            <h1 className="auth-title">Register for the Meeting</h1>
            <p className="auth-subtitle">21 June 2026 · Kanyakumari · Ages 18–35</p>
          </div>

          {errors.general && (
            <div className="auth-error-box">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Photo Upload */}
            <div className="photo-upload-section">
              <div className="photo-preview" onClick={() => document.getElementById('photo-input').click()}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" />
                ) : (
                  <div className="photo-placeholder">
                    <FiCamera size={28} />
                    <span>Upload Photo</span>
                  </div>
                )}
                <div className="photo-overlay"><FiCamera /></div>
              </div>
              <input id="photo-input" type="file" accept="image/*" onChange={handlePhoto} hidden />
              <p className="photo-hint">Click to upload profile photo (optional)</p>
            </div>

            <div className="register-grid">
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`form-input input-with-icon ${errors.fullName ? 'input-error' : ''}`} />
                </div>
                {errors.fullName && <div className="form-error">{errors.fullName}</div>}
              </div>

              {/* Age */}
              <div className="form-group">
                <label className="form-label">Age *</label>
                <div className="input-wrapper">
                  <FiHash className="input-icon" />
                  <input type="number" name="age" value={form.age} onChange={handleChange}
                    placeholder="Your age (18–35)"
                    className={`form-input input-with-icon ${errors.age || ageWarning ? 'input-error' : ''}`} />
                </div>
                <AnimatePresence>
                  {(errors.age || ageWarning) && (
                    <motion.div
                      className="form-error age-warning"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {errors.age || ageWarning}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile */}
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <div className="input-wrapper">
                  <FiPhone className="input-icon" />
                  <input type="tel" name="mobile" value={form.mobile} onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`form-input input-with-icon ${errors.mobile ? 'input-error' : ''}`} />
                </div>
                {errors.mobile && <div className="form-error">{errors.mobile}</div>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className={`form-input input-with-icon ${errors.email ? 'input-error' : ''}`} />
                </div>
                {errors.email && <div className="form-error">{errors.email}</div>}
                {!errors.email && <div className="form-info-note">Your email is secured and only used for login and event updates.</div>}
              </div>

              {/* District */}
              <div className="form-group">
                <label className="form-label">District *</label>
                <div className="input-wrapper">
                  <FiMapPin className="input-icon" />
                  <select name="district" value={form.district} onChange={handleChange}
                    className={`form-input input-with-icon select-input ${errors.district ? 'input-error' : ''}`}>
                    <option value="">Select your district</option>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                {errors.district && <div className="form-error">{errors.district}</div>}
              </div>

              {/* Occupation */}
              <div className="form-group">
                <label className="form-label">Occupation *</label>
                <div className="input-wrapper">
                  <FiBriefcase className="input-icon" />
                  <select name="occupation" value={form.occupation} onChange={handleChange}
                    className={`form-input input-with-icon select-input ${errors.occupation ? 'input-error' : ''}`}>
                    <option value="">Select occupation</option>
                    {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {errors.occupation && <div className="form-error">{errors.occupation}</div>}
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label">Create Password *</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input type="password" name="password" value={form.password} onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className={`form-input input-with-icon ${errors.password ? 'input-error' : ''}`} />
                </div>
                {errors.password && <div className="form-error">{errors.password}</div>}
                {!errors.password && <div className="form-info-note">Your password is secured and stored safely for login.</div>}
              </div>

              {/* Referral Code */}
              <div className="form-group">
                <label className="form-label">Referral Code (Optional)</label>
                <div className="input-wrapper">
                  <FiHash className="input-icon" />
                  <input type="text" name="referredBy" value={form.referredBy} onChange={handleChange}
                    placeholder="e.g. REF-XXXX"
                    className="form-input input-with-icon" />
                </div>
              </div>

              {/* Social Profiles */}
              <div className="form-group">
                <label className="form-label">Instagram Profile</label>
                <div className="input-wrapper">
                  <FaInstagram className="input-icon" />
                  <input type="text" name="instagram" value={form.instagram} onChange={handleChange}
                    placeholder="Instagram profile URL or handle"
                    className="form-input input-with-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Facebook Profile</label>
                <div className="input-wrapper">
                  <FaFacebookF className="input-icon" />
                  <input type="text" name="facebook" value={form.facebook} onChange={handleChange}
                    placeholder="Facebook profile URL"
                    className="form-input input-with-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Other Profile</label>
                <div className="input-wrapper">
                  <FaGlobe className="input-icon" />
                  <input type="text" name="otherProfile" value={form.otherProfile} onChange={handleChange}
                    placeholder="Other social or website link"
                    className="form-input input-with-icon" />
                </div>
              </div>

              {/* Government ID Verification */}
              <div className="form-group">
                <label className="form-label">Government ID Type *</label>
                <div className="input-wrapper">
                  <FiMapPin className="input-icon" />
                  <select name="governmentIdType" value={form.governmentIdType} onChange={handleChange}
                    className={`form-input input-with-icon select-input ${errors.governmentIdType ? 'input-error' : ''}`}>
                    <option value="">Select ID type</option>
                    {GOV_ID_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                {errors.governmentIdType && <div className="form-error">{errors.governmentIdType}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Government ID Number *</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input type="text" name="governmentIdNumber" value={form.governmentIdNumber} onChange={handleChange}
                    placeholder="Enter your ID number"
                    className={`form-input input-with-icon ${errors.governmentIdNumber ? 'input-error' : ''}`} />
                </div>
                {errors.governmentIdNumber && <div className="form-error">{errors.governmentIdNumber}</div>}
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-primary auth-submit"
              disabled={loading || ageWarning !== ''}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="loading-dots"><span></span><span></span><span></span></span>
              ) : (
                <><FiArrowRight /> Complete Registration</>
              )}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>Already registered? <Link to="/login" className="auth-link">Login here</Link></p>
            <Link to="/" className="auth-back">← Back to Home</Link>
          </div>
          <div className="form-info-box">
            <p>This registration form is for general participants only. The Admin Panel is accessed from the login page by authorized admin users.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;