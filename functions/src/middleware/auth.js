import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new Error('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new Error('Token inválido');
    }

    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    throw new Error(`Autenticação falhou: ${error.message}`);
  }
};

export const requiredAuth = (handler) => {
  return async (req, res) => {
    try {
      const user = authMiddleware(req);
      req.userId = user.id;
      req.userRole = user.role;
      return handler(req, res);
    } catch (error) {
      res.status(401).json({
        sucesso: false,
        erro: error.message
      });
    }
  };
};
