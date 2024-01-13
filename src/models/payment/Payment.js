import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/sqliteConfig.js";

class Payment extends Model { }

Payment.init({
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ip_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_transaccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_pagado: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "payment"
});

export default Payment;