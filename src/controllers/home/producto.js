import { Producto, Imagen, Categoria } from '../../models/producto/modelProducto.js';

const productoGet = async (req, res) => {
    // Get id from request parameters
    const { id } = req.params;
    

    // Fetch the product with the given id
    const producto = await Producto.findOne({
        where: { id },
        include: [
            {
                model: Imagen,
                as: 'imagenes'
            },
            {
                model: Categoria,
                as: 'categoria'
            }
        ]
    });

    // If no product was found, return a 404 response
    if (!producto) {
        return res.status(404).send('Product not found');
    }

    // Standardize the product data
    const productoFiltrado = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        codigo: producto.codigo,
        color: producto.color,
        soporte: producto.soporte,
        categoria: producto.categoria.nombre,
        imagenes: producto.imagenes.map(imagen => imagen.url)
    }
    console.log(productoFiltrado);

    // Render the view with the product data
    res.render('public/producto', { data: productoFiltrado });
}

const productoPost = (req, res) => {

}

export {
    productoGet,
    productoPost
}