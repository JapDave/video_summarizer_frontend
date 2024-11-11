import React, { useEffect, useState } from "react";
import "./CustomLoader.scss";

const CustomLoader = ({
  message = "Loading...",
  size = "large",
  color = "blue",
}) => {
  return (
    <div
      className={`custom-loader custom-loader--${size}`}
      style={{ borderColor: color }}
    >
      <div className="custom-loader__spinner"></div>
      {/* <p className="custom-loader__message">{message}</p> */}
    </div>
  );
};

export default CustomLoader;
