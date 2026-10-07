import bcrypt, { hash } from 'bcrypt';

// Funciones auxiliares para hashear y comparar contraseñas

// Hashea la contraseña en texto plano antes de guardar en la BD[cite: 50]
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Compara una contraseña enviada con el hash guardado[cite: 50]
export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};