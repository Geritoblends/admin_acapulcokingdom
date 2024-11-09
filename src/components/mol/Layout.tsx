import React, { ReactNode } from 'react';
import { BottomNavbar, LeftNavbar } from './Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
  current: 'home' | 'reservations' | 'calendars' | 'properties' | 'config';
}

export const Layout: React.FC<LayoutProps> = ({ children, current }) => {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col md:flex-row">
      {/* LeftNavbar for desktop screens */}
      <div className="hidden md:block md:w-[150px]">
        <LeftNavbar current={current} />
      </div>

      {/* Main content area */}
      <div className="flex-1 w-full h-full overflow-y-auto px-7 pt-7 md:pt-0">
        {children}
      </div>

      {/* BottomNavbar for mobile screens */}
      <div className="block md:hidden">
        <BottomNavbar current={current} />
      </div>
    </div>
  );
};
