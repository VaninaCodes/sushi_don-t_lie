import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

// Modelo de Etiqueta (Relacion N:M con Article)

export const TagModel = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});