// Entrada principal del servidor con configuración CORS para credenciales (credentials: true)

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { sequelize } from './src/config/database.js';

// Importar rutas
import { authRoutes } from './src/routes/auth.routes.js';
import { articleRoutes } from './src/routes/article.routes.js';
import { tagRoutes } from './src/routes/tag.routes.js';
import { userRoutes } from './src/routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS habilitando cookies seguras[cite: 11, 19, 44]
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Permite la transmisión de Cookies[cite: 19, 44]
}));

app.use(express.json());
app.use(cookieParser()); // Parser de cookies para leer req.cookies[cite: 11, 44]

// Montar Rutas
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);

// Iniciar base de datos y servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a la base de datos establecida correctamente.');
    
    // Sincronizar modelos
    await sequelize.sync({ force: false });
    
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Error de conexión con la Base de Datos:', error);
  }
};

startServer();