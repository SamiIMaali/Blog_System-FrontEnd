import React, { useEffect, useState } from 'react';
import { updatePost, deletePost } from '../services/api';

export default function PostCard({
  post,
  onPostUpdated,
  onPostDeleted,
}) {
  const [currentUser, setCurrentUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');

      setCurrentUser(
        storedUser ? JSON.parse(storedUser) : null
      );
    } catch {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    setTitle(post.title || '');
    setContent(post.content || '');
  }, [post.title, post.content]);

  const ownerId =
    typeof post.user === 'object'
      ? post.user?._id
      : post.user;

  const isOwner =
    Boolean(currentUser?.id) &&
    Boolean(ownerId) &&
    String(currentUser.id) === String(ownerId);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);

    try {
      const updatedPost = await updatePost(post._id, {
        title: trimmedTitle,
        content: trimmedContent,
      });

      onPostUpdated(updatedPost);

      setIsEditing(false);
      setSuccess('Post updated successfully.');
    } catch (err) {
      setError(err.message || 'Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await deletePost(post._id);

      onPostDeleted(post._id);
    } catch (err) {
      setError(err.message || 'Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setTitle(post.title || '');
    setContent(post.content || '');
    setError('');
    setSuccess('');
    setIsEditing(false);
  };

  return (
    <article
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 10,
        boxShadow: '0 1px 6px rgba(0,0,0,.06)',
        border: '1px solid #e5e7eb',
      }}
    >
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: 12 }}>
            <label
              htmlFor={`title-${post._id}`}
              style={{
                display: 'block',
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              Title
            </label>

            <input
              id={`title-${post._id}`}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
              disabled={loading}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: 10,
                border: '1px solid #d1d5db',
                borderRadius: 6,
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label
              htmlFor={`content-${post._id}`}
              style={{
                display: 'block',
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              Content
            </label>

            <textarea
              id={`content-${post._id}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              disabled={loading}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: 10,
                border: '1px solid #d1d5db',
                borderRadius: 6,
                resize: 'vertical',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#2563eb',
                color: '#fff',
                padding: '8px 14px',
                borderRadius: 6,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={loading}
              style={{
                padding: '8px 14px',
                borderRadius: 6,
                border: '1px solid #d1d5db',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3
            style={{
              margin: '0 0 10px',
              fontSize: 20,
              fontWeight: 600,
              overflowWrap: 'anywhere',
            }}
          >
            {post.title}
          </h3>

          <p
            style={{
              margin: '0 0 14px',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
            }}
          >
            {post.content}
          </p>

          <small style={{ color: '#6b7280' }}>
            By: {post.user?.username || 'Unknown'}
          </small>

          {isOwner && (
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginTop: 14,
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setSuccess('');
                  setIsEditing(true);
                }}
                disabled={loading}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                style={{
                  background: '#dc2626',
                  color: '#fff',
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: 6,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Please wait...' : 'Delete'}
              </button>
            </div>
          )}
        </>
      )}

      {error && (
        <p
          role="alert"
          style={{
            color: '#dc2626',
            marginTop: 12,
            overflowWrap: 'anywhere',
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          style={{
            color: '#15803d',
            marginTop: 12,
          }}
        >
          {success}
        </p>
      )}
    </article>
  );
}
