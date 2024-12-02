// src/api/auth.js
import axiosInstance from './axios';
import axios from './axios';
import { API_BASE_URL } from '../utils/ENVImport';

export const login = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/login`,
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
      `${API_BASE_URL}/api/v1/users/signup`,
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
      `${API_BASE_URL}/api/v1/summarize-video/yt-video`,
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
      `${API_BASE_URL}/api/v1/users/get-user-by-id/${id}`,
      { is_blocked: is_blocked }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const upLoadedVideo = async (data) => {
  try {
    // Make the API request
    const accesstoken = localStorage.getItem('accessToken');
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/summarize-video/video`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file uploads
          token: `${accesstoken}`,
        },
      }
    );

    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

export const uploadProfile = async (data, firstName, lastName) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const url = `${API_BASE_URL}/api/v1/users/update-profile?first_name=${encodeURIComponent(
      firstName
    )}&last_name=${encodeURIComponent(lastName)}`;

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: `${accessToken}`,
      },
    });

    console.log('Profile image uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

export const deleteVideo = async (id) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token is missing. Please log in again.');
    }

    // Make the API request
    const response = await axios.delete(
      `${API_BASE_URL}/api/v1/summarize-video/delete-video/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          token: accessToken,
        },
      }
    );

    console.log('Video deleted successfully:', response.data);

    // Return the response to the caller
    return response;
  } catch (error) {
    console.error(
      'Error in deleting video:',
      error.response?.data || error.message
    );
    // Throw error to be handled by the caller
    throw error;
  }
};

export const deleteVideoFromAdmin = async (id, is_deleted) => {
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/api/v1/users/video/${id}`,
      { is_deleted: is_deleted }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addPlan = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/users/create-plan`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editPlan = async (data, id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/users/update-plan/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
