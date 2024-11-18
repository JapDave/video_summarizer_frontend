import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { UserLogo } from "../../assets/images/Images";
import { uploadProfile } from "../../api/auth";
import "./ProfileSection.scss";
import ToastContainer from "../customToaster/ToastContainer";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/ENVImport";

const ProfileSection = () => {
  const toastRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.admin);
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getLoggedInUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserData(data));

        setImagePreview(
          data.image ? constructDownloadUrl(data.image) : UserLogo
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageToUpload =
      profileImage ||
      (await fetch(UserLogo)
        .then((res) => res.blob())
        .then(
          (blob) => new File([blob], "defaultProfile.jpg", { type: blob.type })
        ));

    setLoading(true);
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("image", imageToUpload);

    try {
      const result = await uploadProfile(
        formDataToSubmit,
        formData.first_name,
        formData.last_name
      );
      toastRef.current.addToast("Profile updated successfully!", 3000);

      const uploadedImageUrl = URL.createObjectURL(profileImage);
      setImagePreview(uploadedImageUrl);
      navigate("/");

      // await getLoggedInUser();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setProfileImage(null);
    }
  };

  const constructDownloadUrl = (outputPath) => {
    if (!outputPath) return "#";
    const trimmedPath = outputPath.replace("./", "");
    const timestamp = new Date().getTime();
    return `${API_BASE_URL}/${trimmedPath}`;
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData.email || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
      });
      setImagePreview(
        userData.image ? constructDownloadUrl(userData.image) : UserLogo
      );
    }
  }, [userData]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getLoggedInUser();
    }
  }, [token, navigate]);

  return (
    <div className="profile-form-container">
      <ToastContainer ref={toastRef} />
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <div className="image-upload-wrapper">
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <img
              src={imagePreview || UserLogo}
              alt="Profile Preview"
              className="image-preview"
            />
            <div
              className="camera-icon"
              onClick={() => document.getElementById("profileImage").click()}
            >
              <FaCamera />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="profile@solidpoint.ai"
            value={formData.email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="Enter First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Enter Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSection;
