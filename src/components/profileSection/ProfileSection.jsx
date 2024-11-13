import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { UserLogo } from "../../assets/images/Images";
import "./ProfileSection.scss";

const ProfileSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("first_name", formData.first_name);
    dataToSubmit.append("last_name", formData.last_name);
    dataToSubmit.append("message", formData.message);

    if (profileImage) {
      dataToSubmit.append("profileImage", profileImage);
    }

    // Example: You would submit dataToSubmit using an API call here
    // fetch('/api/profile', {
    //   method: 'POST',
    //   body: dataToSubmit,
    // })
    console.log("Form Data Submitted:", dataToSubmit);
  };

  return (
    <div className="profile-form-container">
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
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="image-preview"
              />
            ) : (
              <img
                src={UserLogo}
                alt="Profile Preview"
                className="image-preview"
              />
            )}
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
            onChange={handleChange}
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
            required
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
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileSection;
