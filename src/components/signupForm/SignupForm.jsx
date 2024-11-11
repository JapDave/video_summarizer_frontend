import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import "./SignupForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserLogo } from "../../assets/images/Images";
import { GoogleLoginButton } from "../loginForm/GoogleLoginButton";
import { API_BASE_URL } from "../../utils/ENVImport";
import { authAPI } from "../../api";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "../customLoader/CustomLoader";
import ToastContainer from "../customToaster/ToastContainer";

const SignupForm = () => {
  const toastRef = useRef();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isCaptchaValid, setCaptchaValid] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUPAPICall = async (data) => {
    try {
      setLoader(true);
      const response = await authAPI.signup(data);
      localStorage.setItem("accessToken", response.access_token);
      toastRef.current.addToast("Singup Successful", 3000);
      // toast.success("Singup Successful");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      toastRef.current.addToast("Login failed", 3000);
      // toast.error(error.message);
      // setError("api", {
      //   message: "Login failed. Please check your credentials.",
      // });
      setLoader(false);
    }
  };

  const onSubmit = async (data) => {
    let signUpData = {
      email: data.email,
      first_name: data.firstname,
      last_name: data.lastname,
      password: data.password,
      fcm_token: localStorage.getItem("ct"),
      google_signed: false,
    };
    let apiCall = signUPAPICall(signUpData);
  };

  const handleGoogleSuccess = async (googleToken) => {
    let signUpData = {
      email: googleToken.email,
      first_name: googleToken.given_name,
      last_name: googleToken.family_name,
      fcm_token: localStorage.getItem("ct"),
      google_signed: true,
    };
    let apiCall = signUPAPICall(signUpData);

    // After successful Google login, redirect to dashboard or homepage
    // Change to your desired route
  };

  const onCaptchaHandler = (value) => {
    setCaptchaValid(!!value);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleTermsCheckbox = (e) => {
    setIsTermsAccepted(e.target.checked);
  };

  return (
    <React.Fragment>
      {loader && <CustomLoader />}
      <ToastContainer ref={toastRef} />
      <div className="signup-page">
        <div className="signup-container">
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
              <label htmlFor="firstname">FirstName</label>
              <input
                type="text"
                id="firstname"
                {...register("firstname", {
                  required: "FirstName is required",
                })}
                placeholder="FirstName"
              />
              {errors.firstname && (
                <span className="error">{errors.firstname.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastname">LastName</label>
              <input
                type="text"
                id="lastname"
                {...register("lastname", { required: "LastName is required" })}
                placeholder="LastName"
              />
              {errors.lastname && (
                <span className="error">{errors.lastname.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email ID is required" })}
                placeholder="Email ID"
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <div className="form-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <ReCAPTCHA
              sitekey="6Ld00WsqAAAAAOuiln-bvbtY51x6dgjs2tanbROk"
              onChange={onCaptchaHandler}
              className="recaptcha-container"
              size="normal"
            />
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="termsCheckbox"
                onChange={handleTermsCheckbox}
              />
              <label htmlFor="termsCheckbox">
                I accept the{" "}
                <a
                  href="/terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              className={
                isCaptchaValid && isTermsAccepted
                  ? "signup-btn"
                  : "disabled-btn"
              }
              disabled={!isCaptchaValid && isTermsAccepted}
            >
              Sign Up
            </button>
          </form>
          <div className="sign-up">
            Already have an account? <a href="/login">Log In</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignupForm;
