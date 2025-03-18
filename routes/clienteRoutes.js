import express from 'express';
import {
  createCliente,
  getAllClientes,
  getClienteById,
  getClienteByCPF,
  updateCliente,
  deleteCliente,
} from '../controllers/clienteController.js';
import { authenticationToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas protegidas para clientes
router.post('/clientes', authenticationToken, createCliente);
router.get('/clientes', authenticationToken, getAllClientes);
router.get('/clientes/:id', authenticationToken, getClienteById);
router.get('/clientes/cpf/:cpf', authenticationToken, getClienteByCPF);
router.put('/clientes/:id', authenticationToken, updateCliente);
router.delete('/clientes/:id', authenticationToken, deleteCliente);

export default routerCliente;
