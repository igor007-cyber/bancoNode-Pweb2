// controllers/produtoController.js
import db from '../models/index.js';

export const createProduto = async (req, res) => {
  const { nome, descricao, preco, categoria, qtd_estoque } = req.body;

  try {
    const produto = await db.Produto.create({ nome, descricao, preco, categoria, qtd_estoque });
    res.status(201).json({ message: 'Produto criado com sucesso', produto });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro ao criar produto' });
  }
};

export const getAllProdutos = async (req, res) => {
  try {
    const produtos = await db.Produto.findAll({
      include: [{ model: db.Categoria, as: 'Categoria' }], // Relacionamento com Categoria, se houver
    });
    res.status(200).json({ message: 'Lista de produtos recuperada com sucesso', produtos });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ message: 'Erro ao listar produtos' });
  }
};

export const getProdutoById = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await db.Produto.findByPk(id, {
      include: [{ model: db.Categoria, as: 'Categoria' }],
    });
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto recuperado com sucesso', produto });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

export const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, categoria, qtd_estoque } = req.body;

  try {
    const produto = await db.Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = preco;
    produto.categoria = categoria;
    produto.qtd_estoque = qtd_estoque;
    await produto.save();

    res.status(200).json({ message: 'Produto atualizado com sucesso', produto });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
};

export const deleteProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await db.Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await produto.destroy();
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};

