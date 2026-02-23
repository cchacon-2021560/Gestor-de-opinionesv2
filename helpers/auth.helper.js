import User from '../src/users/user.model.js';
import { hash } from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from './email-service.js';

export const registerHelper = async (userData, profilePictureUrl = null) => {
    try {
        const { password, email, ...rest } = userData;

        const hashedPassword = await hash(password, 10);

        const verificationToken = crypto.randomBytes(20).toString('hex');

        const newUser = new User({
            ...rest,
            email,
            password: hashedPassword,
            profilePicture: profilePictureUrl,
            verificationToken,
            isVerified: false 
        });

        await newUser.save();

        sendVerificationEmail(newUser.email, newUser.name, verificationToken)
            .catch(err => console.error('Error sending email:', err));

        return {
            success: true,
            message: 'User registered successfully. Please check your email to verify your account.',
            user: newUser
        };

    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Username or Email already exists');
        }
        throw error;
    }
};