import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await db.Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isSenhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!isSenhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

     const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    res.status(200).json({ message: 'Login bem-sucedido', token, user: usuario.nome });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

export const signUp = async (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  try {
    
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha,
      telefone
    });
    
    const usuario = novoUsuario.get({ plain: true });
    delete usuario.senha;

    res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

export const listUsuarios = async (req, res) => {
  try {
    
    const usuarios = await db.Usuario.findAll({
      attributes: { exclude: ['senha'] },
    });

    res.status(200).json({ message: 'Lista de usuários recuperada com sucesso', usuarios });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};
