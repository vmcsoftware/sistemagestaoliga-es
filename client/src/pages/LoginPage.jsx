import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  const { login, token, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Se já está autenticado, redireciona para dashboard
  if (token && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (email, senha) => {
    setIsSubmitting(true);
    const resultado = await login(email, senha);
    setIsSubmitting(false);
    
    if (resultado.sucesso) {
      navigate('/dashboard', { replace: true });
    }
    return resultado;
  };

  return (
    <LoginForm 
      onSubmit={handleLogin} 
      loading={isSubmitting} 
    />
  );
};
