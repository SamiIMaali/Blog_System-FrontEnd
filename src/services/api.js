const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (res) => {
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Invalid server response');
  }
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};

export const getPosts = async () => {
  const res = await fetch(`${API_URL}/posts`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(res);
};

export const createPost = async (postData) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(postData),
  });
  return handleResponse(res);
};
