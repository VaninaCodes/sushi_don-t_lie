import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

// Tabla intermedia para la relación N:M entre Article y Tag

export const ArticleTagModel = sequelize.define('ArticleTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'article_tags',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});