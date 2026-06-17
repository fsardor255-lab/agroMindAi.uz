import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if token exists on load and verify it
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (err) {
        console.error('Session verification failed, logging out:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userProfile } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userProfile);
      return userProfile;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login vaqtida xatolik yuz berdi';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password, phoneNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', { 
        username, 
        email, 
        password, 
        phoneNumber 
      });
      const { token, user: userProfile } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userProfile);
      return userProfile;
    } catch (err) {
      const msg = err.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (idToken) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/google', { idToken });
      const { token, user: userProfile } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userProfile);
      return userProfile;
    } catch (err) {
      const msg = err.response?.data?.message || 'Google orqali kirishda xatolik yuz berdi';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        loginWithGoogle,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
