/*
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // تنقل داخلي بدون إعادة تحميل الصفحة
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-sm">
      <div className="flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>

        {token ? (
          <>
            <Link to="/create" className="text-blue-600 hover:underline">
              New Post
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
*/
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#fff', padding: 12, boxShadow: '0 1px 4px rgba(0,0,0,.06)'}}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/create">New Post</Link>
            <button onClick={handleLogout}>Logout</button>
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
