import axios from "axios";

const API_URL = "http://localhost:8000";

export const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  return axios.post(`${API_URL}/api/register`, {
    name,
    email,
    password,
    password_confirmation,
  });
};

export const login = async (email: string, password: string) => {
  await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });

  // Login isteği
  const response = await axios.post(
      `${API_URL}/api/login`,
      { email, password },
      { withCredentials: true }
  );

  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }

  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) return;

  await axios.post(
    `${API_URL}/api/logout`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  localStorage.removeItem("authToken");
};
