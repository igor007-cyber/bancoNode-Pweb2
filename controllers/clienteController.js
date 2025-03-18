// controllers/clienteController.js
import db from '../models/index.js';

export const createCliente = async (req, res) => {
  const { nome, telefone, cpf, rua, bairro, cidade, usuario_idUsuario } = req.body;
  
  try {
    const cliente = await db.Cliente.create({ nome, telefone, cpf, rua, bairro, cidade, usuario_idUsuario });
    res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro ao criar cliente' });
  }
};

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await db.Cliente.findAll({
      include: [{ model: db.Usuario, as: 'Usuario' }], // Relacionamento com Usuário, se houver
    });
    res.status(200).json({ message: 'Lista de clientes recuperada com sucesso', clientes });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ message: 'Erro ao listar clientes' });
  }
};

export const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await db.Cliente.findByPk(id, {
      include: [{ model: db.Usuario, as: 'Usuario' }], 
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente recuperado com sucesso', cliente });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ message: 'Erro ao buscar cliente' });
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, cpf, rua, bairro, cidade, usuario_idUsuario } = req.body;

  try {
    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    cliente.nome = nome;
    cliente.telefone = telefone;
    cliente.cpf = cpf;
    cliente.rua = rua;
    cliente.bairro = bairro;
    cliente.cidade = cidade;
    cliente.usuario_idUsuario = usuario_idUsuario;
    await cliente.save();

    res.status(200).json({ message: 'Cliente atualizado com sucesso', cliente });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ message: 'Erro ao atualizar cliente' });
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    await cliente.destroy();
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ message: 'Erro ao deletar cliente' });
  }
};

export const getClienteByCPF = async (req, res) => {
  const { cpf } = req.params; // Obtém o CPF da URL

  try {
    const cliente = await db.Cliente.findOne({ where: { cpf } });

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.status(200).json({ message: 'Cliente encontrado com sucesso', cliente });
  } catch (error) {
    console.error('Erro ao buscar cliente pelo CPF:', error);
    res.status(500).json({ message: 'Erro ao buscar cliente' });
  }
};
