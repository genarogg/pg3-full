import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/config/db.sqlite', // Ruta a tu archivo SQLite
});

// elimina la tabla la user
/* sequelize.query("DROP TABLE IF EXISTS users")
  .then(() => {
    console.log("Tabla eliminada");
  })
  .catch(err => {
    console.error("Error al eliminar la tabla: ", err);
  });
 */

export default sequelize;
