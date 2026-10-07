// Verifica que el usuario tenga el rol de 'admin'.

export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso prohibido. Se requiere rol de Administrador.' });
  }
  next();
};