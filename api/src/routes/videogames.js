require("dotenv").config();
const axios = require("axios").default;
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const { Router } = require("express");
const router = Router();

//GET TO "/videogames"

router.get("/", async (req, res) => {
  let dbVideogames = await Videogame.findAll({
    include: Genre,
  });

  dbVideogames = JSON.stringify(dbVideogames);
  dbVideogames = JSON.parse(dbVideogames);

  dbVideogames = dbVideogames.reduce(
    (acc, el) =>
      acc.concat({
        ...el,
        genres: el.genres.map((g) => g.name),
      }),
    []
  );

  // GET /videogames?name="..."

  if (req.query.name) {
    try {
      let response = await axios.get(
        `https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`
      );
      if (!response.data.count)
        return res.status(204).json(`No results found for "${req.query.name}"`);

      const gamesOk = response.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres.map((g) => g.name),
        };
      });

      const dbFilteredGames = dbVideogames.filter((g) =>
        g.name.toLowerCase().includes(req.query.name.toLowerCase())
      );

      const results = [...dbFilteredGames, ...gamesOk.splice(0, 15)];
      return res.json(results);
    } catch (err) {
      return console.log(err);
    }
  } else {
    try {
      let pages = 0;
      let results = [...dbVideogames];
      let response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );
      while (pages < 6) {
        pages++;

        const gamesREADY = response.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map((g) => g.name),
          };
        });
        results = [...results, ...gamesREADY];
        response = await axios.get(response.data.next);
      }
      return res.json(results);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
});

module.exports = router;
