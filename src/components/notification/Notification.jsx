import React, { useEffect, useState } from "react";
import { onMessageListner, requestPermission } from "./FirebaseNotification";
import { ToastContainer } from "react-toastify";

const Notification = () => {
  const [notificationMsg, setNotificationMsg] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    // Request permission for notifications
    requestPermission();

    // Set up the listener for Firebase notifications
    const unsubscribe = onMessageListner((payload) => {
      // Update state with the notification data
      setNotificationMsg({
        title: payload.notification.title,
        body: payload.notification.body,
      });

      toast.success(
        `${payload.notification.title}:${payload.notification.body}`
      );
    });
  }, []);

  return (
    <React.Fragment>
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
      />
      {notificationMsg.body} */}
    </React.Fragment>
  );
};

export default Notification;
