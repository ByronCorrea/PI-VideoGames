require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios").default;
const { Genre } = require("../models/Genre");
const { Router } = require("express");
const router = Router();

// GET TO '/genres'

router.get("/", async (req, res) => {
  try {
    const dbGenres = await Genre.findAll();
    if (dbGenres.length) return res.json(dbGenres);

    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = response.data.results;

    genres.forEach(async (genre) => {
      await Genre.findOrCreate({
        where: {
          name: genre.name,
        },
      });
    });

    const genresOk = genres.map((game) => {
      return {
        id: game.id,
        name: game.name,
      };
    });
    res.json(genresOk);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
