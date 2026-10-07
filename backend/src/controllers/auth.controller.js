// Registro, login, logout y consulta del perfil con JWT en cookies

import { UserModel, ProfileModel } from '../models/index.js';
import { hashPassword, comparePassword } from '../helpers/bcrypt.helper.js';
import { generateToken } from '../helpers/jwt.helper.js';

// Registrar usuario y crear su perfil automáticamente[cite: 15, 50]
export const register = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name, biography, avatar_url, birth_date } = req.body;

    const hashedPassword = await hashPassword(password);

    // Crear el usuario[cite: 50]
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword
    });

    // Crear su perfil asociado 1:1[cite: 11, 15]
    await ProfileModel.create({
      user_id: newUser.id,
      first_name,
      last_name,
      biography: biography || null,
      avatar_url: avatar_url || null,
      birth_date: birth_date || null
    });

    return res.status(201).json({ message: 'Usuario y perfil creados exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
  }
};

// Inicio de sesión y envío de Cookie segura HttpOnly[cite: 10, 15, 45, 51]
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar Token JWT[cite: 45]
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role
    });

    // Establecer la Cookie HttpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true en entornos HTTPS de producción[cite: 46]
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000 // 2 horas
    });

    return res.status(200).json({ message: 'Login exitoso', user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
  }
};

// Cerrar Sesión[cite: 10, 15, 47]
export const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

// Obtener información del perfil del usuario autenticado[cite: 15, 47]
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: ProfileModel, as: 'profile' }]
    });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};

// Actualizar perfil del usuario logueado[cite: 15]
export const updateProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ where: { user_id: req.user.id } });
    if (!profile) return res.status(404).json({ message: 'Perfil no encontrado' });

    await profile.update(req.body);
    return res.status(200).json({ message: 'Perfil actualizado con éxito', profile });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
  }
};