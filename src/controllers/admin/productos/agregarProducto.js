import Categoria from '../../../models/producto/Categoria.js'
import Producto from '../../../models/producto/Producto.js'
const agregarProductoGet = async (req, res) => {

    const categorias = await Categoria.findAll();
    res.render('admin/productos/agregarProducto', { categorias })
}

const agregarProductoPost = async (req, res) => {
    try {
        // Obtén los datos del formulario
        const { nombre, descripcion, codigo, precio, categoria, color, soporte } = req.body;

        // Crea el nuevo producto en la base de datos
        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            codigo,
            precio,
            categoria_id: categoria,
            color,
            soporte,
        });

        // Redirecciona o responde según tus necesidades
        res.redirect('/admin/productos');
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export {
    agregarProductoGet,
    agregarProductoPost
}