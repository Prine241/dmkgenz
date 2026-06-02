import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaCamera, FaArrowRight, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { validateRegistration, tamilNaduDistricts } from '../utils/validation';

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', age: '', mobile: '', email: '',
    district: '', occupation: '', password: '', referredBy: '', photo: ''
  });
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ageWarning, setAgeWarning] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));

    if (name === 'age') {
      const age = parseInt(value);
      if (age > 35) setAgeWarning('Sorry, only participants aged 18–35 are eligible.');
      else if (age < 18 && value.length >= 2) setAgeWarning('Minimum age is 18.');
      else setAgeWarning('');
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result);
      setForm(f => ({ ...f, photo: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegistration(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    register(form);
    setLoading(false);
    navigate('/dashboard');
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.08 } }),
  };

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-5">
      {/* Photo Upload */}
      <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible" className="flex justify-center">
        <label className="cursor-pointer group relative">
          <div className={`w-24 h-24 rounded-full border-2 overflow-hidden transition-all duration-300 group-hover:border-gold/80
            ${photoPreview ? 'border-gold/60' : 'border-white/20 border-dashed'}`}
            style={{ borderColor: photoPreview ? 'rgba(255,215,0,0.6)' : undefined }}>
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-white/5">
                <FaCamera className="text-white/30 text-2xl" />
                <span className="text-white/30 text-xs">Photo</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-7 h-7 bg-dmk-red rounded-full flex items-center justify-center">
            <FaCamera className="text-white text-xs" />
          </div>
          <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
        </label>
      </motion.div>

      {/* Full Name */}
      <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-white/60 text-sm mb-1 tracking-wider">Full Name *</label>
        <div className="relative">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
          <input
            name="fullName" value={form.fullName} onChange={handleChange}
            placeholder="Enter your full name"
            className="input-field pl-10"
          />
        </div>
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </motion.div>

      {/* Age + Mobile */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-white/60 text-sm mb-1 tracking-wider">Age *</label>
          <input
            name="age" type="number" value={form.age} onChange={handleChange}
            placeholder="18-35"
            className="input-field"
            min="1" max="99"
          />
          {ageWarning && (
            <motion.p
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <FaExclamationTriangle className="text-xs" /> {ageWarning}
            </motion.p>
          )}
          {errors.age && !ageWarning && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
        </motion.div>
        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-white/60 text-sm mb-1 tracking-wider">Mobile *</label>
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
            <input
              name="mobile" type="tel" value={form.mobile} onChange={handleChange}
              placeholder="10-digit number"
              className="input-field pl-10"
              maxLength={10}
            />
          </div>
          {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
        </motion.div>
      </div>

      {/* Email */}
      <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-white/60 text-sm mb-1 tracking-wider">Email *</label>
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
          <input
            name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com"
            className="input-field pl-10"
          />
        </div>
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </motion.div>

      {/* District */}
      <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-white/60 text-sm mb-1 tracking-wider">District *</label>
        <select
          name="district" value={form.district} onChange={handleChange}
          className="input-field"
          style={{ background: 'rgba(255,255,255,0.05)', color: form.district ? '#fff' : 'rgba(255,255,255,0.3)' }}
        >
          <option value="" style={{ background: '#1a0000', color: '#fff' }}>Select your district</option>
          {tamilNaduDistricts.map(d => (
            <option key={d} value={d} style={{ background: '#1a0000', color: '#fff' }}>{d}</option>
          ))}
        </select>
        {errors.district && <p className="text-red-400 text-xs mt-1">{errors.district}</p>}
      </motion.div>

      {/* Occupation */}
      <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-white/60 text-sm mb-1 tracking-wider">Occupation *</label>
        <input
          name="occupation" value={form.occupation} onChange={handleChange}
          placeholder="Student / Professional / etc."
          className="input-field"
        />
        {errors.occupation && <p className="text-red-400 text-xs mt-1">{errors.occupation}</p>}
      </motion.div>

      {/* Password */}
      <motion.div custom={7} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-white/60 text-sm mb-1 tracking-wider">Password *</label>
        <input
          name="password" type="password" value={form.password} onChange={handleChange}
          placeholder="Min. 6 characters"
          className="input-field"
        />
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
      </motion.div>

      {/* Referral Code (optional) */}
      <motion.div custom={8} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-white/60 text-sm mb-1 tracking-wider">Referral Code (Optional)</label>
        <input
          name="referredBy" value={form.referredBy} onChange={handleChange}
          placeholder="GENZ-XXXX"
          className="input-field"
        />
      </motion.div>

      {/* Submit */}
      <motion.div custom={9} variants={fieldVariants} initial="hidden" animate="visible">
        <motion.button
          type="submit"
          disabled={loading || parseInt(form.age) > 35}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="btn-primary w-full py-4 rounded-xl text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" /> Registering...</>
          ) : (
            <><FaCheckCircle /> Register Now <FaArrowRight /></>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;