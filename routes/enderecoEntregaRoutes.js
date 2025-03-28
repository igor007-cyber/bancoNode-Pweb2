import express from 'express';
import {
  createEnderecoEntrega,
  getAllEnderecosEntrega,
  getEnderecoEntregaById,
  updateEnderecoEntrega,
  deleteEnderecoEntrega,
} from '../controllers/enderecoEntregaController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const routerEndereco = express.Router();

// Rotas protegidas para endereços de entrega
routerEndereco.post('/enderecos-entrega', authenticationToken, createEnderecoEntrega);
routerEndereco.get('/enderecos-entrega', getAllEnderecosEntrega);
routerEndereco.get('/enderecos-entrega/:id', getEnderecoEntregaById);
routerEndereco.put('/enderecos-entrega/:id', authenticationToken, updateEnderecoEntrega);
routerEndereco.delete('/enderecos-entrega/:id', authenticationToken, deleteEnderecoEntrega);

export default routerEndereco;
