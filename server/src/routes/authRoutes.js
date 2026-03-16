import express from 'express';
import { registrar, login, obterPerfil, listarUsuariosController } from '../controllers/authController.js';
import { autenticar, autorizarRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', autenticar, obterPerfil);
router.get('/usuarios', autenticar, autorizarRole('admin', 'gerente'), listarUsuariosController);

export default router;
