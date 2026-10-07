import { Router } from 'express';
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../controllers/article.controller.js';
import { articleValidation, articleUpdateValidation, validateIdParam } from '../middlewares/validations.js';
import { validateResult } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const articleRoutes = Router();

articleRoutes.get('/', authMiddleware, getAllArticles);
articleRoutes.get('/:id', authMiddleware, validateIdParam, validateResult, getArticleById);
articleRoutes.post('/', authMiddleware, articleValidation, validateResult, createArticle);
articleRoutes.put('/:id', authMiddleware, validateIdParam, articleUpdateValidation, validateResult, updateArticle);
articleRoutes.delete('/:id', authMiddleware, validateIdParam, validateResult, deleteArticle);