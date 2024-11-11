import { useState } from "react";
import { authAPI } from "../api";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      const response = await authAPI.login(data);
      setUser(response.user);
      localStorage.setItem("token", response.token);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem("token");
    } catch (error) {
      setError("Logout failed.");
    }
  };

  return { user, login, logout, error };
};

export default useAuth;
