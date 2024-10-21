const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ejmisa",
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = db;
