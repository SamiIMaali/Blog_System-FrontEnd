/* src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'; // 👈 يفضل إضافته لمنع دخول صفحات login/register بعد تسجيل الدخول
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={styles.main}>
        <Routes>
          {/* الصفحة الرئيسية *}
          <Route path="/" element={<Home />} />

          {/* صفحات عامة (فقط للزوار) *}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* صفحات محمية (للمستخدمين المسجلين فقط) *}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          {/* صفحة الخطأ 404 *}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

const styles = {
  main: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
};

export default App;
*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
