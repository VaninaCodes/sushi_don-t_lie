// Captura los errores de validación de express-validator y responde con HTTP 400 Bad Request si existen

import { validationResult } from 'express-validator';

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores de validación, retornar HTTP 400[cite: 5, 30]
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};