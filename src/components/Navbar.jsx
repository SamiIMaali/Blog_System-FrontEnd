import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // Remove authentication token.
    localStorage.removeItem('token');

    // Remove stored user information.
    localStorage.removeItem('user');

    // Redirect to the login page.
    navigate('/login');
  };

  return (
    <nav
      style={{
        background: '#fff',
        padding: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,.06)',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/create">New Post</Link>

            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
