import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

// Criar usuário
export const createUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await db.Usuario.create({ nome, email, senha: senhaHash });

    res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Listar todos os usuários
export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await db.Usuario.findAll({ attributes: { exclude: ['senha'] } });
    res.status(200).json({ message: 'Lista de usuários recuperada com sucesso', usuarios });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};

// Buscar usuário por ID
export const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await db.Usuario.findByPk(id, { attributes: { exclude: ['senha'] } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário recuperado com sucesso', usuario });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

// Atualizar usuário
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (email && email !== usuario.email) {
      const emailExistente = await db.Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ message: 'E-mail já está em uso' });
      }
      usuario.email = email;
    }

    if (nome) usuario.nome = nome;
    if (senha) usuario.senha = await bcrypt.hash(senha, 10);

    await usuario.save();

    res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Excluir usuário
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

// Login do usuário
export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await db.Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};
