// CRUD completo de Artículos con verificación de autor o rol de administrador

import { ArticleModel, UserModel, TagModel } from '../models/index.js';
import { matchedData } from 'express-validator';

// Obtener todos los artículos publicados (Acceso Público / Usuario)
export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      where: { status: 'published' },
      include: [
        { model: UserModel, as: 'author', attributes: ['id', 'username', 'email'] },
        { model: TagModel, as: 'tags', through: { attributes: [] } }
      ]
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener artículos', error: error.message });
  }
};

// Obtener artículo por ID[cite: 13, 14]
export const getArticleById = async (req, res) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id, {
      include: [
        { model: UserModel, as: 'author', attributes: ['id', 'username'] },
        { model: TagModel, as: 'tags', through: { attributes: [] } }
      ]
    });

    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener artículo', error: error.message });
  }
};

// Crear Artículo[cite: 13, 14]
export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, status } = req.body;

    const newArticle = await ArticleModel.create({
      title,
      content,
      excerpt: excerpt || null,
      status: status || 'published',
      user_id: req.user.id
    });

    return res.status(201).json({ message: 'Artículo creado con éxito', article: newArticle });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear artículo', error: error.message });
  }
};

// Actualizar Artículo (Solo el autor o Admin)[cite: 8, 14, 15, 35]
export const updateArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });

    // Verificar permisos
    if (article.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tiene permiso para editar este artículo' });
    }

    // matchedData obtiene únicamente los datos validados[cite: 8, 35]
    const cleanData = matchedData(req);
    await article.update(cleanData);

    return res.status(200).json({ message: 'Artículo actualizado correctamente', article });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar artículo', error: error.message });
  }
};

// Eliminar Artículo[cite: 7, 14, 15]
export const deleteArticle = async (req, res) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });

    if (article.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tiene autorización para eliminar este artículo' });
    }

    await article.destroy();
    return res.status(200).json({ message: 'Artículo eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar artículo', error: error.message });
  }
};