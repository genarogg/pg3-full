import express from 'express';

const router = express.Router();


import { registroGet, registroPost, loginGet, loginPost, resetGet, resetPost, newPassGet, newPassPost } from '../controllers/usuarioController.js';


router.get('/registro', registroGet);

router.post('/registro', registroPost);

router.get('/login', loginGet);

router.post('/login', loginPost);

router.get('/reset-pass', resetGet)

router.post('/reset-pass', resetPost)


router.get('/new-pass/:token', newPassGet)

router.post('/new-pass/:token', newPassPost)



export default router;