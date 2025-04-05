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
routerCliente.post('/registro', authenticationToken,createCliente);
routerCliente.get('/listar', getAllClientes);
routerCliente.get('/listar/:id',getClienteById);
routerCliente.get('/listar/cpf/:cpf',getClienteByCPF);
routerCliente.put('/atualizar/:id', authenticationToken,updateCliente);
routerCliente.delete('/deletar/:id', authenticationToken,deleteCliente);

export default routerCliente;
