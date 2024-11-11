import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsAdmin } from "../../redux/slices/adminSlice";
import "./SearchSection.scss";
import {
  clipboardIcon,
  downloadIcon,
  thunderIcon,
} from "../../assets/images/Images";
import { authAPI } from "../../api";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../customLoader/CustomLoader";
import ToastContainer from "../customToaster/ToastContainer";

const SearchSection = () => {
  const toastRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loader, setLoader] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const isAdmin = useSelector((state) => state.admin.isAdmin); // Access the isAdmin state
  const dispatch = useDispatch();

  const checkTokenAndNavigate = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleFileChange = async () => {
    if (!checkTokenAndNavigate()) return;

    if (file) {
      setLoader(true);
      const formData = new FormData();
      formData.append("video", file); // 'file' is the key expected by backend

      try {
        const response = await authAPI.upLoadedVideo(formData);
        toastRef.current.addToast("Video upoaded successfully!", 3000);
        navigate("/video-summarize");
        console.log("reee", response);
        // toast.success(response.detail);
      } catch (error) {
        console.log("handle post upload", error);
        toastRef.current.addToast(error.response?.data?.detail, 3000);
        const errorMessage = error.response?.data?.detail || "Upload failed!";
        // toast.error(errorMessage);
      } finally {
        setLoader(false);
        setFile(null);
        setFileName("");
      }
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set file name
    } else {
      setFile(null);
      setFileName("");
    }
  };

  const handleUploadFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handlePostLink = async () => {
    // if (!videoURL.trim()) {
    //   toast.warn("Please enter a YouTube video URL.");
    //   return;
    // }

    if (videoURL !== "") {
      if (!checkTokenAndNavigate()) return;

      const urlReqData = {
        url: videoURL,
      };
      try {
        setLoader(true);
        const response = await authAPI.YTVideo(urlReqData);
        toastRef.current.addToast("Video upoaded successfully!", 3000);
        navigate("/video-summarize");
        setVideoURL("");
        // toast.success("Video URL posted successfully!");
      } catch (error) {
        console.log("error-post-link", error);
        toastRef.current.addToast(error.response?.data?.detail, 3000);
        const errorMessage =
          error.response?.data?.detail || "Failed to post URL!";
        setFile(null); // Clear file state in case of an error
        setFileName(""); // Clear fileName state in case of an error
        setVideoURL("");
        // toast.error(errorMessage);
      } finally {
        setLoader(false);
      }
    } else {
      handleFileChange();
    }
  };

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      {loader && <CustomLoader />}
      <ToastContainer ref={toastRef} />
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">Activ Summarizer</h1>
          <p className="header__subtitle">
            Our free online Video Summarizer automatically generates concise
            summaries of any video.
          </p>
          <div className="header__input-section">
            <input
              type="text"
              className="header__input"
              placeholder="Paste YouTube Video URL here"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <button className="header__button" onClick={handlePostLink}>
              Summarize
            </button>
          </div>
          <p className="header__or">Or</p>
          <div
            className={`header__file-upload-container ${
              dragging ? "dragging" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              key={file ? file.name : "file-input"}
              type="file"
              id="file-input"
              accept="video/mp4"
              onChange={handleUploadFile}
            />
            <label htmlFor="file-input" className="header__custom-file-upload">
              {fileName ? (
                <h3 className="header__file-name">{`Selected File: ${fileName}`}</h3>
              ) : (
                <span>Drag & Drop or Upload</span>
              )}
            </label>
          </div>
        </div>
      </header>

      <section className="upload-detail">
        <div className="upload-detail__card">
          <img
            src={clipboardIcon}
            alt="Clipboard Icon"
            className="upload-detail__icon"
          />
          <p>1. Paste the YouTube video link into our platform.</p>
        </div>
        <div className="upload-detail__card">
          <img
            src={thunderIcon}
            alt="Thunder Icon"
            className="upload-detail__icon"
          />
          <p>2. Sit back and watch AI work its magic.</p>
        </div>
        <div className="upload-detail__card">
          <img
            src={downloadIcon}
            alt="Download Icon"
            className="upload-detail__icon"
          />
          <p>3. Your instant video summary will appear.</p>
        </div>
      </section>

      <section className="video-summarized">
        <div className="video-summarized__content">
          <h2>
            <span>+ 100 Million Minutes</span> of Videos Summarized
          </h2>
          <p>
            Harnessing the power of AI, we've summarized millions of videos,
            unlocking unparalleled insights and empowering individuals with
            knowledge like never before.
          </p>
        </div>
      </section>

      <section className="what-you-get">
        <h2>Here's what you get:</h2>
        <div className="what-you-get__cards">
          <div className="what-you-get__card">
            <h3>Automatic Summaries</h3>
            <p>AI analyzes the video content and extracts the key points.</p>
          </div>
          <div className="what-you-get__card">
            <h3>Clear and Concise</h3>
            <p>
              Summaries are easy to understand and capture the essence of the
              video.
            </p>
          </div>
          <div className="what-you-get__card">
            <h3>Improved Reading Efficiency</h3>
            <p>Quickly grasp the main ideas and remember more.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Here's what you get:</h2>
        <div className="features__cards">
          <div className="features__card">
            <h4>Saves You Valuable Time</h4>
            <p>Eliminates the need to watch hours of videos.</p>
          </div>
          <div className="features__card">
            <h4>Improves Your Learning Efficiency</h4>
            <p>Provides a concise overview of complex topics.</p>
          </div>
          <div className="features__card">
            <h4>Better Understanding of Trending Discussions</h4>
            <p>Focuses on the most relevant parts of the video.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchSection;
