import express from 'express';
import cors from 'cors';
import { initializeFirebase } from '../config/database.js';
import { config } from '../config/config.js';

// Importar rotas
import authRoutes from './routes/authRoutes.js';
import contatoRoutes from './routes/contatoRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Firebase
initializeFirebase();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/contatos', contatoRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), database: 'Firebase' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Iniciar servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`🔥 Firebase conectado ao projeto: ${config.firebase.projectId}`);
  console.log(`📊 Ambiente: ${config.nodeEnv}`);
});
