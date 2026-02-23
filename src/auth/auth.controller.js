import { registerHelper, verifyAccountHelper, loginHelper } from '../../helpers/auth.helper.js';
import User from '../users/user.model.js';
import { hash } from 'argon2';

export const register = async (req, res) => {
    try {
        const { email, username, password, ...rest } = req.body;
        const profilePictureUrl = req.file ? req.file.path : null;

        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            if (existingUser.status === false) {
                existingUser.status = true;
                existingUser.password = await hash(password); 
                existingUser.username = username;
                existingUser.email = email;
                existingUser.profilePicture = profilePictureUrl;
                Object.assign(existingUser, rest);

                await existingUser.save();

                return res.status(200).json({
                    success: true,
                    message: "Cuenta existente reactivada con éxito. Por favor, verifica tu correo.",
                    user: existingUser
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "El correo o username ya está en uso por una cuenta activa."
                });
            }
        }

        const result = await registerHelper(req.body, profilePictureUrl);

        return res.status(201).json({
            success: true,
            message: result.message,
            user: result.user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error al registrar el usuario'
        });
    }
}

export const verifyAccount = async (req, res) => {
    try {
        const { token } = req.params;
        const result = await verifyAccountHelper(token);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginHelper(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};