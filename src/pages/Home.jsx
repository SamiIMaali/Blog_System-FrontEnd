import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();

        if (!Array.isArray(data)) {
          throw new Error('Invalid posts response from server.');
        }

        setPosts(data);
      } catch (err) {
        setError(err.message || 'Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostUpdated = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post._id === updatedPost._id
          ? {
              ...post,
              ...updatedPost,
              user: updatedPost.user ?? post.user,
            }
          : post
      )
    );
  };

  const handlePostDeleted = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post._id !== postId)
    );
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const title = post.title || '';
    const content = post.content || '';
    const username =
      typeof post.user === 'object' ? post.user?.username || '' : '';

    return (
      title.toLowerCase().includes(normalizedSearch) ||
      content.toLowerCase().includes(normalizedSearch) ||
      username.toLowerCase().includes(normalizedSearch)
    );
  });

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">
            YOUR SPACE TO SHARE IDEAS
          </span>

          <h1>
            Stories worth
            <span> sharing.</span>
          </h1>

          <p className="hero-description">
            Discover ideas, share your thoughts, and connect through
            stories that matter.
          </p>

          <div className="hero-actions">
            {isLoggedIn ? (
              <Link to="/create" className="home-primary-button">
                <span aria-hidden="true">+</span>
                Write a post
              </Link>
            ) : (
              <Link to="/register" className="home-primary-button">
                Get started
                <span aria-hidden="true">→</span>
              </Link>
            )}

            <a href="#latest-posts" className="home-secondary-button">
              Explore stories
            </a>
          </div>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <div className="decoration-card decoration-card-back">
            <span className="decoration-line decoration-line-short" />
            <span className="decoration-line" />
            <span className="decoration-line decoration-line-medium" />
          </div>

          <div className="decoration-card decoration-card-front">
            <span className="decoration-icon">✦</span>
            <span className="decoration-label">A new perspective</span>
            <span className="decoration-line" />
            <span className="decoration-line decoration-line-medium" />
            <span className="decoration-line decoration-line-short" />
          </div>

          <span className="decoration-spark decoration-spark-one">✳</span>
          <span className="decoration-spark decoration-spark-two">✦</span>
        </div>
      </section>

      <section className="posts-section" id="latest-posts">
        <div className="posts-heading">
          <div>
            <span className="section-eyebrow">THE COMMUNITY</span>

            <h2>Latest stories</h2>

            <p className="section-description">
              Thoughts and ideas shared by our community.
            </p>
          </div>

          <div className="posts-count">
            <span className="posts-count-number">{posts.length}</span>
            <span>{posts.length === 1 ? 'post' : 'posts'}</span>
          </div>
        </div>

        <div className="posts-toolbar">
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              placeholder="Search stories or authors..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search posts by title, content, or author"
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
        </div>

        {loading && (
          <div className="posts-message" role="status">
            <span className="loading-spinner" aria-hidden="true" />
            <h3>Loading stories...</h3>
            <p>Give us a moment while we fetch the latest posts.</p>
          </div>
        )}

        {!loading && error && (
          <div className="posts-message posts-error" role="alert">
            <span className="message-icon" aria-hidden="true">
              !
            </span>

            <h3>Something went wrong</h3>
            <p>{error}</p>

            <button
              type="button"
              className="home-secondary-button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="posts-message">
            <span className="message-icon" aria-hidden="true">
              ✎
            </span>

            <h3>Your next favorite story starts here.</h3>

            <p>
              There are no posts yet. Be the first to share something!
            </p>

            {isLoggedIn && (
              <Link to="/create" className="home-primary-button">
                Create the first post
              </Link>
            )}
          </div>
        )}

        {!loading &&
          !error &&
          posts.length > 0 &&
          filteredPosts.length === 0 && (
            <div className="posts-message">
              <span className="message-icon" aria-hidden="true">
                ⌕
              </span>

              <h3>No stories found</h3>

              <p>
                We couldn't find any posts matching "{search}".
                Try a different search.
              </p>

              <button
                type="button"
                className="home-secondary-button"
                onClick={() => setSearch('')}
              >
                Clear search
              </button>
            </div>
          )}

        {!loading && !error && filteredPosts.length > 0 && (
          <div className="posts-grid">
            {filteredPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onPostUpdated={handlePostUpdated}
                onPostDeleted={handlePostDeleted}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="home-footer">
        <p>
          Made for curious minds. <span>Keep sharing your ideas.</span>
        </p>
      </footer>
    </div>
  );
}
