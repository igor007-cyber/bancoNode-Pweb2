// controllers/enderecoEntregaController.js
import db from '../models/index.js';

export const createEnderecoEntrega = async (req, res) => {
  const { rua, numero, complemento, bairro, cidade, estado, cep, idCliente } = req.body;

  try {
    const enderecoEntrega = await db.EnderecoEntrega.create({
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
      idCliente
    });
    res.status(201).json({ message: 'Endereço de entrega criado com sucesso', enderecoEntrega });
  } catch (error) {
    console.error('Erro ao criar endereço de entrega:', error);
    res.status(500).json({ message: 'Erro ao criar endereço de entrega' });
  }
};

export const getAllEnderecosEntrega = async (req, res) => {
  try {
    const enderecosEntrega = await db.EnderecoEntrega.findAll({
      include: [{ model: db.Cliente, as: 'Cliente' }] // Relacionamento com Cliente
    });
    res.status(200).json({ message: 'Lista de endereços de entrega recuperada com sucesso', enderecosEntrega });
  } catch (error) {
    console.error('Erro ao listar endereços de entrega:', error);
    res.status(500).json({ message: 'Erro ao listar endereços de entrega' });
  }
};

export const getEnderecoEntregaById = async (req, res) => {
  const { id } = req.params;

  try {
    const enderecoEntrega = await db.EnderecoEntrega.findByPk(id, {
      include: [{ model: db.Cliente, as: 'Cliente' }]
    });

    if (!enderecoEntrega) {
      return res.status(404).json({ message: 'Endereço de entrega não encontrado' });
    }

    res.status(200).json({ message: 'Endereço de entrega recuperado com sucesso', enderecoEntrega });
  } catch (error) {
    console.error('Erro ao buscar endereço de entrega:', error);
    res.status(500).json({ message: 'Erro ao buscar endereço de entrega' });
  }
};

export const updateEnderecoEntrega = async (req, res) => {
  const { id } = req.params;
  const { rua, numero, complemento, bairro, cidade, estado, cep, idCliente } = req.body;

  try {
    const enderecoEntrega = await db.EnderecoEntrega.findByPk(id);
    if (!enderecoEntrega) {
      return res.status(404).json({ message: 'Endereço de entrega não encontrado' });
    }

    enderecoEntrega.rua = rua;
    enderecoEntrega.numero = numero;
    enderecoEntrega.complemento = complemento;
    enderecoEntrega.bairro = bairro;
    enderecoEntrega.cidade = cidade;
    enderecoEntrega.estado = estado;
    enderecoEntrega.cep = cep;
    enderecoEntrega.idCliente = idCliente;
    
    await enderecoEntrega.save();

    res.status(200).json({ message: 'Endereço de entrega atualizado com sucesso', enderecoEntrega });
  } catch (error) {
    console.error('Erro ao atualizar endereço de entrega:', error);
    res.status(500).json({ message: 'Erro ao atualizar endereço de entrega' });
  }
};

export const deleteEnderecoEntrega = async (req, res) => {
  const { id } = req.params;

  try {
    const enderecoEntrega = await db.EnderecoEntrega.findByPk(id);
    if (!enderecoEntrega) {
      return res.status(404).json({ message: 'Endereço de entrega não encontrado' });
    }

    await enderecoEntrega.destroy();
    res.status(200).json({ message: 'Endereço de entrega deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar endereço de entrega:', error);
    res.status(500).json({ message: 'Erro ao deletar endereço de entrega' });
  }
};
