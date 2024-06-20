import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './authContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Use isAuthenticated from useAuth

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from useAuth
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
