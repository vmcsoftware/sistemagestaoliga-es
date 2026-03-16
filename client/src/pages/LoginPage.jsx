import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, senha) => {
    const resultado = await login(email, senha);
    if (resultado.sucesso) {
      navigate('/dashboard');
    }
    return resultado;
  };

  return <LoginForm onSubmit={handleLogin} loading={false} />;
};
