const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const videogames = require("./videogames");
const videogame = require("./videogame");
const genres = require("./genres");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/videogame", videogame);
router.use("/genres", genres);
//En la consola esta roto porque configuramos las rutas sin definir las funciones de cada una (videogame, videogames, genre).js

module.exports = router;
