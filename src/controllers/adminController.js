import { adminGet } from './admin/admin.js';
import { categoriasGet, categoriasPost } from './admin/categorias/categorias.js';
import { agregarCategoriaGet, agregarCategoriaPost } from './admin/categorias/agregarCategoria.js';

import { productosGet, productosPost } from './admin/productos/productos.js';

import {
    agregarProductoGet,
    agregarProductoPost
} from "./admin/productos/agregarProducto.js"

import eliminarProductoDelete from "./admin/productos/eliminarProducto.js"

export {
    categoriasGet,
    categoriasPost,
    adminGet,
    agregarCategoriaGet,
    agregarCategoriaPost,
    productosGet,
    productosPost,
    agregarProductoGet,
    agregarProductoPost,
    eliminarProductoDelete
}