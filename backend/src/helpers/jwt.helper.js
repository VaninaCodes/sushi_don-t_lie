import jwt from 'jsonwebtoken';

// Generación y verificación de tokens de autenticación JWT

// Genera un token firmado con los datos elegidos y una duración determinada
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h'});
};

// Verifica la autenticidad y vigencia del token enviado
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};