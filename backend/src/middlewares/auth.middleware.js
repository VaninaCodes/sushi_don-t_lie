// Verifica que la petición incluya una cookie token válida

import { verifyToken } from '../helpers/jwt.helper.js';

export const authMiddleware = (req, res, next) => {
  try {
    // Leer la cookie llamada "token"[cite: 46]
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No autenticado.' });
    }

    // Verificar el token recibido[cite: 46]
    const decoded = verifyToken(token);
    req.user = decoded; // Adjuntar la información decodificada a la petición[cite: 46]
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};