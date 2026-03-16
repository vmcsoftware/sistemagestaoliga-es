import express from 'express';
import {
  obterDashboard,
  gerarRelatorioOperador,
  gerarRelatorioContatosTrabalhados,
  obterAlertas,
} from '../controllers/dashboardController.js';
import { autenticar } from '../middleware/auth.js';

const router = express.Router();

router.get('/', autenticar, obterDashboard);
router.get('/relatorio/operador', autenticar, gerarRelatorioOperador);
router.get('/relatorio/contatos-trabalhados', autenticar, gerarRelatorioContatosTrabalhados);
router.get('/alertas', autenticar, obterAlertas);

export default router;
