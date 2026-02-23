import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
            mongoose.disconnect();
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Connected to database');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Disconnected');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });

    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};