import React from 'react'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-grow p-8 overflow-y-scroll">
      <Navbar/>
        {children}
      </div>
    </div>
  );
}

export default Layout