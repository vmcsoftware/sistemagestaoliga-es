import express from 'express';
import multer from 'multer';
import {
  importarContatos,
  listarContatos,
  obterContato,
  registrarLigacao,
  atualizarStatusContato,
  deletarContato,
  obterContatosPendentes,
} from '../controllers/contatoController.js';
import { autenticar } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/importar', autenticar, upload.single('arquivo'), importarContatos);
router.get('/', autenticar, listarContatos);
router.get('/pendentes', autenticar, obterContatosPendentes);
router.get('/:id', autenticar, obterContato);
router.post('/:contatoId/ligacao', autenticar, registrarLigacao);
router.patch('/:id/status', autenticar, atualizarStatusContato);
router.delete('/:id', autenticar, deletarContato);

export default router;
