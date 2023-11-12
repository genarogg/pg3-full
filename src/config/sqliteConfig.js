import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/config/db.sqlite', // Ruta a tu archivo SQLite
});

export default sequelize;
