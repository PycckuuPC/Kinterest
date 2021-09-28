const { default: axios } = require('axios');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data } = await axios(
      'https://api.themoviedb.org/3/discover/movie?api_key=377930f8839394f83534a7acc12c5ae3&language=ru-RU&region=RU&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&with_watch_monetization_types=flatrate'
    );
    res.json(data.results);
  } catch (err) {
    console.error(err);
  }
});
