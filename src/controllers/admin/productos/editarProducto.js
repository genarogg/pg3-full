import Categoria from '../../../models/producto/Categoria.js'
import Producto from '../../../models/producto/Producto.js'

const actualizarProductoGet = async (req, res) => {

    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        //obtener categorias
        const categorias = await Categoria.findAll();

        //unir los producto con su categoria por id
        categorias.forEach(categoria => {
            if (producto.categoria_id === categoria.id) {
                // en el arreglo de productos se agrega la propiedad categoria con el nombre de la categoria  
                producto.categoria = categoria.nombre;

            }
        })

        console.log(producto);

        res.render('admin/productos/editarProducto', { datos: producto.dataValues, categorias, producto });

    } catch (error) {
        console.log('Error al obtener el producto:', error);
    }
}

const actualizarProductoPost = async (req, res) => {
    try {
        const { id } = req.params;

        // Obtén los datos del formulario
        const { nombre, descripcion, codigo, precio, categoria, color, soporte } = req.body;
        
        console.log({ nombre, descripcion, codigo, precio, categoria, color, soporte })
        // Busca el producto existente por ID
        const productoExistente = await Producto.findByPk(id);

        // Verifica si el producto existe
        if (!productoExistente) {
            return res.status(404).send('Producto no encontrado');
        }

        // Actualiza los datos del producto existente
        await productoExistente.update({
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
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
}

export {
    actualizarProductoGet,
    actualizarProductoPost
}