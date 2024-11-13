import React, { useEffect, useState } from "react";
import "./CustomLoader.scss";

const CustomLoader = ({
  message = "We are downloading the video and this will take few minutes before it is queued.",
  size = "large",
  color = "#051b8d",
}) => {
  return (
    <div
      className={`custom-loader custom-loader--${size}`}
      style={{ borderColor: color }}
    >
      <div className="custom-loader__spinner"></div>
      <p className="custom-loader__message">{message}</p>
    </div>
  );
};

export default CustomLoader;
