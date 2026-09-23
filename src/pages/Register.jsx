/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ التحقق من الحقول المطلوبة
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser({ username, email, password });

      if (data && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/'); // ✅ إعادة التوجيه بعد التسجيل الناجح
      } else {
        setError(data?.message || 'Registration failed');
      }
    } catch (err) {
      // ❌ تصحيح الخطأ: ما نمرر err كوسيط ثاني
      console.error('Error during registration:', err);
      setError(err.message, 'An error occurred while communicating with the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-2">Register New User</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="border p-2 rounded-md"
      />

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
      {loading && <p className="text-gray-500 text-sm">Registering...</p>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

export default Register;
*/
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {

    const data = await registerUser({
     username,
     email,
     password,
     firstName,
     lastName
    });

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      <h2>Register</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <input
	  value={firstName}
	  onChange={e => setFirstName(e.target.value)}
	  placeholder="First Name"
	  required
      />
      <input
	  value={lastName}
	  onChange={e => setLastName(e.target.value)}
	  placeholder="Last Name"
	  required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
}
