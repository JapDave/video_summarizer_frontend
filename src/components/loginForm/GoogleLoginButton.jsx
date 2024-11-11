import React, { useEffect } from "react";
import { loadGoogleScript } from "../../utils/LoadGoogleScript";
import { GOOGLE_LOGIN_CLIENT_ID } from "../../utils/ENVImport";
import { jwtDecode } from "jwt-decode";
export const GoogleLoginButton = ({ onSuccess, onFailure, isCaptchaValid }) => {
  useEffect(() => {
    const initializeGoogleLogin = async () => {
      try {
        await loadGoogleScript(); // Wait for the script to load
        if (window.google) {
          google.accounts.id.initialize({
            client_id: GOOGLE_LOGIN_CLIENT_ID,
            callback: handleCredentialResponse,
          });

          google.accounts.id.renderButton(
            document.getElementById("google-signin-btn"),
            { theme: "outline", size: "large" } // Customize button style
          );
        }
      } catch (error) {
        console.error("Google API script failed to load:", error);
      }
    };

    initializeGoogleLogin(); // Call the async function to initialize Google Login
  }, []);

  const handleCredentialResponse = (response) => {
    const decodedToken = jwtDecode(response.credential);
    console.log("Decoded Token:", decodedToken);
    console.log("Google ID Token:", response);
    onSuccess(jwtDecode(response.credential)); // Pass the credential to onSuccess callback
  };

  return (
    <div
      id="google-signin-btn"
      className={
        isCaptchaValid ? "google-signin-btn" : "disabled-google-signin-btn"
      }
    ></div>
  );
};
