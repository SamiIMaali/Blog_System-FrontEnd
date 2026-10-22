import { useEffect, useState } from 'react';
import { updatePost, deletePost } from '../services/api';
import './PostCard.css';

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

      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    } catch {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    setTitle(post.title || '');
    setContent(post.content || '');
  }, [post.title, post.content]);

  const ownerId =
    typeof post.user === 'object' ? post.user?._id : post.user;

  const isOwner =
    Boolean(currentUser?.id) &&
    Boolean(ownerId) &&
    String(currentUser.id) === String(ownerId);

  const authorName =
    typeof post.user === 'object'
      ? post.user?.username || 'Community member'
      : 'Community member';

  const handleUpdate = async (event) => {
    event.preventDefault();

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
    <article className="post-card">
      <div className="post-card-topline">
        <span className="post-category">
          <span aria-hidden="true">✦</span>
          COMMUNITY STORY
        </span>

        {isOwner && !isEditing && (
          <span className="post-owner-badge">Your post</span>
        )}
      </div>

      {isEditing ? (
        <form className="post-edit-form" onSubmit={handleUpdate}>
          <div className="post-form-field">
            <label htmlFor={`title-${post._id}`}>Post title</label>

            <input
              id={`title-${post._id}`}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={200}
              disabled={loading}
            />
          </div>

          <div className="post-form-field">
            <label htmlFor={`content-${post._id}`}>Post content</label>

            <textarea
              id={`content-${post._id}`}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
              rows={6}
              disabled={loading}
            />
          </div>

          <div className="post-actions">
            <button
              type="submit"
              className="post-button post-button-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save changes'}
            </button>

            <button
              type="button"
              className="post-button post-button-secondary"
              onClick={handleCancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="post-title">{post.title}</h3>

          <p className="post-content">{post.content}</p>

          <div className="post-card-divider" />

          <div className="post-card-bottom">
            <div className="post-author">
              <span className="author-avatar" aria-hidden="true">
                {authorName.charAt(0).toUpperCase()}
              </span>

              <div className="author-details">
                <span className="author-label">Written by</span>
                <span className="author-name">{authorName}</span>
              </div>
            </div>

            {isOwner && (
              <div className="post-actions">
                <button
                  type="button"
                  className="post-button post-button-edit"
                  onClick={() => {
                    setError('');
                    setSuccess('');
                    setIsEditing(true);
                  }}
                  disabled={loading}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="post-button post-button-delete"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {error && (
        <p className="post-feedback post-feedback-error" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="post-feedback post-feedback-success" role="status">
          {success}
        </p>
      )}
    </article>
  );
}
