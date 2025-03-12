import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não foi fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }

    req.usuario = usuario;
    next();
  });
};

export const authorizedRole = (role) => {
  return (req, res, next) => {
    if (!req.usuario || req.usuario.role !== role) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
};
