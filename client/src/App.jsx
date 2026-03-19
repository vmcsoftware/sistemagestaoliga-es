import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { ContatosPage } from './pages/ContatosPage';
import { RelatoriosPage } from './pages/RelatoriosPage';

// Rota protegida - redireciona para login se não autenticado
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

// Rota raiz - redireciona para dashboard se autenticado, login se não
const RootRoute = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rota raiz redireciona baseada no autenticação */}
          <Route path="/" element={<RootRoute />} />
          
          {/* Página de login - acessível para não autenticados */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas protegidas - requerem autenticação */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contatos"
            element={
              <ProtectedRoute>
                <ContatosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <RelatoriosPage />
              </ProtectedRoute>
            }
          />
          
          {/* Rota 404 - redireciona para raiz */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
