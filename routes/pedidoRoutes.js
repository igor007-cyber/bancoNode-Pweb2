import express from 'express';
import {
  createPedido,
  getAllPedidos,
  getPedidoById,
  getPedidosByCliente,
  updatePedido,
  deletePedido,
  addProduto, // Adiciona um produto ao pedido
  removeProdutoDoPedido, // Remove um produto do pedido
  atualizarStatusPedido // Atualiza o status do pedido
} from '../controllers/pedidoController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas protegidas para pedidos
router.post('/pedidos', authenticationToken, createPedido);
router.get('/pedidos', authenticationToken, getAllPedidos);
router.get('/pedidos/:id', authenticationToken, getPedidoById);
router.get('/pedidos/cliente/:id', authenticationToken, getPedidosByCliente);
router.put('/pedidos/:id', authenticationToken, updatePedido);
router.delete('/pedidos/:id', authenticationToken, deletePedido);

// Novas rotas adicionadas
router.post('/pedidos/:id/produtos', authenticationToken, addProduto); // Adiciona produto ao pedido
router.delete('/pedidos/:id/produtos/:produtoId', authenticationToken, removeProdutoDoPedido); // Remove produto do pedido
router.patch('/pedidos/:id/status', authenticationToken, atualizarStatusPedido); // Atualiza status do pedido

export default router;
