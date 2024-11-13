import React, { useEffect, useState } from "react";
import { Pagination, Empty } from "antd";
import "./SummarizeContant.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import CardComponent from "./CardComponent";
import { authAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import VideosJson from "./VideosJson.json";
import { API_BASE_URL } from "../../utils/ENVImport";

const SummarizeContent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const videoSummarizedAPICAll = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/summarize-video/summarized-videos`,
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
      setVideos(data); // Set videos data from API response
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    videoSummarizedAPICAll();

    const interval = setInterval(() => {
      videoSummarizedAPICAll();
    }, 30000);

    return () => clearInterval(interval);
  }, [token, navigate]);

  const trimFileName = (filePath) => {
    return filePath ? filePath.split("/").pop() : "Unknown File";
  };

  const constructDownloadUrl = (outputPath) => {
    if (!outputPath) return "#";
    const trimmedPath = outputPath.replace("./", "");
    return `${API_BASE_URL}/${trimmedPath}`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentVideos = videos.slice(startIndex, startIndex + pageSize);

  return (
    <React.Fragment>
      <div className="page-container">
        <Navbar />
        <div className="video-card-container">
          {currentVideos && currentVideos === 0 && (
            <Empty description="Videos not found" />
          )}
          <div className="cards-wrapper">
            {currentVideos.map((card, index) => (
              <CardComponent
                key={index}
                title={trimFileName(card.video_name)}
                videoUrl={constructDownloadUrl(card.output_video)}
                summarizedStatus={card.is_summarized}
                expireDate="12/10/2024"
                size="50"
                duration="11"
                createdDate="11/10/2024"
              />
            ))}
          </div>
          {currentVideos > 0 && (
            <Pagination
              className="pagination mt-2"
              current={currentPage}
              pageSize={pageSize}
              total={videos.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          )}
        </div>
        <div className="footer-div">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SummarizeContent;
