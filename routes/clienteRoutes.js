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

const routerCliente = express.Router();

// Rotas protegidas para clientes
routerCliente.post('/clientes', authenticationToken, createCliente);
routerCliente.get('/clientes', authenticationToken, getAllClientes);
routerCliente.get('/clientes/:id', authenticationToken, getClienteById);
routerCliente.get('/clientes/cpf/:cpf', authenticationToken, getClienteByCPF);
routerCliente.put('/clientes/:id', authenticationToken, updateCliente);
routerCliente.delete('/clientes/:id', authenticationToken, deleteCliente);

export default routerCliente;
