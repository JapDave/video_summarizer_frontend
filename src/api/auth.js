// src/api/auth.js
import axiosInstance from "./axios";
import axios from "./axios"; // Import the Axios instance

export const login = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/login",
      data
    ); // Call your login API endpoint
    return response.data;
  } catch (error) {
    throw error; // Handle this in your component or globally
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/signup",
      data
    ); // Call your signup API endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const videoSumarize = async () => {
  // try {
  //   const response = await axios.get(
  //     "/api/v1/summarize-video/summarized-videos"
  //   ); // Call logout endpoint
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }
};

export const YTVideo = async (data) => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:8000/api/v1/summarize-video/yt-video",
      data,
      { timeout: 60000 }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserStatus = async (id, is_blocked) => {
  try {
    const response = await axiosInstance.put(
      `http://127.0.0.1:8000/api/v1/users/${id}`,
      { is_blocked: is_blocked }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const upLoadedVideo = async (data) => {
  // try {
  //   const response = await axiosInstance.post(
  //     "/api/v1/summarize/video/video",
  //     data
  //   );
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }

  try {
    // Make the API request
    const accesstoken = localStorage.getItem("accessToken");
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/summarize-video/video",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Necessary for file uploads
          token: `${accesstoken}`,
        },
      }
    );

    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
