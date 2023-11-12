import Producto from '../../../models/producto/Producto.js'

const eliminarProductoDelete = async (req, res) => {

    const { id } = req.params;
    console.log({ id })
    const producto = await Producto.findByPk(id);

    await producto.destroy();

    res.redirect('/admin/inicio');
}

export default eliminarProductoDelete;