import { verifyJWT } from '../helpers/generate-jwt.js';
import User from '../src/users/user.model.js';

export const validateJWT = async (req, res, next) => {
    try {
        const token = req.header('x-token') || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No hay token en la petición' });
        }

        const { sub } = await verifyJWT(token);
        const user = await User.findById(sub);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no existe en la base de datos' });
        }

        if (!user.status) {
            return res.status(401).json({ message: 'Token no válido - usuario inactivo' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Cuenta no verificada' });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Token no válido o expirado' });
    }
};