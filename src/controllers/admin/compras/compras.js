import Payment from '../../../models/payment/Payment.js';


const comprasGet = async (req, res) => {
    
    try {
        const compras = await Payment.findAll();
        console.log(compras);
        res.render('admin/compras/compras', { data: compras });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error al obtener las compras', error: error.message });
    }
}

export {
    comprasGet
}