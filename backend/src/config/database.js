import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno definidas en el archivo .env 
dotenv.config();

// Instanciar Sequelize pasando los credenciales de conexion
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Desactivar logs SQL en la consola para una salida limpia
    }
);