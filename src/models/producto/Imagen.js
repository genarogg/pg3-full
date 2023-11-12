import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/sqliteConfig.js";

class Imagen extends Model { }

Imagen.init({
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destacado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
    {
        sequelize,
        modelName: "imagen"
    });

export default Imagen;