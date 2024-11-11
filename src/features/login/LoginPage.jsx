import React from "react";
import "./LoginPage.scss";
import LoginForm from "../../components/loginForm/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
