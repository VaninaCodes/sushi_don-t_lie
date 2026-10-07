// Lógica CRUD para Etiquetas

import { TagModel, ArticleModel } from '../models/index.js';

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll();
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener etiquetas', error: error.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await TagModel.findByPk(req.params.id, {
      include: [{ model: ArticleModel, as: 'articles', through: { attributes: [] } }]
    });
    if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada' });
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener etiqueta', error: error.message });
  }
};

export const createTag = async (req, res) => {
  try {
    const newTag = await TagModel.create({ name: req.body.name });
    return res.status(201).json({ message: 'Etiqueta creada', tag: newTag });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear etiqueta', error: error.message });
  }
};

export const updateTag = async (req, res) => {
  try {
    const tag = await TagModel.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada' });

    await tag.update({ name: req.body.name });
    return res.status(200).json({ message: 'Etiqueta actualizada', tag });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar etiqueta', error: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await TagModel.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada' });

    await tag.destroy();
    return res.status(200).json({ message: 'Etiqueta eliminada' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar etiqueta', error: error.message });
  }
};