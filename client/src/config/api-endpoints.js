/**
 * Configuração de URLs dos Cloud Functions
 * Em desenvolvimento, use o emulador local
 * Em produção, use as URLs do Firebase
 */

const isDev = process.env.NODE_ENV === 'development';

// URLs de desenvolvimento (emulador local)
const DEV_URLS = {
  BASE: 'http://localhost:5001/agendaccb-73569/us-central1',
  REGION: 'us-central1',
  PROJECT: 'agendaccb-73569',
};

// URLs de produção (Cloud Functions real)
const PROD_URLS = {
  BASE: 'https://us-central1-agendaccb-73569.cloudfunctions.net',
  REGION: 'us-central1',
  PROJECT: 'agendaccb-73569',
};

const URLS = isDev ? DEV_URLS : PROD_URLS;

export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${URLS.BASE}/auth_register`,
  LOGIN: `${URLS.BASE}/auth_login`,
  PERFIL: `${URLS.BASE}/auth_perfil`,
  
  // Contatos
  CONTATOS_LISTAR: `${URLS.BASE}/contatos_listar`,
  CONTATOS_CRIAR: `${URLS.BASE}/contatos_criar`,
  CONTATOS_OBTER: (id) => `${URLS.BASE}/contatos_obter?id=${id}`,
  CONTATOS_ATUALIZAR: (id) => `${URLS.BASE}/contatos_atualizar?id=${id}`,
  CONTATOS_DELETAR: (id) => `${URLS.BASE}/contatos_deletar?id=${id}`,
  CONTATOS_PENDENTES: `${URLS.BASE}/contatos_pendentes`,
  
  // Ligações
  LIGACOES_REGISTRAR: `${URLS.BASE}/ligacoes_registrar`,
  
  // Dashboard
  DASHBOARD: `${URLS.BASE}/dashboard`,
  DASHBOARD_ALERTAS: `${URLS.BASE}/dashboard_alertas`,
  
  // Health
  HEALTH: `${URLS.BASE}/health`,
};

export const API_CONFIG = {
  isDev,
  region: URLS.REGION,
  project: URLS.PROJECT,
  timeout: 30000,
};

export default API_ENDPOINTS;
