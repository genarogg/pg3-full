import User from "../../models/usuario/Usuario.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET, JWT_DURATION } = process.env


const loginGet = (req, res) => {

    res.render('usuario/login');
}

const loginPost = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: existingUser.id, email: existingUser.email },
            JWT_SECRET,
            { expiresIn: JWT_DURATION }
        );

        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
}

export { loginGet, loginPost };