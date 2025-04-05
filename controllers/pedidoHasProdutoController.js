import db from '../models/index.js';

// Adicionar um produto a um pedido
export const addProdutoAoPedido = async (req, res) => {
  const { idPedido } = req.params;
  const { idProduto, quantidade, preco_unitario } = req.body;

   
  try {
    const pedido = await db.Pedido.findByPk(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    const produto = await db.Produto.findByPk(idProduto);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    if (produto.qtd_estoque < quantidade) {
      return res.status(400).json({ message: 'Estoque insuficiente' });
    }

    await db.PedidoHasProduto.create({
      idPedido,
      idProduto,
      quantidade,
      preco_unitario
    });

    await pedido.update({
      valor_total: pedido.valor_total + quantidade * preco_unitario
    });

    res.status(201).json({ message: 'Produto adicionado ao pedido com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar produto ao pedido:', error);
    res.status(500).json({ message: 'Erro interno ao processar a requisição' });
  }
};

export const getProdutosDoPedido = async (req, res) => {
  const { idPedido } = req.params;

  try {
    const pedido = await db.Pedido.findByPk(idPedido, {
      include: [
        {
          model: db.Produto,
          as: 'produtos', // Deve ser igual ao alias definido na associação
          through: { attributes: ['quantidade', 'preco_unitario'] }
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    
    const produtos = pedido.produtos.map(produto => ({
      idProduto: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      quantidade: produto.PedidoHasProduto.quantidade,
      preco_unitario: produto.PedidoHasProduto.preco_unitario
    }))

    res.status(200).json({ message: 'Produtos do pedido recuperados com sucesso', produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos do pedido:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos do pedido' });
  }
};



// Remover um produto de um pedido
export const removerProdutoDoPedido = async (req, res) => {
  const { idPedido, idProduto } = req.params;

  try {
    const pedidoHasProduto = await db.PedidoHasProduto.findOne({
      where: { idPedido, idProduto }
    });

    if (!pedidoHasProduto) {
      return res.status(404).json({ message: 'Produto não encontrado no pedido' });
    }

    const produto = await db.Produto.findByPk(idProduto);
    const pedido = await db.Pedido.findByPk(idPedido);
    
    if (produto) {
      await produto.update({ qtd_estoque: produto.qtd_estoque + pedidoHasProduto.quantidade });
    }
    
    if (pedido) {
      await pedido.update({
        valor_total: pedido.valor_total - (pedidoHasProduto.quantidade * pedidoHasProduto.preco_unitario)
      });
    }

    await pedidoHasProduto.destroy();
    res.status(200).json({ message: 'Produto removido do pedido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover produto do pedido:', error);
    res.status(500).json({ message: 'Erro interno ao processar a requisição' });
  }
};

