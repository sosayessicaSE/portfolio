import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext'; 
import './Signin.css'; // Import the CSS file for styling

const SigninComponent = () => {
  const { signin } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin({ email, password }); 
      setSuccessMessage('Sign in successful');
      navigate('/home'); 
    } catch (error) {
      setError('Invalid credentials'); 
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-content">
        <h2 className="signin-title">Sign In</h2>
        {error && <div className="signin-error">{error}</div>}
        {successMessage && <div className="signin-success">{successMessage}</div>}
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signin-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signin-input"
          />
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SigninComponent;
