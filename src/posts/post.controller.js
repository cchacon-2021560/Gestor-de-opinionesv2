import { createPostHelper } from '../../helpers/post.helper.js';

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