import React from "react";
import DashNav from "../components/DashNav";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <DashNav />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="ml-[21%]">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
