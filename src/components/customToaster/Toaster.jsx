// Toaster.jsx
import React, { useEffect, useState } from "react";
import "./Toaster.scss"; // Import your styles here

const Toaster = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className="toaster">{message}</div>;
};

export default Toaster;
