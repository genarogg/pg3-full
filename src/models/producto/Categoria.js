import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/sqliteConfig.js";

class Categoria extends Model { }

Categoria.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        sequelize,
        modelName: "categoria"
    });

export default Categoria;

