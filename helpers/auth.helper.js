import User from '../src/users/user.model.js';
import { hash } from 'argon2'; 
import crypto from 'crypto';
import { sendVerificationEmail } from './email-service.js';

export const registerHelper = async (userData, profilePictureUrl = null) => {
    try {
        const { password, email, ...rest } = userData;

        const hashedPassword = await hash(password);

        const verificationToken = crypto.randomBytes(20).toString('hex');

        const newUser = new User({
            ...rest,
            email,
            password: hashedPassword,
            profilePicture: profilePictureUrl,
            verificationToken,
            isVerified: false
        });

        await newUser.save();

        sendVerificationEmail(newUser.email, newUser.name, verificationToken)
            .catch(err => console.error('Error al enviar correo:', err.message));

        return {
            success: true,
            message: 'Usuario registrado. Por favor, verifica tu correo electrónico.',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        };

    } catch (error) {
        if (error.code === 11000) {
            throw new Error('El nombre de usuario o correo ya está en uso.');
        }
        throw error;
    }
};

export const verifyAccountHelper = async (token) => {
    // Buscar usuario que coincida con el token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        throw new Error('Token de verificación inválido o expirado.');
    }

    // Actualizar estado y limpiar el token para que no se use dos veces
    user.isVerified = true;
    user.verificationToken = undefined; 
    await user.save();

    return {
        success: true,
        message: `Cuenta de ${user.username} verificada exitosamente.`
    };
};