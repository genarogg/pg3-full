import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/sqliteConfig.js";
import Imagen from "./Imagen.js"; // Importa el modelo de Imagen
import Categoria from "./Categoria.js"; // Importa el modelo de Categoria

class Producto extends Model { }

Producto.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  color: {
    type: DataTypes.STRING,
  },

  soporte: {
    type: DataTypes.STRING,
  },

},
  {
    sequelize,
    modelName: "producto",
  });

// Define la relación entre Producto e Imagen (uno a muchos)
Producto.hasMany(Imagen, { foreignKey: 'producto_id', as: 'imagenes' });

// Define la relación entre Producto y Categoria (uno a uno)
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

export default Producto;