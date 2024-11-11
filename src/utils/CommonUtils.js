import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navigate = useNavigate(); // Initialize the hook for navigation
export const handleGoogleSuccess = (googleToken) => {
  // Call your backend with the Google token for verification
  console.log("Google Login Successful:", googleToken);
  toast.success("Google Login Successful");
  // After successful Google login, redirect to dashboard or homepage
  navigate("/"); // Change to your desired route
};

export const handleGoogleFailure = (error) => {
  console.error("Google Login Failed:", error);
};
