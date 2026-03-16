import { contarContatosPorStatus, obterContatosPendentes } from '../models/ContatoFirebase.js';
import { 
  obterLigacoesHoje, 
  obterEstatisticasOperador, 
  obterRankingOperadores,
  obterHistoricoOperador 
} from '../models/HistoricoLigacaoFirebase.js';
import { obterUsuarioPorId } from '../models/UsuarioFirebase.js';

export const obterDashboard = async (req, res) => {
  try {
    const usuarioId = req.userId;

    // Total de contatos
    const contadores = await contarContatosPorStatus();
    const totalContatos = contadores.total;

    // Ligações realizadas hoje
    const ligacoesHoje = await obterLigacoesHoje(usuarioId);
    const ligacoesSucesso = ligacoesHoje.filter(l => l.resultado === 'success').length;
    const ligacoesSemSucesso = ligacoesHoje.filter(l => 
      ['insucesso', 'numero_invalido', 'nao_atendeu'].includes(l.resultado)
    ).length;

    // Contatos pendentes
    const contatosPendentes = await obterContatosPendentes();
    const quantidadePendentes = contatosPendentes.length;

    // Dados para gráfico - últimos 7 dias
    const ultimosDias = [];
    for (let i = 6; i >= 0; i--) {
      const data = new Date();
      data.setDate(data.getDate() - i);
      const proximaData = new Date(data);
      proximaData.setDate(proximaData.getDate() + 1);

      const historicoData = await obterLigacoesHoje(usuarioId);
      const ligaca = historicoData.filter(l => {
        const dataLig = new Date(l.data);
        return dataLig >= data && dataLig < proximaData;
      }).length;

      ultimosDias.push({
        data: data.toLocaleDateString('pt-BR'),
        ligacoes: ligaca,
      });
    }

    // Rank de operadores
    const ranking = await obterRankingOperadores(5);

    res.json({
      sucesso: true,
      metricas: {
        totalContatos,
        ligacoesHoje: ligacoesHoje.length,
        ligacoesSucesso,
        ligacoesSemSucesso,
        contatosPendentes: quantidadePendentes,
        taxaSucesso: ligacoesHoje.length > 0 ? Math.round((ligacoesSucesso / ligacoesHoje.length) * 100) : 0,
      },
      graficosLigacoes: ultimosDias,
      ranking: ranking.map(r => ({
        ...r,
        operador: [{ nome: 'Operador ' + r.operador_id }],
      })),
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const gerarRelatorioOperador = async (req, res) => {
  try {
    const { operadorId, dataInicio, dataFim } = req.query;

    let dataInicioObj = null;
    let dataFimObj = null;

    if (dataInicio) dataInicioObj = new Date(dataInicio);
    if (dataFim) {
      dataFimObj = new Date(dataFim);
      dataFimObj.setDate(dataFimObj.getDate() + 1);
    }

    if (operadorId) {
      const stats = await obterEstatisticasOperador(operadorId, dataInicioObj, dataFimObj);
      const usuario = await obterUsuarioPorId(operadorId);

      res.json({
        sucesso: true,
        relatorio: [{
          ...stats,
          operador: usuario?.nome || 'Desconhecido',
        }],
      });
    } else {
      const ranking = await obterRankingOperadores(100);
      const relatorio = await Promise.all(
        ranking.map(async (op) => {
          const usuario = await obterUsuarioPorId(op.operador_id);
          return {
            ...op,
            operador: usuario?.nome || 'Desconhecido',
          };
        })
      );

      res.json({
        sucesso: true,
        relatorio,
      });
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const gerarRelatorioContatosTrabalhados = async (req, res) => {
  try {
    const { dataInicio, dataFim, status } = req.query;

    const filtros = {};
    if (status) filtros.status = status;

    const { listarContatos } = await import('../models/ContatoFirebase.js');
    const contatos = await listarContatos(filtros);

    let contatosFiltrados = contatos;

    if (dataInicio || dataFim) {
      const dataI = dataInicio ? new Date(dataInicio) : null;
      const dataF = dataFim ? new Date(dataFim) : null;

      contatosFiltrados = contatos.filter(c => {
        const dataLig = c.ultimaLigacao ? new Date(c.ultimaLigacao) : null;
        if (!dataLig) return false;

        if (dataI && dataLig < dataI) return false;
        if (dataF && dataLig > dataF) return false;

        return true;
      });
    }

    res.json({
      sucesso: true,
      contatos: contatosFiltrados,
      total: contatosFiltrados.length,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const obterAlertas = async (req, res) => {
  try {
    const alertas = [];

    const { contarContatosPorStatus, obterContatosPendentes } = await import('../models/ContatoFirebase.js');
    const contadores = await contarContatosPorStatus();
    const pendentes = await obterContatosPendentes();

    // Contatos não trabalhados
    if (contadores.nao_ligado > 0) {
      alertas.push({
        tipo: 'nao_trabalhados',
        titulo: 'Contatos não ligados',
        mensagem: `Você tem ${contadores.nao_ligado} contatos que ainda não foram ligados`,
        icone: '📞',
        prioridade: 'alta',
      });
    }

    // Contatos com agendamento vencido
    const agendadosVencidos = pendentes.filter(c => c.status === 'agendado').length;
    if (agendadosVencidos > 0) {
      alertas.push({
        tipo: 'agendamentos_vencidos',
        titulo: 'Agendamentos pendentes',
        mensagem: `${agendadosVencidos} contatos estão aguardando retorno`,
        icone: '⏰',
        prioridade: 'alta',
      });
    }

    res.json({
      sucesso: true,
      alertas,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
