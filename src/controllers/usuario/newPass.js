import jwt from 'jsonwebtoken';
import Usuario from '../../models/usuario/Usuario.js';
import bcrypt from 'bcryptjs';

const newPassGet = (req, res) => {
    res.render('usuario/new-pass');
}

const newPassPost = async (req, res) => {
    // Extrae la nueva contraseña del cuerpo de la solicitud y el token de los parámetros de la URL
    const { password } = req.body;
    const token = req.params.token;

    console.log('Token: ', token);
    try {
        // Verifica el token y obtiene el correo electrónico del usuario
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        // Busca al usuario en la base de datos
        const user = await Usuario.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Encripta la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Actualiza la contraseña del usuario en la base de datos
        user.password = hashedPassword;
        await user.save();

        // Si todo va bien, envía una respuesta con un mensaje de éxito
        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        // Si algo sale mal, registra el error y envía una respuesta con un mensaje de error
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la contraseña', error });
    }
}

export { newPassGet, newPassPost }