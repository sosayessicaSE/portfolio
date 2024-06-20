import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Import useAuth hook from authContext

const SigninComponent = () => {
  const { signin } = useAuth(); // Use the signin method from useAuth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin({ email, password }); // Call the signin method from useAuth
      setSuccessMessage('Sign in successful');
      navigate('/home'); // Redirect to home page on successful sign-in
    } catch (error) {
      setError('Invalid credentials'); 
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SigninComponent;
