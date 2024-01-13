import User from "../../models/usuario/Usuario.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


dotenv.config();
const { JWT_SECRET, JWT_DURATION } = process.env


const registroGet = (req, res) => {

    res.render('usuario/registro');
}



const registroPost = async (req, res) => {
    const { name, email, password, recaptchaResponse } = req.body;

    const recaptchaSecretKey = '6LdW0E8pAAAAAHNWtx7zJx1UyoTEnnbIUxI105Zq';
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`;

    const recaptchaVerification = await fetch(recaptchaUrl, { method: 'GET' });
    const recaptchaData = await recaptchaVerification.json();

    console.log(recaptchaData.success);
    if (!recaptchaData.success) {
        // The reCAPTCHA was not solved correctly
        return res.status(400).json({ message: 'Invalid reCAPTCHA' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_DURATION }
        );

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
    ;
}




export { registroGet, registroPost };