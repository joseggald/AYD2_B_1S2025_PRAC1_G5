import jwt from 'jsonwebtoken';
import environment from '../config/environment';

const JWT_SECRET = environment.JWT.SECRET || 'default_secret';
const TOKEN_EXPIRATION = '1d'; // 1 día

export const generateAuthToken = (user: any): string => {
  const payload = {
    cod_empleado: user.cod_empleado,
    usuario: user.usuario,
    rol: user.rol
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};