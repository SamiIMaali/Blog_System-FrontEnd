/*
import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard'; // إذا عندك مكوّن PostCard

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError('Invalid response format from server');
        }
      } catch (err) {
        setError(err?.message || 'An error occurred while fetching posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 🌀 أثناء التحميل
  if (isLoading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        ⏳ Loading posts...
      </div>
    );
  }

  // ⚠️ في حال الخطأ
  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        ❌ Error: {error}
      </div>
    );
  }

  // 📭 لا يوجد منشورات
  if (posts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        😕 No posts to display.
      </div>
    );
  }

  // ✅ عرض المنشورات
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">📝 All Posts</h2>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
*/
import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {posts.map(p => <PostCard key={p._id} post={p} />)}
    </div>
  );
}
