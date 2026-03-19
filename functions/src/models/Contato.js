import admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';

const db = admin.firestore();

// === CONTATOS ===

export const criarContato = async (contatoData) => {
  try {
    const docRef = await db.collection('contatos').add({
      nome: contatoData.nome,
      cpfCnpj: contatoData.cpfCnpj,
      telefone1: contatoData.telefone1,
      telefone2: contatoData.telefone2 || null,
      email: contatoData.email || null,
      endereco: contatoData.endereco || null,
      status: contatoData.status || 'nao_ligado',
      ultimaLigacao: contatoData.ultimaLigacao || null,
      proximaLigacao: contatoData.proximaLigacao || null,
      observacoes: contatoData.observacoes || '',
      operador: contatoData.operador || null,
      tentativas: contatoData.tentativas || 0,
      importacao_id: contatoData.importacao_id || uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return { id: docRef.id, ...contatoData };
  } catch (error) {
    throw error;
  }
};

export const obterContatoPorId = async (id) => {
  try {
    const doc = await db.collection('contatos').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};

export const obterContatoPorCpfCnpj = async (cpfCnpj) => {
  try {
    const snapshot = await db.collection('contatos')
      .where('cpfCnpj', '==', cpfCnpj)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};

export const listarContatos = async (filtros = {}) => {
  try {
    let query = db.collection('contatos');
    
    if (filtros.status && filtros.status !== 'todos') {
      query = query.where('status', '==', filtros.status);
    }
    
    if (filtros.operador) {
      query = query.where('operador', '==', filtros.operador);
    }
    
    query = query.orderBy('createdAt', 'desc');
    
    const snapshot = await query.get();
    
    let contatos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Filtro por busca de texto
    if (filtros.busca) {
      const termo = filtros.busca.toLowerCase();
      contatos = contatos.filter(c =>
        c.nome.toLowerCase().includes(termo) ||
        c.cpfCnpj.includes(termo) ||
        c.telefone1.includes(termo)
      );
    }
    
    return contatos;
  } catch (error) {
    throw error;
  }
};

export const atualizarContato = async (id, dados) => {
  try {
    await db.collection('contatos').doc(id).update({
      ...dados,
      updatedAt: new Date(),
    });
    return obterContatoPorId(id);
  } catch (error) {
    throw error;
  }
};

export const deletarContato = async (id) => {
  try {
    await db.collection('contatos').doc(id).delete();
    return { sucesso: true };
  } catch (error) {
    throw error;
  }
};

export const obterContatosPendentes = async (limite = 10) => {
  try {
    const snapshot = await db.collection('contatos')
      .where('status', 'in', ['nao_ligado', 'em_progresso'])
      .orderBy('proximaLigacao', 'asc')
      .limit(limite)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};
