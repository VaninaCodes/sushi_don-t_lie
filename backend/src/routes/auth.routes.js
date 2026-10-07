import { Router } from 'express';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation } from '../middlewares/validations.js';
import { validateResult } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const authRoutes = Router();

authRoutes.post('/register', registerValidation, validateResult, register);
authRoutes.post('/login', loginValidation, validateResult, login);
authRoutes.post('/logout', authMiddleware, logout);
authRoutes.get('/profile', authMiddleware, getProfile);
authRoutes.put('/profile', authMiddleware, updateProfile);