const express = require("express");
const path = require("path");
const routerUsuarios = require("./app/routes/routes");
// const routerBootcamp = require('./app/routes/routes')

const app = express();

// se configuran estáticos
app.use(express.static(path.join(__dirname, "app", "static")));

// Se configura manejo de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // acá nos traemos las rutas
app.use(routerUsuarios);
// app.use(routerBootcamp)

app.listen(3000, () => console.log("Servidor ejecutando en el puerto 3000"));
