import { Router } from 'express';
import { getAllTags, getTagById, createTag, updateTag, deleteTag } from '../controllers/tag.controller.js';
import { tagValidation, validateIdParam } from '../middlewares/validations.js';
import { validateResult } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

export const tagRoutes = Router();

tagRoutes.get('/', authMiddleware, getAllTags);
tagRoutes.get('/:id', authMiddleware, adminMiddleware, validateIdParam, validateResult, getTagById);
tagRoutes.post('/', authMiddleware, adminMiddleware, tagValidation, validateResult, createTag);
tagRoutes.put('/:id', authMiddleware, adminMiddleware, validateIdParam, tagValidation, validateResult, updateTag);
tagRoutes.delete('/:id', authMiddleware, adminMiddleware, validateIdParam, validateResult, deleteTag);