import React from 'react';
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">3 Submitted Questions</h3>
          <div className="mt-2 h-2 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">2 Verified Questions</h3>
          <div className="mt-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">1 Unverified Questions</h3>
          <div className="mt-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
