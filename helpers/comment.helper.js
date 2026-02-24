import Comment from '../src/comments/comment.model.js';

export const createCommentHelper = async (commentData, userId) => {
    const newComment = new Comment({
        ...commentData,
        authorId: userId
    });
    await newComment.save();
    return newComment;
};

export const updateCommentHelper = async (commentId, userId, text) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error('Comentario no encontrado');

    if (comment.authorId.toString() !== userId.toString()) {
        throw new Error('No tienes permiso para editar este comentario');
    }

    comment.text = text;
    await comment.save();
    return comment;
};

export const deleteCommentHelper = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error('Comentario no encontrado');

    if (comment.authorId.toString() !== userId.toString()) {
        throw new Error('No tienes permiso para eliminar este comentario');
    }

    await Comment.findByIdAndDelete(commentId);
    return { message: 'Comentario eliminado' };
};