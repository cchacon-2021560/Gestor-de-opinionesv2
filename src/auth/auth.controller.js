import { registerHelper, verifyAccountHelper, loginHelper } from '../../helpers/auth.helper.js';

export const register = async (req, res) => {
    try {
        const userData = req.body;
        
        
        const profilePictureUrl = req.file ? req.file.path : null;

        const result = await registerHelper(userData, profilePictureUrl);

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
};

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