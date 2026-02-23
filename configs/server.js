import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongoDB.js';
import authRoutes from '../src/auth/auth.routes.js';
import postRoutes from '../src/posts/post.routes.js';
import commentRoutes from '../src/comments/comment.routes.js'
import userRoutes from '../src/users/user.routes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.basePath = '/api/v1';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

routes() {
        this.app.use(`${this.basePath}/auth`, authRoutes);
        this.app.use(`${this.basePath}/posts`, postRoutes);
        this.app.use(`${this.basePath}/comments`, commentRoutes); 
        this.app.use(`${this.basePath}/users`, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;