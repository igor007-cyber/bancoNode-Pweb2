import express from 'express';
import cors from 'cors'; // Importe o pacote cors
import router from './routes/authRoutes.js';
import routerProduto from './routes/produtoRoutes.js';
import routerCliente from './routes/clienteRoutes.js';
import routerPedido from './routes/pedidoRoutes.js';
import routerEndereco from './routes/enderecoEntregaRoutes.js';

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas o frontend em localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true // Permite o envio de cookies ou autenticação
}));

// app.use("/teste", routerCliente);

export default app;