import { UserModel } from './user.model.js';
import { ProfileModel } from './profile.model.js';
import { ArticleModel } from './article.model.js';
import { TagModel } from './tag.model.js';
import { ArticleTagModel } from './articleTag.model.js';

// Tabla intermedia para la relación N:M entre Article y Tag

// Relación 1:1 (User ↔ Profile)[cite: 12, 13, 24]
UserModel.hasOne(ProfileModel, { foreignKey: 'user_id', as: 'profile', onDelete: 'CASCADE' });
ProfileModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

// Relación 1:N (User → Article)[cite: 12, 13, 24]
UserModel.hasMany(ArticleModel, { foreignKey: 'user_id', as: 'articles', onDelete: 'CASCADE' });
ArticleModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'author' });

// Relación N:M (Article ↔ Tag a través de ArticleTag)[cite: 12, 13, 24]
ArticleModel.belongsToMany(TagModel, { 
  through: ArticleTagModel, 
  foreignKey: 'article_id', 
  as: 'tags', 
  onDelete: 'CASCADE' 
});
TagModel.belongsToMany(ArticleModel, { 
  through: ArticleTagModel, 
  foreignKey: 'tag_id', 
  as: 'articles', 
  onDelete: 'CASCADE' 
});

// Exportar todos los modelos vinculados
export {
  UserModel,
  ProfileModel,
  ArticleModel,
  TagModel,
  ArticleTagModel
};