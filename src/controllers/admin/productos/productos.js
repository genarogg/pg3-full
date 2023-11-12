import Producto from "../../../models/producto/Producto.js";
import Categoria from "../../../models/producto/Categoria.js";

const productosGet = async (req, res) => {
    const productos = await Producto.findAll();


    const categoria = await Categoria.findAll();

    //unir los productos con las categorias por id
    productos.forEach(producto => {
        categoria.forEach(categoria => {
            if (producto.categoria_id === categoria.id) {
                // en el arreglo de productos se agrega la propiedad categoria con el nombre de la categoria  
                producto.categoria = categoria.nombre;
            }
        })
    })

    res.render('admin/productos/productos', { productos });
}

const productosPost = (req, res) => { }


export {
    productosGet,
    productosPost
}