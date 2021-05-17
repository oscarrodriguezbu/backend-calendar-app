//importar express y otras cosas
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');

//console.log(process.env);

//crear el servidor de express
const app = express();

//base de datos
dbConnection();

//cors. Es para añadir una capa de seguridad y restringir dominios https://www.npmjs.com/package/cors
app.use(cors());


//Directoria publico. El use hace referencia a un midleware
//un midelware es una funcion que se ejecuta en el momento que alguien hace una peticion al servidor o que pase sobre algun lugar
app.use( express.static('public') );

//Lectura o parseo del body. Nota: A partir de la version 4 de express ya no se necesitan terceros para el parseo
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth')); //autenticacion. Todo lo que venga de auth se va a habilitar en /api/auth
app.use('/api/events', require('./routes/events')); 




//escuchar peticiones. El puerto que usa es el 4000
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);   
});