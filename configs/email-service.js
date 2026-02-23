import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false 
    }
});

export const sendVerificationEmail = async (email, name, token) => {
    const link = `http://localhost:${process.env.PORT}/api/v1/auth/verify/${token}`;
    
    const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Verifica tu cuenta - Gestor de Opiniones',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Hola ${name},</h2>
                <p>Gracias por registrarte en nuestro Gestor de Opiniones.</p>
                <p>Para completar tu registro, por favor copia el token.:</p>
                <a href="${link}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verificar mi cuenta</a>
                <p style="margin-top: 20px;">Tu token de verificación es: <b>${token}</b></p>
                <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};