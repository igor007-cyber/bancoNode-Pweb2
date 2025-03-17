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

const router = express.Router();

// Rotas protegidas para produtos
router.post('/produtos', authenticationToken, createProduto);
router.get('/produtos', authenticationToken, getAllProdutos);
router.get('/produtos/:id', authenticationToken, getProdutoById);
router.put('/produtos/:id', authenticationToken, updateProduto);
router.delete('/produtos/:id', authenticationToken, deleteProduto);

// Rotas para gerenciamento de estoque
router.patch('/produtos/:id/add', authenticationToken, adicionarProduto); // Adiciona quantidade ao estoque
router.patch('/produtos/:id/remove', authenticationToken, removerProduto); // Remove quantidade do estoque
router.get('/produtos/:id/quantidade', authenticationToken, getQuantidadeProduto); // Obtém a quantidade do produto

export default router;
