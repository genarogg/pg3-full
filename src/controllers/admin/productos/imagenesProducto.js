import Imagen from "../../../models/producto/Imagen.js";

const agregarImgProductoGet = async (req, res) => {

    const { id } = req.params;

    res.render('admin/productos/agregarImg', { id  })
}

const agregarImgProductoPost = async (req, res) => {
  
}

export {
    agregarImgProductoGet,
    agregarImgProductoPost
}