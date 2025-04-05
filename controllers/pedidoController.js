// controllers/pedidoController.js
import db from '../models/index.js';

export const createPedido = async (req, res) => {
  const { data_pedido, status, valor_total, data_envio, idCliente, descricao } = req.body;
  console.log(req.body);
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
    console.log('entrou');
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

export const addProduto = async (req, res) => {
  const { id } = req.params; // ID do pedido
  const { idProduto, qtdProduto } = req.body; // Dados do produto a ser adicionado

  try {
    // 🔹 Verifica se o pedido existe
    const pedido = await db.Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // 🔹 Verifica se o pedido ainda está aberto para modificações
    if (pedido.status !== 'aberto') {
      return res.status(400).json({ message: 'Não é possível adicionar produtos a um pedido fechado' });
    }

    // 🔹 Verifica se o produto existe
    const produto = await db.Produto.findByPk(idProduto);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // 🔹 Verifica se há estoque suficiente
    if (produto.qtd_estoque < qtdProduto) {
      return res.status(400).json({ message: 'Estoque insuficiente para a quantidade solicitada' });
    }

    // // 🔹 Atualiza o estoque do produto
    // produto.qtd_estoque -= qtdProduto;
    // await produto.save();

    // 🔹 Adiciona o produto ao pedido (supondo que existe um modelo PedidoProduto para associar)
    await db.PedidoProduto.create({
      PedidoId: id,
      ProdutoId: idProduto,
      quantidade: qtdProduto
    });

    res.status(200).json({ message: 'Produto adicionado ao pedido com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar produto ao pedido:', error);
    res.status(500).json({ message: 'Erro ao adicionar produto ao pedido' });
  }
};

export const removerPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await db.Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // 🔹 Só permite remover pedidos que ainda estão abertos
    if (pedido.status !== 'aberto') {
      return res.status(400).json({ message: 'Não é possível remover um pedido já finalizado' });
    }

    await pedido.destroy();
    res.status(200).json({ message: 'Pedido removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover pedido:', error);
    res.status(500).json({ message: 'Erro ao remover pedido' });
  }
};

export const finalizarPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await db.Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    // 🔹 Verifica se o pedido já está finalizado
    if (pedido.status === 'finalizado') {
      return res.status(400).json({ message: 'O pedido já foi finalizado' });
    }

    pedido.status = 'finalizado';
    pedido.data_envio = new Date(); // Define a data de finalização/envio
    await pedido.save();

    res.status(200).json({ message: 'Pedido finalizado com sucesso', pedido });
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error);
    res.status(500).json({ message: 'Erro ao finalizar pedido' });
  }
};
