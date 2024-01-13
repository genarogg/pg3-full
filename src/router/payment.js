import express from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import axios from 'axios';
import Payment from '../models/payment/Payment.js';

const router = express.Router();

const { JWT_SECRET, API_PAYMENT, API_KEY } = process.env;

router.post('/', (req, res) => {

    const { cantidad, descripcion, tipoTarjeta, cvv, añoExpiracion,mesExpiracion, idProducto, tokenSesion } = req.body


    jwt.verify(tokenSesion, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido', error: 'token' });
        }


        const datosPago = {
            "amount": cantidad,
            "card-number": tipoTarjeta,
            "cvv": cvv,
            "expiration-month": mesExpiracion,
            "expiration-year": añoExpiracion,
            "full-name": "APPROVED",
            "currency": "USD",
            "description": descripcion,
            "reference": `product_id:${idProducto}`,
        };

        console.log("Datos de pago:", datosPago);
      

        axios.post(`${API_PAYMENT}/payments`, datosPago, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            }
        })
            .then(response => {
                console.log("Response:", response.data);

                // Asegúrate de que no estás enviando otra respuesta después de esta línea
            })
            .catch(err => {
                /* console.error(err); */
                res.status(500).json({ message: 'Error al procesar el pago', error: err.message });
            });
    });
});



export default router;