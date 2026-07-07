const axios = require("axios");

console.log("TMDB API KEY:", process.env.TMDB_API_KEY);

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

module.exports = tmdb;