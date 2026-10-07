// Centraliza los arrays de reglas de validación usando express-validator.

import { body, param } from 'express-validator';
import { UserModel, TagModel, ArticleModel } from '../models/index.js';

// Validar ID en parámetros de URL[cite: 5, 14]
export const validateIdParam = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
];

// Validaciones de Registro[cite: 14]
export const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres')
    .isAlphanumeric().withMessage('El nombre de usuario debe ser alfanumérico')
    .custom(async (value) => {
      const user = await UserModel.findOne({ where: { username: value } });
      if (user) throw new Error('El nombre de usuario ya está en uso');
      return true;
    }),
  body('email')
    .isEmail().withMessage('Debe proporcionar un email válido')
    .custom(async (value) => {
      const user = await UserModel.findOne({ where: { email: value } });
      if (user) throw new Error('El correo electrónico ya está registrado');
      return true;
    }),
  body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe contener al menos una mayúscula')
    .matches(/[a-z]/).withMessage('Debe contener al menos una minúscula')
    .matches(/[0-9]/).withMessage('Debe contener al menos un número'),
  body('first_name').notEmpty().withMessage('El nombre es obligatorio'),
  body('last_name').notEmpty().withMessage('El apellido es obligatorio')
];

// Validaciones de Login[cite: 14, 32]
export const loginValidation = [
  body('username').notEmpty().withMessage('El usuario es obligatorio'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

// Validaciones de Artículos (Uso opcional en PUT mediante .optional())[cite: 8, 14]
export const articleValidation = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 200 }).withMessage('El título debe tener entre 3 y 200 caracteres'),
  body('content')
    .notEmpty().withMessage('El contenido es obligatorio')
    .isLength({ min: 50 }).withMessage('El contenido debe tener al menos 50 caracteres'),
  body('excerpt').optional().isLength({ max: 500 }).withMessage('El resumen no puede superar 500 caracteres'),
  body('status').optional().isIn(['published', 'archived']).withMessage('Estado no válido')
];

export const articleUpdateValidation = [
  body('title').optional().isLength({ min: 3, max: 200 }).withMessage('Título inválido'),
  body('content').optional().isLength({ min: 50 }).withMessage('Contenido corto'),
  body('excerpt').optional().isLength({ max: 500 }),
  body('status').optional().isIn(['published', 'archived'])
];

// Validaciones de Etiquetas[cite: 12, 14]
export const tagValidation = [
  body('name')
    .notEmpty().withMessage('El nombre de la etiqueta es obligatorio')
    .isLength({ min: 2, max: 30 }).withMessage('El nombre debe tener entre 2 y 30 caracteres')
    .custom(async (value) => {
      const tag = await TagModel.findOne({ where: { name: value } });
      if (tag) throw new Error('La etiqueta ya existe');
      return true;
    })
];