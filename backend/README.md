# Guia
###  1. Iniciar el proyecto
    npm init -y
### 2. Instalamos las dependencias
    npm install express sequelize mysql2 cors dotenv jsonwebtoken bcrypt cookie-parser express-validator
### 3. Cambiamos a modulos
    "type":"module"
### 4. Archivo .gitignore
    node_modules
    .env
### 5. Archivo .env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_password
    DB_NAME=nombre_db
    JWT_SECRET=una_clave_larga_y_secreta