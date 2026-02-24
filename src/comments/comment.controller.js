import { createCommentHelper, updateCommentHelper, deleteCommentHelper } from '../../helpers/comment.helper.js';
import Comment from './comment.model.js';

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

//soft delete.
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const authenticatedUser = req.user;

        const comment = await Comment.findOne({ _id: id, status: true });

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'El comentario no existe o ya fue borrado anteriormente'
            });
        }

        if (comment.authorId.toString() !== authenticatedUser._id.toString()) {
            return res.status(403).json({ 
                success: false,
                message: 'No tienes permiso para eliminar un comentario que no te pertenece' 
            });
        }

        comment.status = false;
        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error: error.message
        });
    }
};