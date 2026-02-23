import { registerHelper } from '../../helpers/auth.helper.js';


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