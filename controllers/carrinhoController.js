// controllers/carrinhoController.js
import db from '../models/index.js';

export const createCarrinho = async (req, res) => {
  const { data_criacao, status } = req.body;

  try {
    const carrinho = await db.Carrinho.create({ data_criacao, status });
    res.status(201).json({ message: 'Carrinho criado com sucesso', carrinho });
  } catch (error) {
    console.error('Erro ao criar carrinho:', error);
    res.status(500).json({ message: 'Erro ao criar carrinho' });
  }
};

export const getAllCarrinhos = async (req, res) => {
  try {
    const carrinhos = await db.Carrinho.findAll({
      include: [{ model: db.Usuario, as: 'Usuario' }], // Se houver relação com Usuário
    });
    res.status(200).json({ message: 'Lista de carrinhos recuperada com sucesso', carrinhos });
  } catch (error) {
    console.error('Erro ao listar carrinhos:', error);
    res.status(500).json({ message: 'Erro ao listar carrinhos' });
  }
};

export const getCarrinhoById = async (req, res) => {
  const { id } = req.params;

  try {
    const carrinho = await db.Carrinho.findByPk(id, {
      include: [{ model: db.Usuario, as: 'Usuario' }], // Se houver relação com Usuário
    });
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }
    res.status(200).json({ message: 'Carrinho recuperado com sucesso', carrinho });
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    res.status(500).json({ message: 'Erro ao buscar carrinho' });
  }
};

export const updateCarrinho = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const carrinho = await db.Carrinho.findByPk(id);
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    carrinho.status = status;
    await carrinho.save();

    res.status(200).json({ message: 'Carrinho atualizado com sucesso', carrinho });
  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error);
    res.status(500).json({ message: 'Erro ao atualizar carrinho' });
  }
};

export const deleteCarrinho = async (req, res) => {
  const { id } = req.params;

  try {
    const carrinho = await db.Carrinho.findByPk(id);
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    await carrinho.destroy();
    res.status(200).json({ message: 'Carrinho deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar carrinho:', error);
    res.status(500).json({ message: 'Erro ao deletar carrinho' });
  }
};
v
export const addCarrinho = async (req, res) => {
  const { idCarrinho, idProduto, quantidade } = req.body;

  try {
    // 🔹 Verifica se o carrinho existe
    const carrinho = await db.Carrinho.findByPk(idCarrinho);
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    // 🔹 Verifica se o produto existe
    const produto = await db.Produto.findByPk(idProduto);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // 🔹 Verifica se há estoque suficiente
    if (produto.qtd_estoque < quantidade) {
      return res.status(400).json({ message: 'Estoque insuficiente para a quantidade solicitada' });
    }

    // 🔹 Atualiza o estoque do produto
    produto.qtd_estoque -= quantidade;
    await produto.save();

    // 🔹 Adiciona o produto ao carrinho (supondo que existe um modelo CarrinhoProduto para associar)
    await db.CarrinhoProduto.create({
      CarrinhoId: idCarrinho,
      ProdutoId: idProduto,
      quantidade: quantidade
    });

    res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' });
  }
=======
// controllers/carrinhoController.js
import db from '../models/index.js';

export const createCarrinho = async (req, res) => {
  const { data_criacao, status } = req.body;

  try {
    const carrinho = await db.Carrinho.create({ data_criacao, status });
    res.status(201).json({ message: 'Carrinho criado com sucesso', carrinho });
  } catch (error) {
    console.error('Erro ao criar carrinho:', error);
    res.status(500).json({ message: 'Erro ao criar carrinho' });
  }
};

export const getAllCarrinhos = async (req, res) => {
  try {
    const carrinhos = await db.Carrinho.findAll({
      include: [{ model: db.Usuario, as: 'Usuario' }], // Se houver relação com Usuário
    });
    res.status(200).json({ message: 'Lista de carrinhos recuperada com sucesso', carrinhos });
  } catch (error) {
    console.error('Erro ao listar carrinhos:', error);
    res.status(500).json({ message: 'Erro ao listar carrinhos' });
  }
};

export const getCarrinhoById = async (req, res) => {
  const { id } = req.params;

  try {
    const carrinho = await db.Carrinho.findByPk(id, {
      include: [{ model: db.Usuario, as: 'Usuario' }], // Se houver relação com Usuário
    });
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }
    res.status(200).json({ message: 'Carrinho recuperado com sucesso', carrinho });
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    res.status(500).json({ message: 'Erro ao buscar carrinho' });
  }
};

export const updateCarrinho = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const carrinho = await db.Carrinho.findByPk(id);
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    carrinho.status = status;
    await carrinho.save();

    res.status(200).json({ message: 'Carrinho atualizado com sucesso', carrinho });
  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error);
    res.status(500).json({ message: 'Erro ao atualizar carrinho' });
  }
};

export const deleteCarrinho = async (req, res) => {
  const { id } = req.params;

  try {
    const carrinho = await db.Carrinho.findByPk(id);
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    await carrinho.destroy();
    res.status(200).json({ message: 'Carrinho deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar carrinho:', error);
    res.status(500).json({ message: 'Erro ao deletar carrinho' });
  }
};
v
export const addCarrinho = async (req, res) => {
  const { idCarrinho, idProduto, quantidade } = req.body;

  try {
    // 🔹 Verifica se o carrinho existe
    const carrinho = await db.Carrinho.findByPk(idCarrinho);
    if (!carrinho) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    // 🔹 Verifica se o produto existe
    const produto = await db.Produto.findByPk(idProduto);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // 🔹 Verifica se há estoque suficiente
    if (produto.qtd_estoque < quantidade) {
      return res.status(400).json({ message: 'Estoque insuficiente para a quantidade solicitada' });
    }

    // 🔹 Atualiza o estoque do produto
    produto.qtd_estoque -= quantidade;
    await produto.save();

    // 🔹 Adiciona o produto ao carrinho (supondo que existe um modelo CarrinhoProduto para associar)
    await db.CarrinhoProduto.create({
      CarrinhoId: idCarrinho,
      ProdutoId: idProduto,
      quantidade: quantidade
    });

    res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' });
  }
}