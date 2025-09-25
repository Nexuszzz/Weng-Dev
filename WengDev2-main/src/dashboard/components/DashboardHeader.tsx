import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">SimHire</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <NavLink to="/dashboard" end className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Beranda</NavLink>
            <NavLink to="/dashboard/job-finder" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Pencari Pekerjaan</NavLink>
            <NavLink to="/dashboard/job-simulation" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Simulasi Kerja</NavLink>
            
            <NavLink to="/dashboard/apprenticeship-tracker" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Pelacak Magang</NavLink>
            <NavLink to="/dashboard/auto-cv" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>CV Otomatis</NavLink>
            <NavLink to="/dashboard/escrow-contract" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Kontrak Escrow</NavLink>
            <NavLink to="/dashboard/impact-dashboard" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Dasbor Dampak</NavLink>
            <NavLink to="/dashboard/portfolio" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Portofolio</NavLink>
            <NavLink to="/dashboard/skill-snapshot" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Ringkasan Skill</NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-900"><Settings size={20} /></button>
          <button className="p-2 text-gray-600 hover:text-gray-900"><Bell size={20} /></button>
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;