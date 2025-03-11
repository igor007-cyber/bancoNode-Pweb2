import express from 'express';
import { signUp, login, listUsers } from '../controllers/authController.js';
import { authenticationToken, authorizedRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas públicas
router.post('/signup', signUp);
router.post('/login', login);

// Rota protegida para listar usuários (apenas admin)
router.get('/users', authenticationToken, authorizedRole('admin'), listUsers);

export default router;
