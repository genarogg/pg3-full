import express from 'express';
import {
    inicioGet,
    loginGet,
    loginPost,
    productosGet,
    productosPost,
    productoGet,
    productoPost
} from '../controllers/homeController.js';

const router = express.Router();

router.get('/', productosGet/* inicioGet */);

router.get('/login', loginGet);
router.post('/login', loginPost);


router.get('/productos', productosGet);
router.post('/productos', productosPost);

router.get('/detalles/:id', productoGet);
router.post('/detalles', productoPost);

export default router;