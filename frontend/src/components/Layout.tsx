import React, { useState } from 'react';
import { Navbar, Sidebar } from './index';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar onMenuToggle={() => setOpen((s) => !s)} />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
