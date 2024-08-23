import React from 'react';
import SideNav from './_components/SideNav';
import { Briefcase, Calendar, Clock, Settings } from 'lucide-react';
import DashboardHeader from './_components/DashboardHeader';

const layout = ({ children }) => {
  return (
    <div>
      <div className="hidden md:block h-screen md:w-64 bg-slate-50 fixed">
        <SideNav />
      </div>

      <div className="md:ml-64 mt-4">
        <div className="block md:hidden">
          <DashboardHeader />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
