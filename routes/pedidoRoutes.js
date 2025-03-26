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

const routerPedido = express.Router();

// Rotas protegidas para pedidos
routerPedido.post('/pedidos', authenticationToken, createPedido);
routerPedido.get('/pedidos', authenticationToken, getAllPedidos);
routerPedido.get('/pedidos/:id', authenticationToken, getPedidoById);
routerPedido.get('/pedidos/cliente/:id', authenticationToken, getPedidosByCliente);
routerPedido.put('/pedidos/:id', authenticationToken, updatePedido);
routerPedido.delete('/pedidos/:id', authenticationToken, deletePedido);

// Novas rotas adicionadas
routerPedido.post('/pedidos/:id/produtos', authenticationToken, addProduto); // Adiciona produto ao pedido
routerPedido.delete('/pedidos/:id/produtos/:produtoId', authenticationToken, removeProdutoDoPedido); // Remove produto do pedido
routerPedido.patch('/pedidos/:id/status', authenticationToken, atualizarStatusPedido); // Atualiza status do pedido

export default routerPedido;
