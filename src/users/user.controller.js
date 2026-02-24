import { updateProfileHelper } from '../../helpers/user.helper.js';
import Post from '../posts/post.model.js';
import Comment from '../comments/comment.model.js';
import User from '../users/user.model.js'

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...data } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado en la base de datos'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado',
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el perfil',
            error: error.message
        });
    }
};

export const getUserHistory = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const [posts, comments] = await Promise.all([
            Post.find({ authorId: id, status: true }),
            Comment.find({ authorId: id, status: true })
        ]);

        res.status(200).json({
            success: true,
            user: {
                username: user.username,
                uid: user._id
            },
            totalPosts: posts.length,
            totalComments: comments.length,
            posts,
            comments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el historial del usuario',
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOneAndUpdate(
            { _id: id, status: true },
            { status: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'El usuario no existe o ya ha sido desactivado previamente'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cuenta de usuario desactivada correctamente',
            user: {
                username: user.username,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al intentar desactivar el usuario',
            error: error.message
        });
    }
    if (req.usuario.id !== id) {
        return res.status(401).json({
            success: false,
            message: 'No tienes permiso para desactivar esta cuenta'
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        // por si quiero definir limite en la ruta
        const { limit = 10, from = 0 } = req.query;
        const query = {status: true}; 

        const [ total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .select('-password -__v') // ocultar contra
        ]);

        res.status(200).json({
            success: true,
            message: 'Lista de usuarios obtenida correctamente',
            total,
            users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la lista de usuarios',
            error: error.message
        });
    }

};