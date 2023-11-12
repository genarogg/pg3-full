import express from 'express';
import { inicioGet, loginGet, loginPost } from '../controllers/homeController.js';
const router = express.Router();

router.get('/', inicioGet);

router.get('/login', loginGet);
router.post('/login', loginPost);

export default router;