import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import "./LoginForm.scss";
import { UserLogo } from "../../assets/images/Images";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../api";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLoginButton } from "./GoogleLoginButton";
import TextLoader from "../customLoader/Loader";
import ToastContainer from "../customToaster/ToastContainer";

const LoginForm = () => {
  const toastRef = useRef();
  const navigate = useNavigate(); // Initialize the hook for navigation
  const [loader, setLoader] = useState(false);
  const [isCaptchaValid, setCaptchaValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginAPICall = async (data) => {
    try {
      const response = await authAPI.login(data);
      localStorage.setItem("accessToken", response.access_token);
      toastRef.current.addToast("Login successfully!", 3000);
      // toast.success("Google Login Successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toastRef.current.addToast(
        "Login failed. Please check your credentials.",
        3000
      );
      // toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  const onSubmit = async (data) => {
    let reqData = {
      fcm_token: localStorage.getItem("ct") || "",
      google_signed: false,
      email: data.emailId,
      password: data.password,
    };
    loginAPICall(reqData);
  };

  const handleGoogleSuccess = (googleToken) => {
    // Call your backend with the Google token for verification
    console.log("Google Login Successful:", googleToken);
    let data = {
      fcm_token: localStorage.getItem("ct"),
      google_signed: true,
      email: googleToken.email,
    };
    loginAPICall(data);
  };

  const onCaptchaHandler = (value) => {
    setCaptchaValid(!!value);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <React.Fragment>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      {loader && <TextLoader />}
      <ToastContainer ref={toastRef} />
      <div className="login-page">
        <div className="login-container">
          <h2>Sign In</h2>
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            isCaptchaValid={isCaptchaValid}
          />
          <div className="divider">
            <span>Or</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="emailId">Email ID</label>
              <input
                type="emailId"
                id="emailId"
                {...register("emailId", {
                  required: "Email ID is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid emailId format",
                  },
                })}
                placeholder="Email ID"
              />
              {errors.emailId && (
                <span className="error">{errors.emailId.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  // minLength: {
                  //   value: 8,
                  //   message: "Password must be at least 8 characters long",
                  // },
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  //   message:
                  //     "Password must contain uppercase, lowercase, number, and special character",
                  // },
                })}
                placeholder="Password"
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <ReCAPTCHA
              sitekey="6Ld00WsqAAAAAOuiln-bvbtY51x6dgjs2tanbROk"
              onChange={onCaptchaHandler}
              className="recaptcha-container"
              size="normal"
            />
            <button
              type="submit"
              className={isCaptchaValid ? "login-btn" : "disabled-btn"}
              disabled={!isCaptchaValid}
            >
              Sign In
            </button>
          </form>
          <div className="sign-up">
            Don’t have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
