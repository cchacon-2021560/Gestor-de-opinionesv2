import { updateProfileHelper } from '../../helpers/user.helper.js';

export const updateProfile = async (req, res) => {
    try {
        const { uid } = req.user; 
        const { oldPassword, ...updateData } = req.body;

        const user = await updateProfileHelper(uid, updateData, oldPassword);

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado correctamente',
            user
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};