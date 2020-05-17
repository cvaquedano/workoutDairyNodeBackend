const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

// definir la pagina principal
app.get('/',(req,res)=>{
    res.send('workoutdairy backend server');
});

app.listen(PORT,()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});