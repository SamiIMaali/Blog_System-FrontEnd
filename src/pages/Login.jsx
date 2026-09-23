/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (data && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/'); // التوجيه إلى الصفحة الرئيسية
      } else {
        setError(data?.message || 'Invalid email or password.');
      }
    } catch (err) {
      // ❌ التصحيح هنا: ما نرسل err كقيمة ثانية
      console.error('Error during login:', err);
      setError(err.message, 'Network error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="border p-2 rounded-md"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="border p-2 rounded-md"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loading && <p className="text-gray-500 text-sm">Logging in...</p>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;
*/
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
    </form>
  );
}
