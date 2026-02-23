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
            Post.find({ authorId: id }), 
            Comment.find({ author: id }) 
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