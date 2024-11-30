import React, { useEffect, useState } from 'react';
import VideoPlayListTable from '../../components/admin/VideoList';
import { setVideosList } from '../../redux/slices/adminSlice';
import { API_BASE_URL } from '../../utils/ENVImport';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/customLoader/Loader';

const VideoPlayList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const videosList = useSelector((state) => state.admin.videosList);
  const [loading, setLoading] = useState(false);

  const getVideosHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/get-videos`, {
        method: 'GET',
        headers: {
          Token: `${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const data = await response.json();
      dispatch(setVideosList(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      getVideosHandler();
    }
  }, [token, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen w-full p-2 overflow-hidden">
      <div className="w-full rounded-md">
        <VideoPlayListTable
          getStripePlansHandler={() => {}}
          data={videosList}
        />
      </div>
    </div>
  );
};

export default VideoPlayList;
