<<<<<<< HEAD
import express from 'express';
import {
  createProduto,
  listProdutos,
  getProdutoById,
  getProdutosByName,
  getProdutosByCategory,
  updateProduto,
  deleteProduto,
} from '../controllers/produtoController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas protegidas para produtos
router.post('/produtos', authenticationToken, createProduto);
router.get('/produtos', authenticationToken, listProdutos);
router.get('/produtos/search', authenticationToken, getProdutosByName);
router.get('/produtos/categoria', authenticationToken, getProdutosByCategory);
router.get('/produtos/:id', authenticationToken, getProdutoById);
router.put('/produtos/:id', authenticationToken, updateProduto);
router.delete('/produtos/:id', authenticationToken, deleteProduto);

export default router;
=======
import express from 'express';
import {
  createProduto,
  listProdutos,
  getProdutoById,
  getProdutosByName,
  getProdutosByCategory,
  updateProduto,
  deleteProduto,
} from '../controllers/produtoController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas protegidas para produtos
router.post('/produtos', authenticationToken, createProduto);
router.get('/produtos', authenticationToken, listProdutos);
router.get('/produtos/search', authenticationToken, getProdutosByName);
router.get('/produtos/categoria', authenticationToken, getProdutosByCategory);
router.get('/produtos/:id', authenticationToken, getProdutoById);
router.put('/produtos/:id', authenticationToken, updateProduto);
router.delete('/produtos/:id', authenticationToken, deleteProduto);

export default router;
>>>>>>> f7f82418d8d34c59f64b67edae97c3a85f7aa436
