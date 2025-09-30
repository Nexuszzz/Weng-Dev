import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  BarChart3, 
  UserSearch, 
  FileText, 
  Settings, 
  LogOut,
  HandCoins,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { initializeCompanyData } from '@/lib/company/data';
import { Badge } from '@/components/ui/badge';

const CompanyLayout: React.FC = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Initialize company data on mount
  useEffect(() => {
    initializeCompanyData();
  }, []);

  // Redirect non-company users
  useEffect(() => {
    if (user && user.role !== 'company') {
      navigate('/dashboard');
    } else if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const navigation = [
    { name: 'Overview', href: '/company', icon: BarChart3, exact: true },
    { name: 'Lowongan Kerja', href: '/company/jobs', icon: Briefcase },
    { name: 'Pelamar', href: '/company/applicants', icon: Users },
    { name: 'Pencarian Talenta', href: '/company/talent', icon: UserSearch },
    { name: 'Template Evaluasi', href: '/company/evaluation-templates', icon: FileText },
    { name: 'Tim', href: '/company/team', icon: Users },
    { name: 'Kontrak', href: '/company/contracts', icon: HandCoins },
    { name: 'Aktivitas', href: '/company/activity', icon: Activity }
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'company') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Memuat dashboard perusahaan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm">Company Portal</h1>
              <p className="text-xs text-gray-600 truncate max-w-[120px]">{user.name}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link
            to="/company/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <Settings className="w-5 h-5 text-gray-400" />
            Pengaturan
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Keluar
          </button>
          
          {/* Demo badge */}
          <div className="pt-2">
            <Badge variant="secondary" className="w-full justify-center text-xs">
              Demo Mode
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => isActive(item.href, item.exact))?.name || 'Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${user.avatarColor || 'bg-blue-500'} flex items-center justify-center`}>
                <span className="text-sm font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.headline}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;