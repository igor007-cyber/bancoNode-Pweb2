import express from 'express';
import {
  createPedido,
  getAllPedidos,
  getPedidoById,
  deletePedido,
  addProduto, 
  finalizarPedido, 
  removerPedido 
} from '../controllers/pedidoController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const routerPedido = express.Router();

// Rotas protegidas para pedidos
routerPedido.post('/pedidos', authenticationToken, createPedido);
routerPedido.get('/pedidos', getAllPedidos);
routerPedido.get('/pedidos/:id', getPedidoById);
routerPedido.delete('/pedidos/:id', authenticationToken, deletePedido);

// Novas rotas adicionadas
routerPedido.post('/pedidos/:id/produtos', authenticationToken, addProduto); 
routerPedido.patch('/pedidos/:id/finalizar', authenticationToken, finalizarPedido);
routerPedido.delete('/pedidos/:id/remover', authenticationToken, removerPedido); 

export default routerPedido;
