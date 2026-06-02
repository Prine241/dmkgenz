export const validateAge = (age) => {
  const numAge = parseInt(age);
  if (!age) return 'Age is required';
  if (isNaN(numAge)) return 'Please enter a valid age';
  if (numAge < 18) return 'Sorry, only participants aged 18-35 are eligible. Minimum age is 18.';
  if (numAge > 35) return 'Sorry, only participants aged 18-35 are eligible.';
  return null;
};

export const validateMobile = (mobile) => {
  const pattern = /^[6-9]\d{9}$/;
  if (!mobile) return 'Mobile number is required';
  if (!pattern.test(mobile)) return 'Enter a valid 10-digit Indian mobile number';
  return null;
};

export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!pattern.test(email)) return 'Enter a valid email address';
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') return `${fieldName} is required`;
  return null;
};

export const validateRegistration = (data) => {
  const errors = {};
  const nameErr = validateRequired(data.fullName, 'Full Name');
  if (nameErr) errors.fullName = nameErr;
  const ageErr = validateAge(data.age);
  if (ageErr) errors.age = ageErr;
  const mobileErr = validateMobile(data.mobile);
  if (mobileErr) errors.mobile = mobileErr;
  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;
  const districtErr = validateRequired(data.district, 'District');
  if (districtErr) errors.district = districtErr;
  const occupationErr = validateRequired(data.occupation, 'Occupation');
  if (occupationErr) errors.occupation = occupationErr;
  const govTypeErr = validateRequired(data.governmentIdType, 'Government ID type');
  if (govTypeErr) errors.governmentIdType = govTypeErr;
  const govNumberErr = validateRequired(data.governmentIdNumber, 'Government ID number');
  if (govNumberErr) errors.governmentIdNumber = govNumberErr;
  return errors;
};