import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
    if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
        console.error("No se encontraron credenciales en el .env");
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

export const sendVerificationEmail = async (email, name, token) => {
    try {
        const transporter = createTransporter();
        const link = `http://localhost:${process.env.PORT || 3006}/api/v1/auth/verify/${token}`;
        
        const mailOptions = {
            from: `"AuthDotnet App" <${process.env.SMTP_USERNAME}>`,
            to: email,
            subject: 'Verifica tu cuenta',
            html: `<h1>Hola ${name}</h1><p>Tu token es: <b>${token}</b></p><a href="${link}">Click aquí para verificar</a>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Correo enviado satisfactoriamente: ", info.messageId);
        return info;
    } catch (error) {
        console.error("Error real al enviar correo:", error);
        throw error;
    }
};