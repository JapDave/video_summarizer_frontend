import React, { useEffect, useState, useRef } from "react";
import { Pagination, Empty } from "antd";
import "./SummarizeContant.scss";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import CardComponent from "./CardComponent";
import { authAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import VideosJson from "./VideosJson.json";
import { API_BASE_URL } from "../../utils/ENVImport";
import ToastContainer from "../customToaster/ToastContainer";
import axios from "axios";
import { deleteVideo } from "../../api/auth";

const SummarizeContent = () => {
  const toastRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
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
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const deleteVideoHandler = async (id) => {
    setIsDeleting(true);
    try {
      const response = await deleteVideo(id);
      if (response.status === 200) {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== id)
        );
        toastRef.current.addToast("Video deleted successfully.", 3000);
      } else {
        toastRef.current.addToast("Failed to delete video.");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toastRef.current.addToast("An error occurred while deleting the video.");
    } finally {
      setIsDeleting(false);
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

  const convertDateFormat = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const calculateNextDay = (createdOnDate) => {
    if (!createdOnDate) {
      return "Invalid Date";
    }

    const createdDate = new Date(createdOnDate);
    if (isNaN(createdDate)) {
      return "Invalid Date";
    }
    createdDate.setDate(createdDate.getDate() + 1);

    return convertDateFormat(createdDate);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentVideos = videos.slice(startIndex, startIndex + pageSize);

  return (
    <React.Fragment>
      <div className="page-container">
        <Navbar />
        <div className="video-card-container">
          <ToastContainer ref={toastRef} />
          {currentVideos.length === 0 && (
            <Empty description="Videos not found" />
          )}
          <div className="cards-wrapper">
            {currentVideos.map((card, index) => {
              const createdDate = new Date(card.created_on);
              const expiryDate = calculateNextDay(card.created_on);
              return (
                <CardComponent
                  key={index}
                  id={card.id}
                  title={trimFileName(card.display_name)}
                  videoUrl={constructDownloadUrl(card.output_video)}
                  summarizedStatus={card.is_summarized}
                  expireDate={expiryDate}
                  size={card.video_input_size}
                  duration={card.video_input_length}
                  createdDate={convertDateFormat(createdDate)}
                  onDelete={() => deleteVideoHandler(card.id)}
                />
              );
            })}
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
