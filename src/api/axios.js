// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://44cf-103-15-58-118.ngrok-free.app/", // You can use env variables for API URL
  timeout: 10000, // Request timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for request (if you need to add authorization tokens, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Example: getting the token from local storage
    if (token) {
      config.headers.token = `${token}`; // Add token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally handle unauthorized errors globally
      // e.g., Redirect to login page or refresh token logic
      console.error("Unauthorized, redirect to login!");
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
