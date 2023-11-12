import path from 'node:path';
import express from 'express';
import sequelize from './src/config/sqliteConfig.js';

const app = express();
const PORT = 3000;

// Middleware para parsear el body de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio "public"
const publicPath = path.join(process.cwd(), './src/public');
app.use(express.static(publicPath));

// Habilitando el motor de plantillas EJS 
const viewsPath = path.join(process.cwd(), './src/views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Conexión a la base de datos
sequelize.sync({ logging: false }).then(() => {
    console.log('DB conectada!');
});

// Routers
import home from './src/router/home.js';
import admin from './src/router/admin.js';


app.use('/', home);
app.use('/admin', admin);



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});