import { Router } from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/user.controller.js';
import { validateIdParam } from '../middlewares/validations.js';
import { validateResult } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

export const userRoutes = Router();

userRoutes.get('/', authMiddleware, adminMiddleware, getAllUsers);
userRoutes.get('/:id', authMiddleware, adminMiddleware, validateIdParam, validateResult, getUserById);
userRoutes.delete('/:id', authMiddleware, adminMiddleware, validateIdParam, validateResult, deleteUser);