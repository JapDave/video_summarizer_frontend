import React from "react";
import LoginPage from "../features/login/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupPage from "../features/signUp/SignupPage";
import "../App.css";
import { ToastContainer } from "react-toastify";
import HomePage from "../features/homePage";
import ContactUsPage from "../features/contactUs/COntactUs";
import Notification from "../components/notification/Notification";
import Profile from "../features/profile/Profile";
import SummarizeContent from "../components/summarizeContent/SummarizeContent";
import TermsAndConditions from "../features/termsPolicy/TermsAndConditions";
import Privacy from "../features/privacyPolicy/Privacy";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/video-summarize" element={<SummarizeContent />} />
      <Route path="/terms-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<HomePage />} /> {/* Default route */}
    </Routes>
  );
};

export default AppRoutes;
