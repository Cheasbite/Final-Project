
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/apiClient.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if a PHP session is already active (e.g. after a page refresh).
    api('me.php')
      .then((user) => setCurrentUser(user))
      .catch(() => setCurrentUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email, password) => {
    const user = await api('login.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setCurrentUser(user);
    return user;
  };

  const signup = async (email, password, passwordConfirm, name) => {
    const user = await api('signup.php', {
      method: 'POST',
      body: JSON.stringify({ email, password, passwordConfirm, name }),
    });
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await api('logout.php', { method: 'POST' });
    } finally {
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
