import express from 'express';
import upload from '../config/multer.js';
import {
    categoriasGet,
    categoriasPost,
    adminGet,
    agregarCategoriaGet,
    agregarCategoriaPost,
    productosGet,
    productosPost,
    agregarProductoGet,
    agregarProductoPost,
    eliminarProductoDelete,
    agregarImgProductoGet,
    agregarImgProductoPost,
    actualizarProductoGet,
    actualizarProductoPost,
    comprasGet
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', adminGet);

router.get('/categorias', categoriasGet);

router.get('/categorias/agregar', agregarCategoriaGet);

router.post('/categorias/agregar', agregarCategoriaPost);

router.get('/productos', productosGet);

router.get('/producto/agregar', agregarProductoGet);

router.post('/producto/agregar', agregarProductoPost);

router.delete('/producto/eliminar/:id', eliminarProductoDelete);

router.get('/producto/imagen/:id', agregarImgProductoGet);

router.post('/producto/imagen/:id',upload.array('img', 4), agregarImgProductoPost);

router.get('/producto/editar/:id', actualizarProductoGet);

router.post('/producto/editar/:id', actualizarProductoPost);

router.get('/compras', comprasGet);


export default router;