import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (formData) => {
    try {
      const response = await axios.post('/signup', formData);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token); // Store token with consistent key
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const signin = async (formData) => {
    try {
      const response = await axios.post('/signin', formData);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token); // Store token with consistent key
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token'); // Remove token with consistent key
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Check if user is authenticated on initial render
  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: `${token}`
          }
        });
        const loggedInUser = response.data;
        setUser(loggedInUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  // Call checkAuthentication on initial render
  useState(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
