import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login', { replace: true });
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="navbar-brand" aria-label="Blog System home">
          <span className="brand-icon" aria-hidden="true">
            B
          </span>

          <span className="brand-text">
            Blog<span>System</span>
          </span>
        </Link>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-link${isActive ? ' active' : ''}`
            }
          >
            Home
          </NavLink>

          {token ? (
            <>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' active' : ''}`
                }
              >
                New Post
              </NavLink>

              <button
                type="button"
                className="navbar-button navbar-button-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' active' : ''}`
                }
              >
                Login
              </NavLink>

              <Link to="/register" className="navbar-button navbar-button-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
