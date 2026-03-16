import React from 'react';
import { LogOut, Home, Users, BarChart3, Bell, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'bg-purple-600' : '';

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              📞 CRM Contatos
            </div>
            <div className="hidden md:flex space-x-1">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${isActive('/dashboard')} hover:bg-purple-600`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/contatos"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${isActive('/contatos')} hover:bg-purple-600`}
              >
                <Users size={20} />
                <span>Contatos</span>
              </Link>
              <Link
                to="/relatorios"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${isActive('/relatorios')} hover:bg-purple-600`}
              >
                <BarChart3 size={20} />
                <span>Relatórios</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <p className="text-sm">Olá, <span className="font-bold text-purple-400">{usuario?.nome}</span></p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
