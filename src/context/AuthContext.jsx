import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || '';
const buildUrl = (path) => `${API_BASE}${path}`;

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('dmk_current_user');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(buildUrl('/api/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) return { success: false, message: result.message || 'Invalid credentials' };

      setCurrentUser(result);
      localStorage.setItem('dmk_current_user', JSON.stringify(result));
      return { success: true, user: result };
    } catch (error) {
      return { success: false, message: 'Unable to connect to backend server' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(buildUrl('/api/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (!response.ok) return { success: false, message: result.message || 'Registration failed' };

      setCurrentUser(result);
      localStorage.setItem('dmk_current_user', JSON.stringify(result));
      return { success: true, user: result };
    } catch (error) {
      return { success: false, message: 'Unable to connect to backend server' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dmk_current_user');
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch(buildUrl('/api/users'));
      if (!response.ok) return [];
      const data = await response.json();
      setUsers(data);
      return data;
    } catch (error) {
      return [];
    }
  };

  const updateUserStatus = async (userId, status) => {
    try {
      const response = await fetch(buildUrl(`/api/users/${userId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) return false;
      const updatedUser = await response.json();
      setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      return true;
    } catch (error) {
      return false;
    }
  };

  const markAttendance = async () => {
    if (!currentUser?.id) return;
    try {
      const response = await fetch(buildUrl(`/api/users/${currentUser.id}/attendance`), {
        method: 'PATCH',
      });
      if (!response.ok) return;
      const updatedUser = await response.json();
      setCurrentUser(updatedUser);
      localStorage.setItem('dmk_current_user', JSON.stringify(updatedUser));
    } catch (error) {
      // ignore errors for attendance tracking
    }
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