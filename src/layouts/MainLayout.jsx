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

      <main className="sm:ml-64 rounded-lg dark:border-gray-700 mt-14 overflow-auto h-[calc(100vh-3.5rem)]">
        <div className='border-y-2 border-gray-200 border-dashed'>
          <div className='p-2 m-2 rounded-lg supports-backdrop-blur:bg-slate-50/25 bg-slate-100/25'>
            <Outlet />{ children }
          </div>
        </div>
        <footer className='p-2 text-center my-2'>
          <p>Designed by Atul Mahankal.</p>
        </footer>
      </main >
    </>
  );
};

export default MainLayout;
