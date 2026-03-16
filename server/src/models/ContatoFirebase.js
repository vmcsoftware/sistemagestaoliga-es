import { getFirebaseDb } from '../../config/database.js';
import { v4 as uuid } from 'uuid';

export const contatosRef = () => getFirebaseDb().collection('contatos');

export const criarContato = async (contatoData) => {
  try {
    const docRef = await contatosRef().add({
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
    const doc = await contatosRef().doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};

export const obterContatoPorCpfCnpj = async (cpfCnpj) => {
  try {
    const snapshot = await contatosRef()
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
    let query = contatosRef();
    
    if (filtros.status && filtros.status !== 'todos') {
      query = query.where('status', '==', filtros.status);
    }
    
    if (filtros.operador) {
      query = query.where('operador', '==', filtros.operador);
    }
    
    query = query.orderBy('createdAt', 'desc');
    
    const snapshot = await query.get();
    
    let contatos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Filtro por busca de texto (feito no cliente devido ao Firestore)
    if (filtros.busca) {
      const termo = filtros.busca.toLowerCase();
      contatos = contatos.filter(c =>
        c.nome.toLowerCase().includes(termo) ||
        c.cpfCnpj.includes(termo) ||
        c.telefone1.includes(termo) ||
        (c.telefone2 && c.telefone2.includes(termo))
      );
    }
    
    return contatos;
  } catch (error) {
    throw error;
  }
};

export const atualizarContato = async (id, dados) => {
  try {
    await contatosRef().doc(id).update({
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
    await contatosRef().doc(id).delete();
    return true;
  } catch (error) {
    throw error;
  }
};

export const obterContatosPendentes = async () => {
  try {
    const snapshot = await contatosRef()
      .where('status', 'in', ['nao_ligado', 'agendado'])
      .orderBy('ultimaLigacao', 'asc')
      .get();
    
    const agora = new Date();
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(c => c.status === 'nao_ligado' || (c.proximaLigacao && new Date(c.proximaLigacao) <= agora));
  } catch (error) {
    throw error;
  }
};

export const contarContatosPorStatus = async () => {
  try {
    const snapshot = await contatosRef().get();
    const contatos = snapshot.docs.map(doc => doc.data());
    
    const contador = {
      total: contatos.length,
      nao_ligado: contatos.filter(c => c.status === 'nao_ligado').length,
      success: contatos.filter(c => c.status === 'success').length,
      insucesso: contatos.filter(c => c.status === 'insucesso').length,
      agendado: contatos.filter(c => c.status === 'agendado').length,
    };
    
    return contador;
  } catch (error) {
    throw error;
  }
};
