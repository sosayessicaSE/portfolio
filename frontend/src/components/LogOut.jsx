import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const LogoutComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  const [error, setError] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        logout();
        navigate('/signin');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      {error && <div>{error}</div>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutComponent;
