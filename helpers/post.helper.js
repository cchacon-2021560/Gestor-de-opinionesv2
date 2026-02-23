import Post from '../src/posts/post.model.js';

export const createPostHelper = async (postData, userId) => {
    const newPost = new Post({
        ...postData,
        authorId: userId
    });

    await newPost.save();
    
    return {
        success: true,
        message: 'Publicación creada exitosamente',
        post: newPost
    };
};

export const updatePostHelper = async (postId, userId, updateData) => {
    const post = await Post.findById(postId);

    if (!post) throw new Error('Publicación no encontrada');

    if (post.authorId.toString() !== userId.toString()) {
        throw new Error('No tienes permiso para editar esta publicación');
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });
    return updatedPost;
};

export const deletePostHelper = async (postId, userId) => {
    const post = await Post.findById(postId);

    if (!post) throw new Error('Publicación no encontrada');

    if (post.authorId.toString() !== userId.toString()) {
        throw new Error('No tienes permiso para eliminar esta publicación');
    }

    await Post.findByIdAndDelete(postId);
    return { success: true, message: 'Publicación eliminada correctamente' };
};