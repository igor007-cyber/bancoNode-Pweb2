// controllers/pedidoController.js
import db from '../models/index.js';

export const createPedido = async (req, res) => {
  const { data_pedido, status, valor_total, data_envio, idCliente, descricao } = req.body;

  try {
    const pedido = await db.Pedido.create({ data_pedido, status, valor_total, data_envio, idCliente, descricao });
    res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
};

export const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await db.Pedido.findAll({
      include: [{ model: db.Cliente, as: 'Cliente' }], // Relacionamento com Client
    });
    res.status(200).json({ message: 'Lista de pedidos recuperada com sucesso', pedidos });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ message: 'Erro ao listar pedidos' });
  }
};

export const getPedidoById = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await db.Pedido.findByPk(id, {
      include: [{ model: db.Cliente, as: 'Cliente' }],
    });
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.status(200).json({ message: 'Pedido recuperado com sucesso', pedido });
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ message: 'Erro ao buscar pedido' });
  }
};

export const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { data_pedido, status, valor_total, data_envio, idCliente, descricao } = req.body;

  try {
    const pedido = await db.Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    pedido.data_pedido = data_pedido;
    pedido.status = status;
    pedido.valor_total = valor_total;
    pedido.data_envio = data_envio;
    pedido.idCliente = idCliente;
    pedido.descricao = descricao;
    await pedido.save();

    res.status(200).json({ message: 'Pedido atualizado com sucesso', pedido });
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    res.status(500).json({ message: 'Erro ao atualizar pedido' });
  }
};

export const deletePedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await db.Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    await pedido.destroy();
    res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);
    res.status(500).json({ message: 'Erro ao deletar pedido' });
  }
};
