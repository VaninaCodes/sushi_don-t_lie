// Administración de usuarios con eliminación lógica

import { UserModel, ProfileModel, ArticleModel } from '../models/index.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: ProfileModel, as: 'profile' }]
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: ProfileModel, as: 'profile' },
        { model: ArticleModel, as: 'articles' }
      ]
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// Eliminación lógica del usuario[cite: 7, 13]
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.destroy(); // Con paranoid: true, ejecuta el borrado lógico[cite: 7]
    return res.status(200).json({ message: 'Usuario eliminado lógicamente de forma correcta' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};