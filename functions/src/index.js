import admin from 'firebase-admin';
import functions from 'firebase-functions';
import cors from 'cors';
import { registrar, login, obterPerfil } from './src/routes/auth.js';
import { 
  listarContatosHandler, 
  criarContatoHandler,
  obterContatoHandler,
  atualizarContatoHandler,
  deletarContatoHandler,
  obterContatosPendentesHandler,
  registrarLigacaoHandler
} from './src/routes/contatos.js';
import { requiredAuth } from './src/middleware/auth.js';

// Inicializar Firebase Admin SDK
const serviceAccount = require('./agendaccb-73569-firebase-adminsdk-fbsvc-426624b2ba.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://agendaccb-73569.firebaseio.com',
});

// Configurar CORS
const corsHandler = cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://vmcsoftware.github.io',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
});

// Função helper para envolver handlers com CORS
const withCors = (handler) => {
  return (req, res) => {
    return corsHandler(req, res, () => handler(req, res));
  };
};

// ===========================
// AUTH ROUTES
// ===========================

exports.auth_register = functions.https.onRequest(
  withCors(registrar)
);

exports.auth_login = functions.https.onRequest(
  withCors(login)
);

exports.auth_perfil = functions.https.onRequest(
  withCors(requiredAuth(obterPerfil))
);

// ===========================
// CONTATOS ROUTES
// ===========================

exports.contatos_listar = functions.https.onRequest(
  withCors(requiredAuth(listarContatosHandler))
);

exports.contatos_criar = functions.https.onRequest(
  withCors(requiredAuth(criarContatoHandler))
);

exports.contatos_obter = functions.https.onRequest(
  withCors(requiredAuth(obterContatoHandler))
);

exports.contatos_atualizar = functions.https.onRequest(
  withCors(requiredAuth(atualizarContatoHandler))
);

exports.contatos_deletar = functions.https.onRequest(
  withCors(requiredAuth(deletarContatoHandler))
);

exports.contatos_pendentes = functions.https.onRequest(
  withCors(requiredAuth(obterContatosPendentesHandler))
);

// ===========================
// LIGAÇÕES ROUTES
// ===========================

exports.ligacoes_registrar = functions.https.onRequest(
  withCors(requiredAuth(registrarLigacaoHandler))
);

// ===========================
// HEALTH CHECK
// ===========================

exports.health = functions.https.onRequest(
  withCors((req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date(),
      environment: process.env.NODE_ENV || 'development',
    });
  })
);

console.log('☁️  Cloud Functions initialized successfully!');
