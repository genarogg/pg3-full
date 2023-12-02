import { Producto, Imagen, Categoria } from '../../models/producto/modelProducto.js';



const productosGet = async (req, res) => {
    //trae todos los productos
    const productos = await Producto.findAll({
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

    //ajustandar la data 
    const productosFiltrados = productos.map(productos => {
        return {
            id: productos.id,
            nombre: productos.nombre,
            descripcion: productos.descripcion,
            precio: productos.precio,
            codigo: productos.codigo,
            color: productos.color,
            soporte: productos.soporte,
            categoria: productos.categoria.nombre,
            imagenes: productos.imagenes.map(imagen => imagen.url)
        }

    })


    console.log(productosFiltrados)


    res.render('public/productos', { data: productosFiltrados })
}

const productosPost = (req, res) => {

}

export {
    productosGet,
    productosPost
}