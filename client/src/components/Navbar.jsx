import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Home,
} from 'lucide-react';

export const Navbar = ({ variant = 'default' }) => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navbar para página Home
  if (variant === 'home') {
    return (
      <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-slate-900/50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center font-bold text-lg">
              📞
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gestão de Ligações
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {token && user ? (
              <>
                <span className="text-sm text-slate-400">
                  Bem-vindo, <strong>{user.nome}</strong>
                </span>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold"
                >
                  Começar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4">
            <div className="space-y-4">
              {token && user ? (
                <>
                  <div className="text-sm text-slate-400">
                    Bem-vindo, <strong>{user.nome}</strong>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-center border border-slate-600 rounded-lg hover:bg-slate-700 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Começar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Navbar para Dashboard/Aplicação
  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-slate-900/95 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center font-bold text-lg">
            📞
          </div>
          <span className="hidden sm:inline text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Gestão de Ligações
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/contatos"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Users size={20} />
            <span>Contatos</span>
          </Link>
          <Link
            to="/relatorios"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <FileText size={20} />
            <span>Relatórios</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.nome}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.funcao}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all text-red-400 hover:text-red-300"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4">
          <div className="space-y-3 mb-4">
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link
              to="/contatos"
              className="block px-4 py-2 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <Users size={20} />
              Contatos
            </Link>
            <Link
              to="/relatorios"
              className="block px-4 py-2 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FileText size={20} />
              Relatórios
            </Link>
          </div>
          <div className="border-t border-slate-700 pt-4 space-y-3">
            <div className="px-4 py-2">
              <p className="text-sm font-semibold">{user?.nome}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.funcao}</p>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
