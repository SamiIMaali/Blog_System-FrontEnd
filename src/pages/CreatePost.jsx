import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import './CreatePost.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to create a post.');
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);

    try {
      await createPost({
        title: trimmedTitle,
        content: trimmedContent,
      });

      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-post-page">
      <header className="create-post-header">
        <span className="create-post-eyebrow">
          YOUR NEXT STORY STARTS HERE
        </span>

        <h1>Create something meaningful.</h1>

        <p>
          Share your knowledge, express your ideas, and give the community
          something worth reading.
        </p>
      </header>

      <div className="create-post-card">
        <div className="create-post-card-heading">
          <div className="create-post-heading-icon" aria-hidden="true">
            ✎
          </div>

          <div>
            <h2>Write your post</h2>
            <p>Give your story a title and bring your ideas to life.</p>
          </div>
        </div>

        <form className="create-post-form" onSubmit={handleCreate}>
          <div className="create-post-field">
            <div className="create-post-label-row">
              <label htmlFor="post-title">Post title</label>

              <span className="create-post-hint">
                {title.length} characters
              </span>
            </div>

            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your story a memorable title..."
              maxLength={200}
              required
              disabled={loading}
            />
          </div>

          <div className="create-post-field">
            <div className="create-post-label-row">
              <label htmlFor="post-content">Your story</label>

              <span className="create-post-hint">
                {content.length} characters
              </span>
            </div>

            <textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your thoughts here..."
              rows={9}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p className="create-post-error" role="alert">
              {error}
            </p>
          )}

          <div className="create-post-actions">
            <p className="create-post-note">
              Take your time. Your ideas deserve to be shared.
            </p>

            <div className="create-post-buttons">
              <Link
                to="/"
                className="create-post-button create-post-button-secondary"
                aria-disabled={loading}
                onClick={(e) => {
                  if (loading) e.preventDefault();
                }}
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="create-post-button create-post-button-primary"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish post'}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
