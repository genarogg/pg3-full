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
import suario from './src/router/usuario.js';
import payment from './src/router/payment.js';

app.use('/', home);
app.use('/admin', admin);
app.use('/usuario', suario);
app.use('/payment', payment);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// En el proyecto realizado en la asignación anterior, agregue las siguientes características:
//   - Formulario de registro de clientes
//      - Guardar los datos del cliente en una tabla de la base de datos, datos mínimos a guardar: email y contraseña
//      - El registro debe ser público
//      - Agregar un reCaptcha al formulario de registro
//   - Vista de inicio de sesión para clientes
//   - Formulario de compra de productos
//      - Este debe mostrarse al momento de hacer clic en el botón de compra
//      - En caso de que el usuario no esté logueado, debe redirigir al formulario de registro de clientes
//      - Se usará tarjeta de crédito como único medio de pago
//      - Guardar los datos de la compra en una tabla de la base de datos, datos mínimos a guardar:
//        cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente
//      - Se usará la API https://fakepayment.onrender.com/ para validar el pago con tarjeta de crédito
//   - Vista en la interfaz administrativa de todos los clientes y todas las compras realizadas
// Respaldar lo realizado en la asignación anterior en una rama llamada 'client_view'.
// Una vez finalizada la tarea, haga entrega por GitHub Classroom, copiando los enlaces de GitHub y render correspondientes. Agregue como comentario en la entrega las credenciales del usuario administrativo.