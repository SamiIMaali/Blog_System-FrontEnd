/* 
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
// add logging code here to check then will remove it 
*/

const API_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (res) => {
  let data;

  try {
    data = await res.json();

    console.log("📥 RESPONSE DATA:", data);
  } catch {
    console.error("❌ Failed to parse server response as JSON");
    throw new Error('Invalid server response');
  }

  console.log("📊 RESPONSE STATUS:", res.status);
  console.log("📊 RESPONSE STATUS TEXT:", res.statusText);

  if (!res.ok) {
    console.error("❌ REQUEST FAILED");
    console.error("Server message:", data?.message);

    throw new Error(data?.message || 'Request failed');
  }

  return data;
};

export const registerUser = async (userData) => {
  console.log("=================================");
  console.log("📤 REGISTER REQUEST");
  console.log("API URL:", `${API_URL}/auth/register`);
  console.log("Request data:", {
    username: userData.username,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    passwordReceived: !!userData.password
  });
  console.log("=================================");

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    });

    console.log("📥 REGISTER RESPONSE");
    console.log("Status:", res.status);
    console.log("Status text:", res.statusText);

    return handleResponse(res);

  } catch (error) {
    console.error("=================================");
    console.error("❌ REGISTER FETCH ERROR");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    console.error("=================================");

    throw error;
  }
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


