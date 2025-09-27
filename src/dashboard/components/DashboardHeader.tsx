import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, Settings, User, LogOut, Sun, Moon } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const DashboardHeader: React.FC = () => {
  const { user, logout, mockLogin, settings, updateSettings } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const handler = (e: MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const avatar = (
    <button
      onClick={()=> setOpen(o=>!o)}
      className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white text-sm shadow ${user?.avatarColor||'bg-gray-400'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
      aria-haspopup="true"
      aria-expanded={open}
    >
      {user ? user.name.charAt(0) : <User size={16} />}
    </button>
  );

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 relative z-40">
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
            <NavLink to="/dashboard/portfolio" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Portofolio</NavLink>
            <NavLink to="/dashboard/skill-snapshot" className={({isActive})=>`px-3 py-2 rounded-lg font-medium ${isActive? 'bg-gray-100 text-gray-900':'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Ringkasan Skill</NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-2" ref={dropdownRef}>
          <button
            onClick={()=> updateSettings({darkMode: !settings.darkMode})}
            className={`p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100`}
            aria-label="Toggle dark mode"
          >
            {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <NavLink to="/dashboard/settings" className={({isActive})=>`p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${isActive? 'bg-gray-100 text-gray-900':''}`}>
            <Settings size={18} />
          </NavLink>
          <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
          {avatar}
          {open && (
            <div className="absolute top-14 right-6 w-60 bg-white border border-gray-200 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in" role="menu">
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    {user.headline && <p className="text-xs text-gray-500 line-clamp-1">{user.headline}</p>}
                  </div>
                  <button onClick={()=>{navigate('/dashboard/profile'); setOpen(false);}} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                    Profil
                  </button>
                  <button onClick={()=>{navigate('/dashboard/settings'); setOpen(false);}} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                    Pengaturan
                  </button>
                  <div className="my-1 border-t border-gray-100" />
                  <button onClick={()=>{logout(); setOpen(false); navigate('/');}} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                    <LogOut size={14} /> <span>Keluar</span>
                  </button>
                </>
              ) : (
                <div className="px-4 py-2">
                  <p className="text-sm text-gray-600 mb-3">Anda belum login.</p>
                  <button onClick={()=>{mockLogin(); setOpen(false);}} className="w-full px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Login Demo</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;