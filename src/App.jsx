import React, { useEffect } from "react";
import LoginPage from "./features/login/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupPage from "./features/signUp/SignupPage";
import "./app.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./features/homePage";
import ContactUsPage from "./features/contactUs/COntactUs";
import Notification from "./components/notification/Notification";
import Profile from "./features/profile/Profile";
import SummarizeContent from "./components/summarizeContent/SummarizeContent";
import TermsAndConditions from "./features/termsPolicy/TermsAndConditions";
import Privacy from "./features/privacyPolicy/Privacy";
import AdminRoutes from "./routes/AdminRoutes";
import { setUserData } from "./redux/slices/adminSlice";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  const getLoggedInUser = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/users/me`,
        {
          method: "GET",
          headers: {
            Token: `${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserData(data));
      } else if (response.status === 401) {
        console.warn("Unauthorized access. Redirecting to login.");
        localStorage.clear();
        location.reload();
      } else if (response.status === 404) {
        console.warn("User not found.");
      } else {
        console.warn("Failed to fetch user data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getLoggedInUser();
    }
  }, [token]);

  return (
    <React.Fragment>
      <Notification />
      <Router>
        <Routes>
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video-summarize" element={<SummarizeContent />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<Privacy />} />
          {isAdmin ? (
            <Route path="/admin/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/" />} />
          )}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

export default App;
