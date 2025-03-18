import express from 'express';
import cors from 'cors'; // Importe o pacote cors
import router from './routes/authRoutes.js';

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite apenas o frontend em localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true // Permite o envio de cookies ou autenticação
}));

app.use(express.json());

// Rotas
app.use("/api", router);
// app.use("/teste", routerCliente);

export default app;