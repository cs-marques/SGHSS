import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users,
  BedDouble,
  FileText,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import Logo from './Logo';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/admin' },
  { icon: Users, label: 'Cadastros', path: '/dashboard/admin/cadastros' },
  { icon: BedDouble, label: 'Internações', path: '/dashboard/admin/internacoes' },
  { icon: FileText, label: 'Relatórios', path: '/dashboard/admin/relatorios' },
];

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white lg:static transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } transition-transform duration-300 ease-in-out h-screen flex flex-col border-r border-gray-200`}>
        <div className="p-4">
          <Logo />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-gray-600 hover:text-sky-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                  <ChevronRight size={16} className={`flex-shrink-0 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="ml-3">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;