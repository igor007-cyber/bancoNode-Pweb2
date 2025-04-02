import express from 'express';
import {
  createProduto,
  getAllProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto,
  adicionarProduto, // Adiciona quantidade ao estoque
  removerProduto, // Remove quantidade do estoque
  getQuantidadeProduto // Obtém a quantidade de um produto
} from '../controllers/produtoController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const routerProduto = express.Router();

// Rotas protegidas para produtos
routerProduto.post('/cadastrar', authenticationToken,createProduto);
routerProduto.get('/listar', getAllProdutos);
routerProduto.get('/lstar/:id', getProdutoById);
routerProduto.put('/produtos/:id', authenticationToken, updateProduto);
routerProduto.delete('/produtos/:id', authenticationToken, deleteProduto);

// Rotas para gerenciamento de estoque
routerProduto.patch('/produtos/:id/add', authenticationToken, adicionarProduto); // Adiciona quantidade ao estoque
routerProduto.patch('/produtos/:id/remove', authenticationToken, removerProduto); // Remove quantidade do estoque
routerProduto.get('/produtos/:id/quantidade', getQuantidadeProduto); // Obtém a quantidade do produto

export default routerProduto;
