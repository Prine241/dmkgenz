import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('dmk_current_user');
    const storedUsers = localStorage.getItem('dmk_users');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const storedUsers = JSON.parse(localStorage.getItem('dmk_users') || '[]');
    const user = storedUsers.find(u => u.email?.toLowerCase() === normalizedEmail && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('dmk_current_user', JSON.stringify(user));
      return { success: true, user };
    }
    // Admin login
    if (normalizedEmail === 'admin@dmkgenzevent2026.org' && password === 'Dm2K$GenZ@2026Event!') {
      const adminUser = { email: 'admin@dmkgenzevent2026.org', role: 'admin', name: 'Admin' };
      setCurrentUser(adminUser);
      localStorage.setItem('dmk_current_user', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem('dmk_users') || '[]');
    const exists = storedUsers.find(u => u.email === userData.email);
    if (exists) return { success: false, message: 'Email already registered' };

    const regId = 'GENZ-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const referralCode = 'GENZ-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    const newUser = {
      ...userData,
      id: Date.now(),
      registrationId: regId,
      referralCode,
      referralCount: 0,
      friendsJoined: [],
      status: 'pending',
      attendanceMarked: false,
      registeredAt: new Date().toISOString(),
      role: 'user'
    };

    // Check if referred by someone
    if (userData.referredBy) {
      const referrer = storedUsers.find(u => u.referralCode === userData.referredBy);
      if (referrer) {
        referrer.referralCount = (referrer.referralCount || 0) + 1;
        referrer.friendsJoined = [...(referrer.friendsJoined || []), userData.fullName];
        const updatedUsers = storedUsers.map(u => u.id === referrer.id ? referrer : u);
        updatedUsers.push(newUser);
        localStorage.setItem('dmk_users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
      } else {
        storedUsers.push(newUser);
        localStorage.setItem('dmk_users', JSON.stringify(storedUsers));
        setUsers(storedUsers);
      }
    } else {
      storedUsers.push(newUser);
      localStorage.setItem('dmk_users', JSON.stringify(storedUsers));
      setUsers(storedUsers);
    }

    setCurrentUser(newUser);
    localStorage.setItem('dmk_current_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dmk_current_user');
  };

  const updateUserStatus = (userId, status) => {
    const storedUsers = JSON.parse(localStorage.getItem('dmk_users') || '[]');
    const updated = storedUsers.map(u => u.id === userId ? { ...u, status } : u);
    localStorage.setItem('dmk_users', JSON.stringify(updated));
    setUsers(updated);
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, status };
      setCurrentUser(updatedUser);
      localStorage.setItem('dmk_current_user', JSON.stringify(updatedUser));
    }
  };

  const markAttendance = () => {
    const storedUsers = JSON.parse(localStorage.getItem('dmk_users') || '[]');
    const updated = storedUsers.map(u =>
      u.id === currentUser.id ? { ...u, attendanceMarked: true } : u
    );
    localStorage.setItem('dmk_users', JSON.stringify(updated));
    const updatedUser = { ...currentUser, attendanceMarked: true };
    setCurrentUser(updatedUser);
    localStorage.setItem('dmk_current_user', JSON.stringify(updatedUser));
  };

  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('dmk_users') || '[]');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      user: currentUser,
      users,
      loading,
      login,
      register,
      logout,
      updateUserStatus,
      markAttendance,
      getAllUsers,
    }}>
      {children}
    </AuthContext.Provider>
  );
};