
import React from 'react';
import DashNav from '../components/DashNav';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <DashNav/>
      <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
       
        <div className="p-6 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
    </main>
  );
};

export default DashboardLayout;
