require("dotenv").config();
const axios = require("axios").default;
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const { Router } = require("express");
const router = Router();

//GET TO /:idVideoGame

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;

  if (idVideogame.includes("-")) {
    let dbVideogame = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      include: Genre,
    });

    dbVideogame = JSON.stringify(dbVideogame);
    dbVideogame = JSON.parse(dbVideogame);

    dbVideogame.genres = dbVideogame.genres.map((g) => g.name);
    res.json(dbVideogame);
  } else {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      let {
        id,
        name,
        background_image,
        genres,
        description,
        released: releaseDate,
        rating,
        platforms,
      } = response.data;
      genres = genres.map((g) => g.name);
      platforms = platforms.map((p) => p.platform.name);
      return res.json({
        id,
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms,
      });
    } catch (err) {
      return console.log(err);
    }
  }
});

//POST TO /videogame

router.post("/", async (req, res) => {
  let { name, description, releaseDate, rating, genres, platforms } = req.body;
  platforms = platforms.join(" - ");
  try {
    const createdGame = await Videogame.findOrCreate({
      where: {
        name,
        description,
        releaseDate,
        rating,
        platforms,
      },
    });
    await createdGame[0].setGenres(genres);
  } catch (err) {
    console.log(err);
  }
  res.send({ msg: `The game ${name} has been created successfully` });
});

module.exports = router;
