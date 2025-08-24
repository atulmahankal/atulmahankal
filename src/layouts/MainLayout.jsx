import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

import './MainLayout.css'
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Get the current year using JavaScript's Date object
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar toggleSidebar={ toggleSidebar } />
      <Sidebar isSidebarOpen={ isSidebarOpen } />

      <main className="sm:ml-64 mt-14 overflow-auto h-[calc(100vh-3.5rem)] bg-gray-50 dark:bg-gray-800">
        <div className='min-h-full'>
          <div className='p-6 m-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700'>
            <Outlet />{ children }
          </div>
        </div>
        <footer className='p-4 text-center my-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mx-4 rounded-b-xl'>
          <p>&copy; {currentYear} Atul Mahankal. All rights reserved.</p>
        </footer>
      </main >
    </>
  );
};

export default MainLayout;