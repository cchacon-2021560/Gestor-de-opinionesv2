import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateJWT = (userId, extraClaims = {}) => {
    return new Promise((resolve, reject) => {
        const payload = {
            sub: String(userId),
            jti: crypto.randomUUID(),
            iat: Math.floor(Date.now() / 1000),
            ...extraClaims
        };

        const signOptions = {
            expiresIn: process.env.JWT_EXPIRES_IN || ' 10m',
            issuer: process.env.JWT_ISSUER || 'OpinionManager',
            audience: process.env.JWT_AUDIENCE || 'OpinionManagerUsers'
        };

        jwt.sign(payload, process.env.JWT_SECRET, signOptions, (err, token) => {
            if (err) {
                console.error('Error al generar el JWT:', err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};


export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Error al verificar el JWT:', err.message);
                reject('Token no válido');
            } else {
                resolve(decoded);
            }
        });
    });
};