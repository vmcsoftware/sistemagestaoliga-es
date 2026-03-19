import admin from 'firebase-admin';

const db = admin.firestore();

// === HISTÓRICO DE LIGAÇÕES ===

export const criarRegistroLigacao = async (dados) => {
  try {
    const docRef = await db.collection('historico_ligacoes').add({
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
    const snapshot = await db.collection('historico_ligacoes')
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
    let query = db.collection('historico_ligacoes').where('operador_id', '==', operadorId);
    
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
      ligacoesConectadas: historico.filter(h => h.resultado === 'conectado').length,
      ligacoesNaoConectadas: historico.filter(h => h.resultado === 'nao_conectado').length,
      duracaoMedia: historico.reduce((acc, h) => acc + (h.duracao || 0), 0) / historico.length || 0,
    };
    
    return stats;
  } catch (error) {
    throw error;
  }
};

export const obterEstatisticasGerais = async (dataInicio = null, dataFim = null) => {
  try {
    let query = db.collection('historico_ligacoes');
    
    if (dataInicio) {
      query = query.where('data', '>=', dataInicio);
    }
    
    if (dataFim) {
      query = query.where('data', '<=', dataFim);
    }
    
    const snapshot = await query.get();
    const historico = snapshot.docs.map(doc => doc.data());
    
    const stats = {
      totalLigacoes: historico.length,
      ligacoesConectadas: historico.filter(h => h.resultado === 'conectado').length,
      operadoresAtivos: new Set(historico.map(h => h.operador_id)).size,
      duracaoMedia: historico.reduce((acc, h) => acc + (h.duracao || 0), 0) / historico.length || 0,
    };
    
    return stats;
  } catch (error) {
    throw error;
  }
};
