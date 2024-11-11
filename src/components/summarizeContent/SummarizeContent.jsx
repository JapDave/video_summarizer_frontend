import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import "./SummarizeContant.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import CardComponent from "./CardComponent";
import { authAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import VideosJson from "./VideosJson.json";

const SummarizeContent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const videoSummarizedAPICAll = async () => {
    try {
      setIsLoading(true); // Show loader at the start of each API call
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/summarize-video/summarized-videos",
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
    } finally {
      setTimeout(() => setIsLoading(false), 5000);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      videoSummarizedAPICAll();
    }
  }, []);

  const trimFileName = (filePath) => {
    return filePath ? filePath.split("/").pop() : "Unknown File";
  };

  const constructDownloadUrl = (outputPath) => {
    if (!outputPath) return "#";
    const trimmedPath = outputPath.replace("./", "");
    return `http://127.0.0.1:8000/${trimmedPath}`;
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
          <div className="cards-wrapper">
            {currentVideos.map((card, index) => (
              <CardComponent
                key={index}
                title={trimFileName(card.video_name)}
                videoUrl={constructDownloadUrl(card.output_video)}
                summarizedStatus={card.is_summarized}
                created_at={card.created_at}
                display_name={card.display_name}
                video_size={card?.video_output_size || "-"}
                video_length={card?.video_output_length || "-"}

              />
            ))}
          </div>
          <Pagination
            className="pagination mt-2"
            current={currentPage}
            pageSize={pageSize}
            total={videos.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
        <div className="footer-div">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SummarizeContent;
