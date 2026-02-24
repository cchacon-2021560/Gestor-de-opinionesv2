import { hash, verify } from 'argon2';
import User from '../src/users/user.model.js';

export const updateProfileHelper = async (uid, updateData, oldPassword) => {
    const user = await User.findById(uid);

    if (updateData.password) {
        if (!oldPassword) {
            throw new Error('Debes proporcionar la contraseña anterior para cambiarla.');
        }

        const isPasswordValid = await verify(user.password, oldPassword);
        if (!isPasswordValid) {
            throw new Error('La contraseña anterior es incorrecta.');
        }

        updateData.password = await hash(updateData.password);
    }

    const updatedUser = await User.findByIdAndUpdate(uid, updateData, { new: true });
    return updatedUser;
};