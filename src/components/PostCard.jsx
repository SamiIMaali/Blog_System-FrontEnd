/*
import React from "react";

function PostCard({ post }) {
  if (!post) return null;

  return (
    <div className="post-card border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>

      {/* تحديد طول المحتوى حتى ما يطغى على الكرت *}
      <p className="text-gray-700 mb-3">
        {post.content?.length > 200
          ? post.content.slice(0, 200) + "..."
          : post.content}
      </p>

      <small className="text-gray-500">
        By: {post.user?.username || "Unknown"}
      </small>
    </div>
  );
}

export default PostCard;
*/
import React from 'react';

export default function PostCard({ post }) {
  return (
    <div style={{ background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,.06)' }}>
      <h3 style={{ margin: '0 0 8px' }}>{post.title}</h3>
      <p style={{ margin: '0 0 8px' }}>{post.content}</p>
      <small style={{ color: '#6b7280' }}>By: {post.user?.username || 'Unknown'}</small>
    </div>
  );
}
