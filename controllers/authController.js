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

    const token = jwt.sign({ id: usuario.idUsuario, role: usuario.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expira em 1 hora
    });

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

export const signUp = async (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  try {
    // Verifica se o usuário já existe
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografa a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha: senhaHash,
      telefone
    });

    // Remove a senha do retorno
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
    // Busca todos os usuários no banco de dados
    const usuarios = await db.Usuario.findAll({
      attributes: { exclude: ['senha'] }, // Exclui a senha do retorno
    });

    res.status(200).json({ message: 'Lista de usuários recuperada com sucesso', usuarios });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};
