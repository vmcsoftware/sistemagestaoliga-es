import { getFirebaseDb } from '../../config/database.js';

export const historicoRef = () => getFirebaseDb().collection('historico_ligacoes');

export const criarRegistroLigacao = async (dados) => {
  try {
    const docRef = await historicoRef().add({
      contato_id: dados.contato_id,
      operador_id: dados.operador_id,
      data: new Date(),
      resultado: dados.resultado,
      observacao: dados.observacao || '',
      duracao: dados.duracao || null,
      proximaLigacao: dados.proximaLigacao || null,
      createdAt: new Date(),
    });
    
    return { id: docRef.id, ...dados };
  } catch (error) {
    throw error;
  }
};

export const obterHistoricoContato = async (contatoId) => {
  try {
    const snapshot = await historicoRef()
      .where('contato_id', '==', contatoId)
      .orderBy('data', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const obterHistoricoOperador = async (operadorId, dataInicio = null, dataFim = null) => {
  try {
    let query = historicoRef().where('operador_id', '==', operadorId);
    
    if (dataInicio) {
      query = query.where('data', '>=', dataInicio);
    }
    
    if (dataFim) {
      query = query.where('data', '<=', dataFim);
    }
    
    const snapshot = await query.orderBy('data', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const obterEstatisticasOperador = async (operadorId, dataInicio = null, dataFim = null) => {
  try {
    const historico = await obterHistoricoOperador(operadorId, dataInicio, dataFim);
    
    const stats = {
      totalLigacoes: historico.length,
      sucessos: historico.filter(h => h.resultado === 'success').length,
      insucessos: historico.filter(h => 
        ['insucesso', 'numero_invalido', 'nao_atendeu'].includes(h.resultado)
      ).length,
      agendados: historico.filter(h => h.resultado === 'agendado').length,
      taxaSucesso: 0,
    };
    
    if (stats.totalLigacoes > 0) {
      stats.taxaSucesso = Math.round((stats.sucessos / stats.totalLigacoes) * 100);
    }
    
    return stats;
  } catch (error) {
    throw error;
  }
};

export const obterRankingOperadores = async (limite = 5) => {
  try {
    const snapshot = await historicoRef().get();
    const registros = snapshot.docs.map(doc => doc.data());
    
    const operadores = {};
    registros.forEach(reg => {
      if (!operadores[reg.operador_id]) {
        operadores[reg.operador_id] = {
          operador_id: reg.operador_id,
          totalLigacoes: 0,
          sucessos: 0,
          insucessos: 0,
          agendados: 0,
        };
      }
      
      operadores[reg.operador_id].totalLigacoes++;
      
      if (reg.resultado === 'success') {
        operadores[reg.operador_id].sucessos++;
      } else if (['insucesso', 'numero_invalido', 'nao_atendeu'].includes(reg.resultado)) {
        operadores[reg.operador_id].insucessos++;
      } else if (reg.resultado === 'agendado') {
        operadores[reg.operador_id].agendados++;
      }
    });
    
    const ranking = Object.values(operadores)
      .sort((a, b) => b.sucessos - a.sucessos)
      .slice(0, limite)
      .map(op => ({
        ...op,
        taxaSucesso: op.totalLigacoes > 0 ? Math.round((op.sucessos / op.totalLigacoes) * 100) : 0,
      }));
    
    return ranking;
  } catch (error) {
    throw error;
  }
};

export const obterLigacoesHoje = async (operadorId = null) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    
    let query = historicoRef().where('data', '>=', hoje).where('data', '<', amanha);
    
    if (operadorId) {
      query = query.where('operador_id', '==', operadorId);
    }
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const deletarRegistroLigacao = async (id) => {
  try {
    await historicoRef().doc(id).delete();
    return true;
  } catch (error) {
    throw error;
  }
};
