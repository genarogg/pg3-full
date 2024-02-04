import express from 'express';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import axios from 'axios';
import Payment from '../models/payment/Payment.js';
import Usuario from '../models/usuario/Usuario.js';
import ip from 'ip';
import sendEmail from '../email/sendEmail.js';

const router = express.Router();

const { JWT_SECRET, API_PAYMENT, API_KEY } = process.env;

router.post('/', async (req, res) => {

    const { cantidad, descripcion, tipoTarjeta, cvv, añoExpiracion, mesExpiracion, idProducto, tokenSesion } = req.body

    
console.log("tokenSesion", tokenSesion);
    jwt.verify(tokenSesion, JWT_SECRET, async (err, decoded) => {
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



        axios.post(`${API_PAYMENT}/payments`, datosPago, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            }
        })
            .then(async (response) => {
                try {
                    await getUserIdByEmail(decoded.email).then(id => {
                        const datosPago = {
                            cliente_id: id,
                            ip_cliente: ip.address(),
                            id_transaccion: response.data.data.transaction_id,
                            producto_id: idProducto,
                            descripcion: descripcion,
                            cantidad: 1,
                            total_pagado: cantidad,
                        }
                        Payment.create(datosPago)
                            .then(pago => {

                                sendEmail(decoded.email, 'Pago procesado con éxito', `El pago por ${cantidad} ha sido procesado con éxito. Gracias por su compra.`)

                                res.status(200).json({ message: 'Pago procesado con éxito', pago: pago });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).json({ message: 'Error al procesar el pago', error: err.message });
                            });
                    });
                } catch (error) {
                    console.error("Error:", error);
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Error al procesar el pago', error: err.message });
            });
    }).catch(err => {
        console.error(err);
        return res.status(401).json({ message: 'Token inválido', error: 'jwtBad' });
    
    });

    const getUserIdByEmail = (email) => {
        return Usuario.findOne({ email: email })
            .then(user => {
                if (user) {
                    return user.id;
                } else {
                    throw new Error('No se encontró un usuario con ese correo electrónico');
                }
            })
            .catch(err => {
                console.error(err);
                throw err;
            });
    }
});





export default router;