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

const routerUsuario = express.router();

// Rotas de usuário
routerUsuario.post('/usuarios', createUsuario); // Criar usuário
routerUsuario.get('/usuarios', getAllUsuarios); // Listar usuários (protegido)
routerUsuario.get('/usuarios/:id', getUsuarioById); // Buscar usuário por ID (protegido)
routerUsuario.put('/usuarios/:id', authenticationToken, updateUsuario); // Atualizar usuário (protegido)
routerUsuario.delete('/usuarios/:id', authenticationToken, deleteUsuario); // Excluir usuário (protegido)

// Rota de login
routerUsuario.post('/usuarios/login', loginUsuario); // Login e geração de token

export default routerUsuario;
