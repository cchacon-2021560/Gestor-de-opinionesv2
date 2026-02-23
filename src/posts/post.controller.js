import { createPostHelper } from '../../helpers/post.helper.js';
import { updatePostHelper } from '../../helpers/post.helper.js';
import Post from './post.model.js';

export const createPost = async (req, res) => {
    try {
        const userId = req.user._id; 
        const result = await createPostHelper(req.body, userId);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Error al crear la publicación'
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const post = await updatePostHelper(id, userId, req.body);

        res.status(200).json({ success: true, post });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};

//Lógica de soft delte.
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        
        const post = await Post.findOneAndUpdate(
            { _id: id, status: true }, 
            { status: false }, 
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'La publicación no existe o ya ha sido eliminada anteriormente'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publicación eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la publicación',
            error: error.message
        });
    }
};