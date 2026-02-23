import { createCommentHelper, updateCommentHelper, deleteCommentHelper } from '../../helpers/comment.helper.js';

export const addComment = async (req, res) => {
    try {
        const comment = await createCommentHelper(req.body, req.user._id);
        res.status(201).json({ success: true, comment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const comment = await updateCommentHelper(req.params.id, req.user._id, req.body.text);
        res.status(200).json({ success: true, comment });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const result = await deleteCommentHelper(req.params.id, req.user._id);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};