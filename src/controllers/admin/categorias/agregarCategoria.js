import Categoria from '../../../models/producto/Categoria.js'

const agregarCategoriaGet = (req, res) => {

    res.render('admin/categorias/agregarCategoria')
}

const agregarCategoriaPost = async (req, res) => {
    try {
        const { nombre } = req.body;

        const nuevaCategoria = await Categoria.create({
            nombre,
        });

        res.redirect('/admin/categorias');

    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
}


export {
    agregarCategoriaGet,
    agregarCategoriaPost
}