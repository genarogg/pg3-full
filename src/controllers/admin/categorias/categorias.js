import Categoria from '../../../models/producto/Categoria.js';
const categoriasGet = async (req, res) => {

    try {
        const categorias = await Categoria.findAll();

        res.render('admin/categorias/categorias', { datos: categorias });

    }
    catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ mensaje: 'Error al obtener las categorías' });
    }
}

const categoriasPost = (req, res) => { }


export {
    categoriasGet,
    categoriasPost
}