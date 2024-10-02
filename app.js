const express = require("express");
const bodyParser = require("body-parser");
const db = require("./mysqlconfig");
const cors = require('cors');
const app = express();

const { PORT } = require('./config.js');


// Usa body-parser para procesar JSON en el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = PORT;

// Habilitar CORS para todas las peticiones
app.use(cors());

// configuracion de cors
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,POST',
//     allowedHeaders: 'Content-Type,Authorization'
// }))

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto: ${port}`);
});


// Middleware para procesar JSON
app.use(express.json());

/*------------------------ Seccion clientes --------------------------------*/

// Dar de alta a clientes
app.post("/clientes/agregar", (req, res) => {
  const {
    nombre,
    curp,
    calle,
    numExt,
    numInt,
    colonia,
    cp,
    identificacion,
    tipoIdentificacion,
    correo,
    telefono,
    fechaCreacion,
  } = req.body;
  const query =
    "INSERT INTO clientes (nombre, curp, calle, numExt, numInt, colonia, cp, identificacion, tipoIdentificacion, correo, telefono, fechaCreacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      nombre,
      curp,
      calle,
      numExt,
      numInt,
      colonia,
      cp,
      identificacion,
      tipoIdentificacion,
      correo,
      telefono,
      fechaCreacion,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.json({ message: "Cliente agregado", id: result.insertId });
    }
  );
});

//Obtener todos los clientes
app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Obtener un cliente por id
app.get("cliente/:id", (req, res) => {
  const { id } = req.params; //Obtener el ID de los parametros para la consulta

  const query = "SELECT * FROM clientes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(results[0]); //Devuelve el primer resultado
  });
});

//Actualizar un cliente
app.put("/cliente/actualizar/:id", (req, res) => {
  const { id } = req.params1;
  const {
    nombre,
    curp,
    calle,
    numExt,
    numInt,
    colonia,
    cp,
    identificacion,
    tipoIdentificacion,
    correo,
    telefono,
  } = req.body;
  const query =
    "UPDATE clientes SET nombre = ?, curp = ?, calle = ?, numExt = ?, numInt = ?, colonia = ?, cp = ?, identificacion = ?, tipoIdentificacion = ?, correo = ?, telefono = ? WHERE id = ?";
  db.query(
    query,
    [
      nombre,
      curp,
      calle,
      numExt,
      numInt,
      colonia,
      cp,
      identificacion,
      tipoIdentificacion,
      correo,
      telefono,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Cliente no encontrado ", id: id });
      }
      res.json({ message: "Cliente actualizado ", id: id });
    }
  );
});

//Eliminar un cliente por su ID
app.delete("/cliente/eliminar/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM clientes WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado ", id: id });
  });
});

/*------------------------ Seccion carros --------------------------------*/

// Dar de alta a carros
app.post("/carros/agregar", (req, res) => {
  const {
    nombre,
    marca,
    modelo,
    precio,
    categoria,
    observaciones,
    fechaCreacion,
  } = req.body;
  const query =
    "INSERT INTO  carros (nombre, marca, modelo, precio, categoria, observaciones, fechaCreacion) VALUES (?,?,?,?,?,?,?)";
  db.query(
    query,
    [nombre, marca, modelo, precio, categoria, observaciones, fechaCreacion],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.json({ message: "Carro agregado", id: result.insertId });
    }
  );
});

//Obtener todos los carros
app.get("/carros", (req, res) => {
  db.query("SELECT * FROM carros ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Obtener un carro con el ID
app.get("/carro/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM carros WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(results[0]);
  });
});

//Actualizar un carro con el ID
app.put("/carro/actualizar/:id", (req, res) => {
  const { id } = req.params;

  const {
    nombre,
    marca,
    modelo,
    precio,
    categoria,
    observaciones,
    fechaActualizacion,
  } = req.body;

  const query =
    "UPDATE carros SET nombre = ?, marca = ?, modelo = ?, precio = ?, categoria = ?, observaciones = ?, fechaActualizacion = ? WHERE id = ?";

  db.query(
    query[
      (nombre,
      marca,
      modelo,
      precio,
      categoria,
      observaciones,
      fechaActualizacion,
      id)
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "carro no encontrado" });
      }
      res.json({ message: "carro actualizado ", id: id });
    }
  );
});

//Eliminar un carro por ID
app.delete("/carro/eliminar/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM carros WHERE id = ?";
  db.query(query[id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json({ message: "Carro eliminado ", id: id });
  });
});

/*------------------------ Seccion bitacora --------------------------------*/

//Agregar a bitacora
app.post("/bitacora/insertar", (req, res) => {
  const {
    movimiento,
    idseccion,
    seccion,
    idusuario,
    valorinicial,
    valorfinal,
    fecharegistro,
  } = req.body;
  const query =
    "INSERT INTO bitacora (movimiento, idseccion, seccion, idusuario, valorinicial, valorfinal, fecharegistro) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      movimiento,
      idseccion,
      seccion,
      idusuario,
      valorinicial,
      valorfinal,
      fecharegistro,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.json({
        message: "registro insertado en bitacora",
        id: result.insertId,
      });
    }
  );
});

//obtener registros de bitacora
app.get("/bitacora", (req, res) => {
  db.query("SELECT * FROM bitacora ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

/*------------------------ Seccion prestamos --------------------------------*/

//Agregar un prestamo
app.post("/prestamo/agregar", (req, res) => {
  const { idcliente, idcarro, fechaprestamo, estatus, fechaCreacion } =
    req.body;
  const query =
    "INSERT INTO prestamo (idcliente, idcarro, fechaprestamo, estatus, fechaCreacion) VALUES (?,?,?,?,?)";
  db.query(
    query,
    [idcliente, idcarro, fechaprestamo, estatus, fechaCreacion],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.json({ message: "prestamo registrado", id: result.insertId });
    }
  );
});

//obtener prestamos
app.get("/prestamos", (req, res) => {
  db.query("SELECT * FROM prestamo ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Obtener un carro con el ID
app.get("/prestamo/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM prestamo WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(results[0]);
  });
});

//Actualizar un prestamo con el ID
app.put("/presatmo/actualizar/:id", (req, res) => {
  const { id } = req.params;

  const { idcliente, idcarro, fechaprestamo, estatus, fechaActualizacion } =
    req.body;

  const query =
    "UPDATE carros SET idcliente = ?, idcarro = ?, fechaprestamo = ?, estatus = ?, fechaActualizacion = ? WHERE id = ?";

  db.query(
    query[(idcliente, idcarro, fechaprestamo, estatus, fechaActualizacion, id)],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "prestamo no encontrado" });
      }
      res.json({ message: "prestamo actualizado ", id: id });
    }
  );
});

//Eliminar un prestamo por ID
app.delete("/prestamo/eliminar/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM prestamo WHERE id = ?";
  db.query(query[id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.sqlMessage });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Prestamo no encontrado" });
    }
    res.json({ message: "Prestamo eliminado ", id: id });
  });
});

/*------------------------ Seccion usuarios --------------------------------*/

//Agregar un usuario
app.post("/usuarios/agregar", (req, res) => {
  const { nombre, apellido, nombreusuario, password, fechaCreacion } =
    req.body;
  const query =
    "INSERT INTO usuarios (nombre, apellido, nombreusuario, password, fechaCreacion) VALUES (?,?,?,?,?)";
  db.query(
    query,
    [nombre, apellido, nombreusuario, password, fechaCreacion],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.json({ message: "usuario agregado", id: result.insertId });
    }
  );
});

//obtener usuarios
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


//Login
app.post("/login", async (req, res) => {
  const { nombreusuario, password } = req.body;

  //Consulta del usuario en la base de datos
  try{

    const query = "SELECT * FROM usuarios WHERE nombreusuario = ? AND password = ?";
    db.query(query, [nombreusuario, password], (err, results) => {
      if (err) {
        console.error("Error en la consulta:", err);
        return res.json("Error del servidor");
      }
      if (results.length == []) {
        return res.json('Usuario o contraseña incorrectos Intentar de nuevo');
      }
      return res.json(results);
    });
  } catch(err){
    return res.json('Existe el siguiente error:', err);
  }
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  // Remover manualmente la información del usuario en la sesión
  res.send('Desconectado')

});
