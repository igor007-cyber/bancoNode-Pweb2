import express from 'express';
import {
  createPedido,
  listPedidos,
  getPedidoById,
  getPedidosByCliente,
  updatePedido,
  deletePedido,
} from '../controllers/pedidoController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas protegidas para pedidos
router.post('/pedidos', authenticationToken, createPedido);
router.get('/pedidos', authenticationToken, listPedidos);
router.get('/pedidos/:id', authenticationToken, getPedidoById);
router.get('/pedidos/cliente/:id', authenticationToken, getPedidosByCliente);
router.put('/pedidos/:id', authenticationToken, updatePedido);
router.delete('/pedidos/:id', authenticationToken, deletePedido);

export default router;
