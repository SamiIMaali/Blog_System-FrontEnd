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

        if (!Array.isArray(data)) {
          throw new Error('Invalid posts response from server');
        }

        setPosts(data);
      } catch (err) {
        setError(err.message || 'Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Update a post in the current list without reloading the page.
  const handlePostUpdated = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post._id === updatedPost._id
          ? {
              ...post,
              ...updatedPost,
              user: post.user,
            }
          : post
      )
    );
  };

  // Remove a deleted post from the current list.
  const handlePostDeleted = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post._id !== postId)
    );
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (posts.length === 0) {
    return <p>No posts yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📝 All Posts
      </h2>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onPostUpdated={handlePostUpdated}
            onPostDeleted={handlePostDeleted}
          />
        ))}
      </div>
    </div>
  );
}
