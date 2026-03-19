import admin from 'firebase-admin';

const db = admin.firestore();

// === USUARIOS ===

export const criarUsuario = async (usuarioData) => {
  try {
    const docRef = await db.collection('usuarios').add({
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
    const snapshot = await db.collection('usuarios')
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
    const doc = await db.collection('usuarios').doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};

export const atualizarUsuario = async (id, dados) => {
  try {
    await db.collection('usuarios').doc(id).update({
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
    let query = db.collection('usuarios');
    
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
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();
    
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
