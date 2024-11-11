import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/ENVImport";

const UsageAnalytics = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [analyticsData, setAnalyticsData] = useState();

  const data = {
    total_users: 2,
    total_videos: 135,
    total_videos_summarized: 6,
    total_videos_processing: 129,
  };

  const getUsageAnalyticsHandler = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/get-analytics`,
        {
          method: "GET",
          headers: {
            Token: `${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getUsageAnalyticsHandler();
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-wrap justify-start items-start content-baseline w-full gap-6 p-6">
      <div className="bg-gray-100 w-80 h-36 p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform">
        <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
        <p className="text-3xl font-bold text-blue-500">
          {analyticsData?.total_users ?? "-"}
        </p>
      </div>
      <div className="bg-gray-100 w-80 h-36 p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform">
        <h3 className="text-lg font-semibold text-gray-700">Total Videos</h3>
        <p className="text-3xl font-bold text-blue-500">
          {analyticsData?.total_videos ?? "-"}
        </p>
      </div>
      <div className="bg-gray-100 w-80 h-36 p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform">
        <h3 className="text-lg font-semibold text-gray-700">
          Total Videos Summarized
        </h3>
        <p className="text-3xl font-bold text-blue-500">
          {analyticsData?.total_videos_summarized ?? "-"}
        </p>
      </div>
      <div className="bg-gray-100 w-80 h-36 p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform">
        <h3 className="text-lg font-semibold text-gray-700">
          Total Videos Processing
        </h3>
        <p className="text-3xl font-bold text-blue-500">
          {analyticsData?.total_videos_processing ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default UsageAnalytics;
