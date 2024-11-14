import React from "react";
import "./SummarizeContant.scss";
import mp4Icon from "../../assets/images/mp4-icon.jpg";
import { truncateTitle } from "../../utils/TruncateString";
import { useNavigate } from "react-router-dom";

const CardComponent = ({
  title,
  videoUrl,
  summarizedStatus,
  expireDate,
  size,
  duration,
  createdDate,
}) => {
  const navigate = useNavigate();

  const handleNavigateToPlayer = () => {
    if (!summarizedStatus) {
      alert("Video not summarized yet.");
      return;
    }

    navigate("/video-summarize-player", {
      state: { videoUrl, title },
    });
  };

  return (
    <div className="relative w-72 h-84 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col p-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Header: Video Duration and Size */}
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {duration} Min
        </span>
        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {size} MB
        </span>
      </div>
      {/* Video Title and Icon */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={mp4Icon}
          alt="MP4 icon"
          className="w-16 h-16 mb-4 object-cover rounded-full border border-gray-200 shadow-md"
        />
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
          {truncateTitle(title, 20)}
        </h3>
      </div>


      {/* Dates: Created At and Expired At */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex justify-between items-start flex-col w-full mb-2">
          <p className="text-xs text-gray-900 font-medium">Created At</p>
          <span className="text-xs text-gray-600">{createdDate}</span>
        </div>
        <div className="flex justify-between items-end flex-col w-full">
          <p className="text-xs text-gray-900 font-medium">Expires On</p>
          <span className="text-xs text-gray-600">{expireDate}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-x-2">
        <button
          className={`w-full py-2 rounded-md font-semibold text-white shadow-lg transition ${
            summarizedStatus
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
          }`}
          onClick={handleNavigateToPlayer}
          disabled={!summarizedStatus}
        >
          {summarizedStatus ? "Play" : "Processing"}
        </button>

        {summarizedStatus && (
          <button
            className="w-full py-2 rounded-md font-semibold text-white shadow-lg transition bg-red-500 hover:bg-red-600"
            onClick={() => {}}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
