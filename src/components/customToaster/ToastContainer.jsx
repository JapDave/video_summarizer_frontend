// ToastContainer.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import Toaster from "./Toaster";

const ToastContainer = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([
    // { id: 1, message: "message", duration: 5000000 },
  ]);

  const addToast = (message, duration) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now(), message, duration },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Expose addToast to be triggered from outside
  useImperativeHandle(ref, () => ({
    addToast,
  }));

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toaster
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
});

export default ToastContainer;
