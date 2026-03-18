import { 
  criarContato, 
  obterContatoPorId, 
  listarContatos as listarContatosBd, 
  atualizarContato, 
  deletarContato as deletarContatoBd,
  obterContatosPendentes as obterContatosPendentesBd,
  obterContatoPorCpfCnpj 
} from '../models/ContatoFirebase.js';
import { criarRegistroLigacao, obterHistoricoContato } from '../models/HistoricoLigacaoFirebase.js';
import { importarContatosXLSX } from '../utils/fileImport.js';
import fs from 'fs';

export const importarContatos = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Arquivo não fornecido' });
    }

    const filePath = req.file.path;
    const resultado = await importarContatosXLSX(filePath, req.userId);

    // Remover arquivo temporário
    fs.unlink(filePath, (err) => {
      if (err) console.error('Erro ao remover arquivo:', err);
    });

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const listarContatos = async (req, res) => {
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

    const contatos = await listarContatosBd(filtros);
    
    const total = contatos.length;
    const contatosPaginados = contatos.slice(skip, skip + parseInt(limite));

    res.json({
      sucesso: true,
      contatos: contatosPaginados,
      paginacao: {
        total,
        pagina: page,
        limite,
        totalPaginas: Math.ceil(total / limite),
      },
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const obterContato = async (req, res) => {
  try {
    const { id } = req.params;

    const contato = await obterContatoPorId(id);
    if (!contato) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    const historico = await obterHistoricoContato(id);

    res.json({
      sucesso: true,
      contato,
      historico,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const registrarLigacao = async (req, res) => {
  try {
    const { contatoId } = req.params;
    const { resultado, observacao, duracao, proximaLigacao } = req.body;

    if (!resultado) {
      return res.status(400).json({ erro: 'Resultado é obrigatório' });
    }

    const contato = await obterContatoPorId(contatoId);
    if (!contato) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    // Atualizar contato
    const contatoAtualizado = await atualizarContato(contatoId, {
      status: resultado,
      ultimaLigacao: new Date(),
      tentativas: (contato.tentativas || 0) + 1,
      observacoes: observacao,
      ...(proximaLigacao && { proximaLigacao: new Date(proximaLigacao) }),
    });

    // Registrar no histórico
    await criarRegistroLigacao({
      contato_id: contatoId,
      operador_id: req.userId,
      resultado,
      observacao,
      duracao,
      proximaLigacao: proximaLigacao ? new Date(proximaLigacao) : null,
    });

    res.json({
      sucesso: true,
      mensagem: 'Ligação registrada com sucesso',
      contato: contatoAtualizado,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizarStatusContato = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contato = await atualizarContato(id, { status });

    if (!contato) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    res.json({
      sucesso: true,
      contato,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const deletarContato = async (req, res) => {
  try {
    const { id } = req.params;

    const contato = await obterContatoPorId(id);
    if (!contato) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    await deletarContatoBd(id);

    res.json({
      sucesso: true,
      mensagem: 'Contato deletado com sucesso',
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const obterContatosPendentes = async (req, res) => {
  try {
    const contatos = await obterContatosPendentesBd();

    res.json({
      sucesso: true,
      contatos,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
