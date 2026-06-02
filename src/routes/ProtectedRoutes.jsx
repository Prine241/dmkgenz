import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="loading-screen">
      <div className="loading-panel glass-card">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  const isAdmin = user?.role === 'admin' || user?.email === 'admin@dmkgenzevent2026.org';
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" replace />;
};