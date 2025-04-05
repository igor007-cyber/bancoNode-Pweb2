import express from 'express';
import { addProdutoAoPedido, getProdutosDoPedido, removerProdutoDoPedido } from '../controllers/pedidoHasProdutoController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const routerPedidoProduto = express.Router();

// Adicionar um produto a um pedido
routerPedidoProduto.post('/pedidos/:idPedido/produtos', addProdutoAoPedido);

// Listar todos os produtos de um pedido
routerPedidoProduto.get('/pedidos/:idPedido/produtos', getProdutosDoPedido);

// Remover um produto de um pedido
routerPedidoProduto.delete('/pedidos/:idPedido/produtos/:idProduto', removerProdutoDoPedido);

export default routerPedidoProduto;
