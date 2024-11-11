import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "../app.css";
import UserList from "../features/admin/UserList";
import Sidebar from "../components/sidebar/Sidebar";
import UsageAnalytics from "../features/admin/UsageAnalytics";

const AdminRoutes = () => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  console.log("AdminRoutes ~ isAdmin:", isAdmin);
  return (
    <div className="h-screen p-2">
      <div className="h-full flex gap-2 bg-[#FFF]">
        <Sidebar />
        <Routes>
          <Route path="usage-analytics" element={<UsageAnalytics />} />
          <Route path="user-list" element={<UserList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
