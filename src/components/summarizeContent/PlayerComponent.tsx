import React, { useState } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaExpandAlt,
  FaCompressAlt,
} from "react-icons/fa";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import "./PlayerComponent.scss";
import { useLocation } from "react-router-dom";

const PlayerComponent = () => {
  const location = useLocation();
  const { videoUrl, title } = location.state || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerRef = React.useRef<ReactPlayer>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    playerRef.current?.seekTo(newTime);
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return <FaVolumeMute />;
    }
    return volume < 0.5 ? <FaVolumeDown /> : <FaVolumeUp />;
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current?.requestFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <React.Fragment>
      <div className="page-container">
        <Navbar />
        <div className="player-container relative" ref={containerRef}>
          <button
            onClick={toggleFullscreen}
            className="fullscreen-btn bg-[#f4f4f4] absolute top-10 right-10 z-10 p-2"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <FaCompressAlt size={30} />
            ) : (
              <FaExpandAlt size={30} />
            )}
          </button>
          <div className="video-player">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              playing={isPlaying}
              volume={volume}
              width="100%"
              height="600px"
              controls={false}
              onProgress={handleProgress}
              onDuration={(duration) => setDuration(duration)}
            />
            <div className="video-controls">
              <div className="flex justify-between w-full items-center">
                <button
                  onClick={handlePlayPause}
                  className="play-pause-btn"
                  aria-label="Play/Pause"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <div className="volume-container">
                  <button className="volume-btn" aria-label="Volume">
                    {getVolumeIcon()}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-control ml-4"
                    aria-label="Volume Control"
                  />
                </div>
              </div>
              {/* Video Progress Bar */}
              <div className="progress-container">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="progress-bar"
                  aria-label="Video Progress"
                />
                <span className="progress-time">
                  {new Date(currentTime * 1000).toISOString().substr(14, 5)} /{" "}
                  {new Date(duration * 1000).toISOString().substr(14, 5)}
                </span>
              </div>
            </div>
          </div>
          <button
            className={`mt-4 w-full py-2 rounded-md font-semibold text-white shadow-lg transition bg-blue-500 hover:bg-blue-600`}
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
        <div className="footer-div mt-auto">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlayerComponent;
