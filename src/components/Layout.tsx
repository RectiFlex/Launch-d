import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import WalletApproval from './WalletApproval';
import ProjectContext from './ProjectContext';

const Layout = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <WalletApproval />
      <ProjectContext />
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;