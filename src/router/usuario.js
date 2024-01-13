import express from 'express';

const router = express.Router();


import { registroGet, registroPost, loginGet, loginPost } from '../controllers/usuarioController.js';


router.get('/registro', registroGet);

router.post('/registro', registroPost);

router.get('/login', loginGet);

router.post('/login', loginPost);

export default router;