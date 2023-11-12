import Imagen from "../../../models/producto/Imagen.js";

const agregarImgProductoGet = async (req, res) => {

    const { id } = req.params;

    res.render('admin/productos/agregarImg', { id })
}

const agregarImgProductoPost = async (req, res) => {
    try {

        const { id } = req.params;
        const inputArray = req.files;

        const outputArray = inputArray.map((item, index) => {

            return {
                name: `${item.originalname}`, // Se utiliza originalname como valor para name
                maxCount: 1,
                destacado: index === 0
            };
        });

        console.log(outputArray)

        // Iterar sobre los datos y crear instancias de Imagen
        for (const imagenData of outputArray) {
            await Imagen.create({
                producto_id: id, // Obtener el ID del nombre
                url: `uploads/${imagenData.name}`, // Ajusta la ruta según tus necesidades
                destacado: imagenData.destacado,
            });
        }

        res.redirect('/admin/productos');

    } catch (error) {
        console.log('Error al obtener el producto:', error);

    }
}

export {
    agregarImgProductoGet,
    agregarImgProductoPost
}