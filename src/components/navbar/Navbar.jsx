import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../../assets/images/Images";
import notificationJson from "./Notification.json";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin } from "../../redux/slices/adminSlice";

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

  const notificationsAPICall = async (isViewed = false) => {
    setIsLoading(true); // Show loader at the start of each API call
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/users/notifications?is_viewed=${isViewed}`,
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
        console.log(data.count, "COunt")
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
        `http://127.0.0.1:8000/api/v1/users/clear-notifications`,
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

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setIsLoading(true);
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

                    {/* Dropdown Menu */}
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
                                {notifications?.map((item) => {
                                  return <li>{item.message}</li>;
                                })}
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
                        <div
                          onClick={() => {
                            dispatch(setIsAdmin(true));
                            navigate("/admin/usage-analytics");
                          }}
                          className="profile-menu-item"
                        >
                          <img src={profileLogo} alt="" />
                          <span className="item-text">Admin</span>
                        </div>
                        {/* )} */}
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
