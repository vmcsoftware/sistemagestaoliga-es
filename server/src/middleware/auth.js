import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const autenticar = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};

export const autorizarRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }
    next();
  };
};
