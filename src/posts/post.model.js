import { Schema, model } from 'mongoose';

const postSchema = Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        maxLength: [100, 'El título no puede exceder los 100 caracteres']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['Tecnología', 'Deportes', 'Noticias', 'Opinión General', 'Otros'],
        default: 'Opinión General'
    },
    text: {
        type: String,
        required: [true, 'El contenido del post no puede estar vacío']
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es obligatorio']
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Post', postSchema);