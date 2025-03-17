import express from 'express';
import { 
  createUsuario, 
  getAllUsuarios, 
  getUsuarioById, 
  updateUsuario, 
  deleteUsuario, 
  loginUsuario 
} from '../controllers/usuarioController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas de usuário
router.post('/usuarios', createUsuario); // Criar usuário
router.get('/usuarios', authenticationToken, getAllUsuarios); // Listar usuários (protegido)
router.get('/usuarios/:id', authenticationToken, getUsuarioById); // Buscar usuário por ID (protegido)
router.put('/usuarios/:id', authenticationToken, updateUsuario); // Atualizar usuário (protegido)
router.delete('/usuarios/:id', authenticationToken, deleteUsuario); // Excluir usuário (protegido)

// Rota de login
router.post('/usuarios/login', loginUsuario); // Login e geração de token

export default router;
