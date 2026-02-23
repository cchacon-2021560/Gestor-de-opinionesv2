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

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const result = await deletePostHelper(id, userId);

        res.status(200).json(result);
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};