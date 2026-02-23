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