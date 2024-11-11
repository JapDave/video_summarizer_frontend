import React from "react";
import "./SummarizeContant.scss";
import mp4Icon from "../../assets/images/mp4-icon.jpg";
import { truncateTitle } from "../../utils/TruncateString";

const CardComponent = ({ title, videoUrl, summarizedStatus }) => {
  const handleDownload = async () => {
    if (!videoUrl || videoUrl === "#") {
      alert("Download link not available.");
      return;
    }

    try {
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the video.");
    }
  };

  return (
    <div className="relative w-72 h-80 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-between p-4 transform transition-transform duration-300 hover:scale-105">
      <div className="flex w-full justify-between items-center mb-4">
        <span className="text-xs text-gray-500 font-medium">11/10/2024</span>
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow">
          11:00 Min
        </span>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={mp4Icon}
          alt="MP4 icon"
          className="w-24 h-24 mb-4 mix-blend-multiply object-cover"
        />
        <h3 className="text-md font-semibold text-gray-800 text-center">
          {truncateTitle(title, 20)}
        </h3>
      </div>
      <button
        className={`mt-4 w-full py-2 rounded-md font-semibold text-white shadow-lg transition ${
          summarizedStatus
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
        }`}
        onClick={handleDownload}
        disabled={!summarizedStatus}
      >
        {summarizedStatus ? "Download" : "Processing"}
      </button>
    </div>
  );
};

export default CardComponent;
