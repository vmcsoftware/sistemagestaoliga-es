import { 
  criarContato, 
  obterContatoPorId, 
  listarContatos, 
  atualizarContato, 
  deletarContato,
  obterContatosPendentes
} from '../models/Contato.js';
import { criarRegistroLigacao, obterHistoricoContato } from '../models/HistoricoLigacao.js';

export const listarContatosHandler = async (req, res) => {
  try {
    const { page = 1, limite = 10, status, busca } = req.query;
    const skip = (page - 1) * limite;

    const filtros = {};
    if (status && status !== 'todos') {
      filtros.status = status;
    }
    if (busca) {
      filtros.busca = busca;
    }

    const contatos = await listarContatos(filtros);
    
    const total = contatos.length;
    const contatosPaginados = contatos.slice(skip, skip + parseInt(limite));

    res.json({
      sucesso: true,
      contatos: contatosPaginados,
      paginacao: {
        total,
        pagina: parseInt(page),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / limite),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const criarContatoHandler = async (req, res) => {
  try {
    const { nome, cpfCnpj, telefone1, telefone2, email, endereco, observacoes } = req.body;

    if (!nome || !cpfCnpj || !telefone1) {
      return res.status(400).json({ 
        sucesso: false,
        erro: 'Nome, CPF/CNPJ e telefone são obrigatórios' 
      });
    }

    const novoContato = await criarContato({
      nome,
      cpfCnpj,
      telefone1,
      telefone2: telefone2 || null,
      email: email || null,
      endereco: endereco || null,
      observacoes: observacoes || '',
      operador: req.userId || null,
    });

    res.status(201).json({
      sucesso: true,
      contato: novoContato,
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const obterContatoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const contato = await obterContatoPorId(id);

    if (!contato) {
      return res.status(404).json({ 
        sucesso: false,
        erro: 'Contato não encontrado' 
      });
    }

    const historico = await obterHistoricoContato(id);

    res.json({
      sucesso: true,
      contato,
      historico,
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const atualizarContatoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const contatoAtualizado = await atualizarContato(id, updates);

    if (!contatoAtualizado) {
      return res.status(404).json({ 
        sucesso: false,
        erro: 'Contato não encontrado' 
      });
    }

    res.json({
      sucesso: true,
      contato: contatoAtualizado,
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const deletarContatoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deletarContato(id);

    res.json({
      sucesso: true,
      mensagem: 'Contato deletado com sucesso',
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const obterContatosPendentesHandler = async (req, res) => {
  try {
    const { limite = 10 } = req.query;
    const contatosPendentes = await obterContatosPendentes(parseInt(limite));

    res.json({
      sucesso: true,
      contatos: contatosPendentes,
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};

export const registrarLigacaoHandler = async (req, res) => {
  try {
    const { contatoId, resultado, observacao, duracao, proximaLigacao } = req.body;

    if (!contatoId || !resultado) {
      return res.status(400).json({ 
        sucesso: false,
        erro: 'contatoId e resultado são obrigatórios' 
      });
    }

    // Registrar ligação
    await criarRegistroLigacao({
      contato_id: contatoId,
      operador_id: req.userId,
      resultado,
      observacao: observacao || '',
      duracao: duracao || null,
      proximaLigacao: proximaLigacao || null,
    });

    // Atualizar contato
    await atualizarContato(contatoId, {
      status: resultado === 'conectado' ? 'ligado' : 'em_progresso',
      ultimaLigacao: new Date(),
      proximaLigacao: proximaLigacao || null,
      tentativas: (await obterContatoPorId(contatoId)).tentativas + 1,
    });

    res.json({
      sucesso: true,
      mensagem: 'Ligação registrada com sucesso',
    });
  } catch (error) {
    res.status(500).json({ 
      sucesso: false,
      erro: error.message 
    });
  }
};
