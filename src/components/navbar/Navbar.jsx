import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import "./Navbar.scss";
import {
  aggrementImg,
  bellImg,
  folderImg,
  logoutImg,
  newUser,
  profileLogo,
  settingImg,
  subscriptionImg,
  adminLogo,
} from "../../assets/images/Images";
import notificationJson from "./Notification.json";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setUserData } from "../../redux/slices/adminSlice";
import { API_BASE_URL } from "../../utils/ENVImport";
import { truncateTitle } from "../../utils/TruncateString";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationCount = 2;
  const [isOpen, setIsOpen] = useState({
    notificationFlag: false,
    profileFlag: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsResponse, setNotificationsResponse] = useState();
  const [notifications, setNotifications] = useState();
  const userData = useSelector((state) => state.admin.userData);
  let intervalId;
  console.log("🚀 ~ Navbar ~ userData:", userData);

  const getLoggedInUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: "GET",
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserData(data));
      } else if (response.status === 401) {
        console.warn("Unauthorized access. Redirecting to login.");
        localStorage.clear();
        location.reload();
      } else if (response.status === 404) {
        console.warn("User not found.");
      } else {
        console.warn("Failed to fetch user data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const notificationsAPICall = async (isViewed = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/notifications?is_viewed=${isViewed}`,
        {
          method: "GET",
          headers: {
            Token: `${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotificationsResponse(data?.count || 0);
        setNotifications(data?.notifications || []);
      } else {
        console.error("Failed to fetch notifications:", response.status);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 5000);
    }
  };

  const clearNotificationsAPICall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/clear-notifications`,
        {
          method: "GET",
          headers: {
            Token: `${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotificationsResponse(0);
        setNotifications([]);
      } else {
        console.error("Failed to clear notifications:", response.status);
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 5000);
    }
  };

  const handleNotificationToggle = () => {
    if (!isOpen.notificationFlag) {
      notificationsAPICall(true);
    }
    setIsOpen((prevState) => ({
      ...prevState,
      notificationFlag: !prevState.notificationFlag,
    }));
  };

  const handleProfileToggle = () => {
    setIsOpen((prevState) => ({
      ...prevState,
      profileFlag: !prevState.profileFlag,
    }));
  };

  const handleLogoutFunction = async () => {
    localStorage.clear();
    location.reload();
  };

  const convertDateFormat = (dateTimeString) => {
    const [datePart] = dateTimeString.split("T");
    return datePart;
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      setIsLoading(true);
      getLoggedInUser();
      notificationsAPICall();

      intervalId = setInterval(() => notificationsAPICall(), 5000);

      return () => clearInterval(intervalId);
    }
  }, [token, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        isOpen.notificationFlag
      ) {
        setIsOpen((prevState) => ({
          ...prevState,
          notificationFlag: false,
        }));
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        isOpen.profileFlag
      ) {
        setIsOpen((prevState) => ({
          ...prevState,
          profileFlag: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen.notificationFlag, isOpen.profileFlag]);
  return (
    <React.Fragment>
      <div className="summarizerr">
        {/* <div className="blueBanner">
          ✨ Better Summaries, Brighter Insights! The new SolidPoint AI is now
          available in Beta for more accurate summarization. ✨
        </div> */}
        <div className="summarizer">
          <nav className="navbar">
            <div className="nav-links">
              {<a href="/">Home</a>}
              {token ? (
                <a href="/video-summarize">Video Summarizer</a>
              ) : (
                <a href="/login">Video Summarizer</a>
              )}
              {/* <a href="#">arXiv Summarizer</a> */}
              <a href="/contactus">Contact Us</a>
              <span>|</span>
              {token ? (
                <>
                  <div
                    className="notification-dropdown"
                    onClick={handleNotificationToggle}
                    ref={notificationRef}
                  >
                    {/* Bell Icon and Dropdown Toggle */}
                    <div className="notification-icon">
                      <span role="img" aria-label="notification">
                        <img src={bellImg} />
                      </span>
                      <div className="notification-badge">
                        {notificationsResponse ?? 0}
                      </div>
                    </div>

                    {isOpen.notificationFlag && (
                      <div className="dropdown-menu">
                        <div className="dropdown-header">Notifications</div>
                        {isLoading ? (
                          <div className="dropdown-content">
                            <div className="loader-div">
                              <p>Loading...</p>
                            </div>
                          </div>
                        ) : notifications?.length > 0 ? (
                          <div className="dropdown-content">
                            <div className="notifications">
                              <ul>
                                {notifications.map((item, index) => (
                                  <li key={index}>
                                    <div className="notification-content">
                                      <div className="notification-message">
                                        <Tooltip title={item.message}>
                                          {item.message !== null
                                            ? truncateTitle(item.message, 35)
                                            : null}
                                        </Tooltip>
                                      </div>
                                      <div className="notification-details">
                                        <span className="date">
                                          {convertDateFormat(item.created_on)}
                                        </span>
                                        <span className="video-name">
                                          <Tooltip title={item.video_title}>
                                            {item.video_title !== null
                                              ? truncateTitle(
                                                  item.video_title,
                                                  10
                                                )
                                              : null}
                                          </Tooltip>
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {notifications?.length > 0 && (
                              <div
                                style={{
                                  color: "red",
                                  marginTop: "10px",
                                  marginBottom: "0px",
                                  width: "100%",
                                  textAlign: "end",
                                }}
                              >
                                <button
                                  className="clear-btn"
                                  onClick={clearNotificationsAPICall}
                                >
                                  Clear All
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="dropdown-content">
                            <div className="no-notifications">
                              <img src={folderImg} alt="No Notifications" />
                              <p>Notifications not found</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="profile-dropdown" ref={dropdownRef}>
                    <div className="profile-icon" onClick={handleProfileToggle}>
                      <img src={newUser} alt="Profile" />
                      <span className="profile-name">
                        {userData?.first_name}
                      </span>
                      <span
                        className={`arrow ${isOpen.profileFlag ? "open" : ""}`}
                      ></span>
                    </div>

                    {isOpen.profileFlag && (
                      <div className="dropdown-menu">
                        {/* <ul>
                          <li>
                            <span className="icon">&#128100;</span> Profile
                          </li>
                          <li>
                            <span className="icon">&#128221;</span> Project Info
                          </li>
                          <li>
                            <span className="icon">&#128196;</span> Agreements
                          </li>
                          <li>
                            <span className="icon">&#9881;</span> Settings
                          </li>
                          <li>
                            <span className="icon">&#128682;</span> Logout
                          </li>
                        </ul> */}
                        {/* {userData?.is_superuser && ( */}
                        {userData?.is_superuser && (
                          <div
                            onClick={() => {
                              dispatch(setIsAdmin(true));
                              navigate("/admin/usage-analytics");
                            }}
                            className="profile-menu-item"
                          >
                            <img src={adminLogo} alt="" />
                            <span className="item-text">Admin</span>
                          </div>
                        )}
                        {/* )} */}
                        <div
                          onClick={() => navigate("/profile")}
                          className="profile-menu-item"
                        >
                          <img src={profileLogo} alt="" />
                          <span className="item-text">Profile</span>
                        </div>
                        <div className="profile-menu-item">
                          <img src={subscriptionImg} alt="" />
                          <span className="item-text">Subscription</span>
                        </div>

                        <div
                          className="profile-menu-item"
                          style={{ marginBottom: "2px" }}
                        >
                          <img src={logoutImg} alt="" />
                          <span
                            className="item-text"
                            onClick={handleLogoutFunction}
                          >
                            Logout
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <a href="/signup">Sign Up</a>
                  <a href="/login">Login</a>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
