const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '');

const buildApiUrl = (path) => {
  if (!API_URL) {
    throw new Error('API URL is not configured');
  }

  return `${API_URL}${path}`;
};

const handleResponse = async (res) => {
  const responseText = await res.text();

  let data = null;

  if (responseText.trim()) {
    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(
        res.ok
          ? 'Invalid server response'
          : `Request failed with status ${res.status}`
      );
    }
  }

  if (!res.ok) {
    throw new Error(
      data?.message || `Request failed with status ${res.status}`
    );
  }

  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(buildApiUrl('/auth/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return handleResponse(res);
};

export const loginUser = async (credentials) => {
  const res = await fetch(buildApiUrl('/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse(res);
};

export const getPosts = async () => {
  const res = await fetch(buildApiUrl('/posts'));

  return handleResponse(res);
};

export const createPost = async (postData) => {
  const token = localStorage.getItem('token');

  const res = await fetch(buildApiUrl('/posts'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(postData),
  });

  return handleResponse(res);
};

// Get a single post by ID
export const getPostById = async (id) => {
  const res = await fetch(
    buildApiUrl(`/posts/${encodeURIComponent(id)}`)
  );

  return handleResponse(res);
};

// Update an existing post
export const updatePost = async (id, postData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Please log in to update a post');
  }

  const res = await fetch(
    buildApiUrl(`/posts/${encodeURIComponent(id)}`),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );

  return handleResponse(res);
};

// Delete an existing post
export const deletePost = async (id) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Please log in to delete a post');
  }

  const res = await fetch(
    buildApiUrl(`/posts/${encodeURIComponent(id)}`),
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return handleResponse(res);
};
