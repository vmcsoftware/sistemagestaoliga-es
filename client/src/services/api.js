export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const apiCall = async (method, endpoint, data = null) => {
  const url = `${API_URL}${endpoint}`;
  const config = {
    method,
    headers: getAuthHeader(),
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok && response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return result;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
