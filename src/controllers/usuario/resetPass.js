import jwt from 'jsonwebtoken';
import sendEmail from '../../email/sendEmail.js';

const resetPost = async (req, res) => {
    // Extrae el correo electrónico del cuerpo de la solicitud
    const { email } = req.body;

    // Genera un token JWT que expira en 5 horas
    jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '5h' }, async (err, token) => {
        // Intenta enviar el correo electrónico
        try {
            console.log(token);

            // Crea una nueva instancia de EmailSend
            // Configura el correo electrónico
            const recipientEmail = req.body.email;
            const emailSubject = 'Password Reset';
            const emailBody = `You requested a password reset. Please use the following token: https://lavadorasportatiles2.onrender.com/usuario/new-pass/${token}`;

            // Envía el correo electrónico
            await sendEmail(recipientEmail, emailSubject, emailBody);
            // Si todo va bien, envía una respuesta con un mensaje de éxito
            res.json({ message: 'Correo de recuperación enviado' });
        } catch (error) {
            // Si algo sale mal, registra el error y envía una respuesta con un mensaje de error
            console.error(error);
            res.status(500).json({ message: 'Error al enviar el correo' });
        }
    })
}

const resetGet = (req, res) => {
    // Renderiza la vista de recuperación de contraseña
    res.render('usuario/reset');
}

export { resetPost, resetGet };