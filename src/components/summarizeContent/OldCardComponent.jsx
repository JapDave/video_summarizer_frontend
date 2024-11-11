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
    <div className="card">
      <img src={mp4Icon} alt="MP4 icon" className="card-icon" />
      <h3>{truncateTitle(title, 20)}</h3>
      {summarizedStatus ? (
        <button className="download-btn" onClick={handleDownload}>
          Download
        </button>
      ) : (
        <button className="process-btn" onClick={handleDownload}>
          Under process
        </button>
      )}
    </div>
  );
};

export default CardComponent;