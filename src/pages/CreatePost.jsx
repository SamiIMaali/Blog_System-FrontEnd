/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to create a post.');
      setLoading(false);
      return;
    }

    try {
      const res = await createPost({ title, content }, token);

      if (res && res._id) {
        navigate('/'); // تم إنشاء المنشور بنجاح → نرجع للصفحة الرئيسية
      } else {
        setError(res?.message || 'Failed to create post');
      }
    } catch (err) {
      // ❌ التصحيح هنا: ما نمرر err مباشرة
      console.error('Error creating post:', err);
      setError(err.message, 'Server error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-2">Create New Post</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded-md"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows="6"
        className="border p-2 rounded-md"
        required
      ></textarea>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {loading && <p className="text-gray-500 text-sm">Creating post...</p>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}

export default CreatePost;
*/
import React, { useState } from 'react';
import { createPost } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createPost({ title, content });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate} style={{ display:'flex', flexDirection:'column', gap:8, maxWidth:640 }}>
      <h2>Create Post</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" rows={6} required />
      {error && <p style={{ color:'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
    </form>
  );
}
