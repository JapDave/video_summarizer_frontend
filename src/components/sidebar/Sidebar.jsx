import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillPlusCircle, AiOutlineDoubleLeft } from "react-icons/ai";
import { MdDashboard, MdLogout, MdSubscriptions } from "react-icons/md";
import { FaListUl, FaRegUser } from "react-icons/fa";
import { setIsAdmin } from "../../redux/slices/adminSlice";
import { useState } from "react";

const Sidebar = () => {
  // *************************************************************
  // NOTE: Define Variables
  // *************************************************************
  const location = useLocation();
  const uri = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdminRoute = uri.startsWith("/admin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // *************************************************************
  // NOTE: Render Method
  // *************************************************************

  return (
    <div
      className={`transition-all bg-[#191919] relative z-50 rounded-md shadow-md duration-300 ease-in-out ${
        isSidebarOpen ? "w-[15%] smallPc:w-60" : "w-20"
      } flex flex-col`}
    >
      <div className="flex flex-1 flex-col">
        {/* Sidebar toggle button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className={`transition-all duration-300 ${
            !isSidebarOpen ? "rotate-180" : "rotate-0"
          } text-white-800 bg-[linear-gradient(152deg,_#1104F3,_#0EDEF9)] absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full p-2`}
        >
          <AiOutlineDoubleLeft color="white" />
        </button>

        <ul className="desktop:py-2 m-0 flex-1 px-2 py-5">
          {/* Usage Analytics */}
          <li
            className={`relative cursor-pointer ${
              isSidebarOpen ? "px-4" : "px-0 flex justify-center items-center"
            } py-2 flex items-center ${
              uri === "/admin/usage-analytics"
                ? "bg-[#051b8d] text-white rounded-md"
                : "text-[#051b8d]"
            }`}
          >
            <a
              href="/admin/usage-analytics"
              className={`desktop:py-[7px] smallPc:py-[4px] flex items-center justify-start gap-4 ${
                isSidebarOpen ? "gap-4" : "gap-0"
              } py-1 font-semibold`}
            >
              <MdDashboard
                size={15}
                color={uri === "/admin/usage-analytics" ? "#fff" : "#ccc"}
              />
              {isSidebarOpen && (
                <span
                  className={`text-sm ${
                    uri === "/admin/usage-analytics"
                      ? "text-white"
                      : "text-[#ccc]"
                  } whitespace-nowrap overflow-hidden text-ellipsis`}
                >
                  Dashboard
                </span>
              )}
            </a>
          </li>

          {/* User List */}
          <li
            className={`relative cursor-pointer ${
              isSidebarOpen ? "px-4" : "px-0 flex justify-center items-center"
            } py-2 flex items-center ${
              uri === "/admin/user-list"
                ? "bg-[#051b8d] text-white rounded-md"
                : "text-[#ccc]"
            }`}
          >
            <a
              href="/admin/user-list"
              className={`desktop:py-[7px] smallPc:py-[4px] flex items-center justify-start ${
                isSidebarOpen ? "gap-4" : "gap-0"
              } py-1 font-semibold`}
            >
              <FaRegUser
                size={15}
                color={uri === "/admin/user-list" ? "#fff" : "#ccc"}
              />
              {isSidebarOpen && (
                <span
                  className={`text-sm ${
                    uri === "/admin/user-list" ? "text-white" : "text-[#ccc]"
                  }`}
                >
                  User List
                </span>
              )}
            </a>
          </li>
        </ul>

        {/* Logout */}
        {/* <ul>
          <li
            className={`relative cursor-pointer ${
              isSidebarOpen ? "px-4" : "px-0 flex justify-center items-center"
            } py-2 flex items-center ${
              uri === "/dashboard" && "bg-[#051b8d] text-white"
            }`}
          >
            <div
              onClick={() => navigate(-1)}
              className={`desktop:py-[7px] smallPc:py-[4px] flex items-center justify-start ${
                isSidebarOpen ? "gap-4" : "gap-0"
              } py-1 rounded-md border-2 border-[#fff] text-[#fff] px-4 py-3 font-semibold`}
            >
              <MdLogout size={25} color={`#fff`} />
              {isSidebarOpen && (
                <span className="text-base text-white">Exit</span>
              )}
            </div>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
