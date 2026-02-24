import { Schema, model } from 'mongoose';

const commentSchema = Schema({
    text: {
        type: String,
        required: [true, 'El comentario no puede estar vacío'],
        maxLength: [500, 'El comentario es muy largo']
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es obligatorio']
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'El post de origen es obligatorio']
    },
    status: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Comment', commentSchema);