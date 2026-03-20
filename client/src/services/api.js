import axios from 'axios';
import API_ENDPOINTS from '../config/api-endpoints.js';

// Criar instância axios com configurações padrão
const apiClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===========================
// AUTH SERVICES
// ===========================

export const authService = {
  register: async (data) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },

  login: async (email, senha) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, senha });
      
      // Salvar token e user
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  perfil: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PERFIL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },
};

// ===========================
// CONTATOS SERVICES
// ===========================

export const contatosService = {
  listar: async (filtros = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filtros.page) params.append('page', filtros.page);
      if (filtros.limite) params.append('limite', filtros.limite);
      if (filtros.status) params.append('status', filtros.status);
      if (filtros.busca) params.append('busca', filtros.busca);
      
      const url = filtros ? `${API_ENDPOINTS.CONTATOS_LISTAR}?${params}` : API_ENDPOINTS.CONTATOS_LISTAR;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },

  criar: async (contatoData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CONTATOS_CRIAR, contatoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },

  obter: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CONTATOS_OBTER(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },

  atualizar: async (id, dados) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.CONTATOS_ATUALIZAR(id), dados);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },

  deletar: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CONTATOS_DELETAR(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },

  obterPendentes: async (limite = 10) => {
    try {
      const url = `${API_ENDPOINTS.CONTATOS_PENDENTES}?limite=${limite}`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },
};

// ===========================
// LIGAÇÕES SERVICES
// ===========================

export const ligacoesService = {
  registrar: async (ligacaoData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LIGACOES_REGISTRAR, ligacaoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },
};

// ===========================
// HEALTH CHECK
// ===========================

export const healthService = {
  check: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      throw error.response?.data || { erro: error.message };
    }
  },
};

// ===========================
// GENERIC API CALL
// ===========================

export const apiCall = async (method = 'GET', endpoint, data = null) => {
  try {
    let response;
    const url = endpoint.startsWith('http') ? endpoint : `${API_ENDPOINTS.BASE || ''}${endpoint}`;
    
    if (method === 'GET') {
      response = await apiClient.get(url);
    } else if (method === 'POST') {
      response = await apiClient.post(url, data);
    } else if (method === 'PUT') {
      response = await apiClient.put(url, data);
    } else if (method === 'DELETE') {
      response = await apiClient.delete(url);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { erro: error.message };
  }
};

export default apiClient;
