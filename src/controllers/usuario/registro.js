import User from "../../models/usuario/User.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET, JWT_DURATION } = process.env


const registroGet = (req, res) => {

    res.render('usuario/registro');
}

const registroPost = async (req, res) => {
console.log(req.body);
    const { name, email, password } = req.body;

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
}




export { registroGet, registroPost };