const Movie = require('../models/Movie');
const tmdb = require('../services/tmdbService');
const mongoose = require("mongoose");

const getMovies = async (req, res) => {
  try {
    const { category, search, genre } = req.query;
    let query = {};

    if (category) query.category = category;
    if (genre) query.genre = { $in: [genre] };
    if (search) query.title = { $regex: search, $options: 'i' };

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMoviesByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;

    const { data } = await tmdb.get("/discover/movie", {
      params: {
        with_genres: genreId,
      },
    });

    res.json(data.results);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    // If MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }

      return res.json(movie);
    }

    // Otherwise load from TMDB
    const { data } = await tmdb.get(`/movie/${id}`);

    res.json({
      _id: data.id,
      title: data.title,
      description: data.overview,
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      banner: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
      rating: data.vote_average,
      year: data.release_date?.split("-")[0],
      duration: `${data.runtime} min`,
      genre: data.genres.map(g => g.name),
      trailer: "",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getFeaturedMovie = async (req, res) => {
  try {
    const { data } = await tmdb.get("/trending/movie/week");

    // Only keep movies that have both banner and poster images
    const movies = data.results.filter(
      (movie) => movie.backdrop_path && movie.poster_path
    );

    // Pick a random movie
    const randomMovie =
      movies[Math.floor(Math.random() * movies.length)];

    res.json(randomMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const movies = await Movie.find({ category }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const movieData = { ...req.body };

    if (req.files) {
      if (req.files.poster) {
        movieData.poster = `/uploads/${req.files.poster[0].filename}`;
      }
      if (req.files.banner) {
        movieData.banner = `/uploads/${req.files.banner[0].filename}`;
      }
    }

    const movie = await Movie.create(movieData);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movieData = { ...req.body };

    if (req.files) {
      if (req.files.poster) {
        movieData.poster = `/uploads/${req.files.poster[0].filename}`;
      }
      if (req.files.banner) {
        movieData.banner = `/uploads/${req.files.banner[0].filename}`;
      }
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, movieData, {
      new: true,
      runValidators: true,
    });

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await movie.deleteOne();
    res.json({ message: 'Movie removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;

    // MongoDB movie
    if (mongoose.Types.ObjectId.isValid(id)) {
      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }

      const similar = await Movie.find({
        _id: { $ne: movie._id },
        $or: [
          { genre: { $in: movie.genre } },
          { category: movie.category },
        ],
      }).limit(10);

      return res.json(similar);
    }

    // TMDB movie
    const { data } = await tmdb.get(`/movie/${id}/recommendations`);

    const movies = data.results.map((movie) => ({
      _id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      banner: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      description: movie.overview,
      rating: movie.vote_average,
      year: movie.release_date?.split("-")[0],
    }));

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = [
      { name: 'Trending', slug: 'trending' },
      { name: 'Popular', slug: 'popular' },
      { name: 'Action', slug: 'action' },
      { name: 'Comedy', slug: 'comedy' },
      { name: 'Horror', slug: 'horror' },
      { name: 'Sci-Fi', slug: 'sci-fi' },
      { name: 'Drama', slug: 'drama' },
      { name: 'Romance', slug: 'romance' },
      { name: 'New Releases', slug: 'new' },
    ];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrendingMovies = async (req, res) => {
  try {
    const { data } = await tmdb.get("/trending/movie/week");
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPopularMovies = async (req, res) => {
  try {
    const { data } = await tmdb.get("/movie/popular");
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTopRatedMovies = async (req, res) => {
  try {
    const { data } = await tmdb.get("/movie/top_rated");
    res.json(data.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    const { data } = await tmdb.get("/search/movie", {
      params: {
        query: q,
      },
    });

    res.json(data.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  getFeaturedMovie,
  getMoviesByCategory,
  createMovie,
  updateMovie,
  deleteMovie,
  getSimilarMovies,
  getAllCategories,

  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  searchMovies,
  getMoviesByGenre,
};
