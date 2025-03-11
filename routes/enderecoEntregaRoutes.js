import express from 'express';
import {
  createEnderecoEntrega,
  listEnderecosEntrega,
  getEnderecoEntregaById,
  getEnderecosByCliente,
  updateEnderecoEntrega,
  deleteEnderecoEntrega,
} from '../controllers/enderecoEntregaController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas protegidas para endereços de entrega
router.post('/enderecos-entrega', authenticationToken, createEnderecoEntrega);
router.get('/enderecos-entrega', authenticationToken, listEnderecosEntrega);
router.get('/enderecos-entrega/:id', authenticationToken, getEnderecoEntregaById);
router.get('/enderecos-entrega/cliente/:id', authenticationToken, getEnderecosByCliente);
router.put('/enderecos-entrega/:id', authenticationToken, updateEnderecoEntrega);
router.delete('/enderecos-entrega/:id', authenticationToken, deleteEnderecoEntrega);

export default router;
