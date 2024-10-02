const mysql = require('mysql');

//Conexion a la base de datos MySQL

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pawnloan'
});

// Conectar a la base de datos
db.connect((err) => {
    if(err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = db;