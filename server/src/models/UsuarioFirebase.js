import { getFirebaseDb, getFirebaseAuth } from '../../config/database.js';
import { hashPassword, comparePassword } from '../utils/validators.js';

export const usuariosRef = () => getFirebaseDb().collection('usuarios');

export const criarUsuario = async (usuarioData) => {
  try {
    const docRef = await usuariosRef().add({
      nome: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      role: usuarioData.role || 'operador',
      ativo: true,
      meta: usuarioData.meta || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...usuarioData };
  } catch (error) {
    throw error;
  }
};

export const obterUsuarioPorEmail = async (email) => {
  try {
    const snapshot = await usuariosRef()
      .where('email', '==', email)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};

export const obterUsuarioPorId = async (id) => {
  try {
    const doc = await usuariosRef().doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};

export const atualizarUsuario = async (id, dados) => {
  try {
    await usuariosRef().doc(id).update({
      ...dados,
      updatedAt: new Date(),
    });
    return obterUsuarioPorId(id);
  } catch (error) {
    throw error;
  }
};

export const listarUsuarios = async (filtros = {}) => {
  try {
    let query = usuariosRef();
    
    if (filtros.role) {
      query = query.where('role', '==', filtros.role);
    }
    
    if (filtros.ativo !== undefined) {
      query = query.where('ativo', '==', filtros.ativo);
    }
    
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const verificarEmailExistente = async (email, excluirId = null) => {
  try {
    let query = usuariosRef().where('email', '==', email);
    const snapshot = await query.get();
    
    if (snapshot.empty) return false;
    
    if (excluirId) {
      const existe = snapshot.docs.some(doc => doc.id !== excluirId);
      return existe;
    }
    
    return true;
  } catch (error) {
    throw error;
  }
};
