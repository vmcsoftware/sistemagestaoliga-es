import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';

export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};
