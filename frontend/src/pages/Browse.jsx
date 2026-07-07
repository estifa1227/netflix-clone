import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovieRow from '../components/movie/MovieRow';
import CategoryTabs from '../components/movie/CategoryTabs';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { movieService } from '../services/movieService';
import { CATEGORIES } from '../utils/constants';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'title-asc', label: 'Title A-Z' },
];

const Browse = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [allMovies, setAllMovies] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState({});
  const [error, setError] = useState(null);
  const [categoryError, setCategoryError] = useState({});

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.getAll({});
      setAllMovies(data);
    } catch {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const fetchCategories = async () => {
      const results = {};
      const loadingMap = {};
      const errorMap = {};
      CATEGORIES.forEach((cat) => { loadingMap[cat.id] = true; });
      setCategoryLoading(loadingMap);

      await Promise.all(
        CATEGORIES.map(async (cat) => {
          try {
            let data;
            if (cat.endpoint === "trending") {
  data = await movieService.getTrending();
} else if (cat.endpoint === "popular") {
  data = await movieService.getPopular();
} else if (cat.endpoint === "top-rated") {
  data = await movieService.getTopRated();
} else if (cat.genreId) {
  data = await movieService.getByGenre(cat.genreId);
} else {
  data = [];
}

results[cat.id] = data.map((movie) => ({
  ...movie,
  poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  banner: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
  description: movie.overview,
  year: movie.release_date?.split("-")[0],
  rating: movie.vote_average,
}));
            errorMap[cat.id] = null;
          } catch {
            results[cat.id] = [];
            errorMap[cat.id] = 'Failed to load';
          } finally {
            loadingMap[cat.id] = false;
          }
        })
      );
      setCategoryMovies(results);
      setCategoryLoading(loadingMap);
      setCategoryError(errorMap);
    };
    fetchCategories();
  }, []);

  const sortMovies = (movies) => {
    const sorted = [...movies];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'title-asc':
        return sorted.sort((a, b) => (a.title || '').localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const getFilteredMovies = () => {
    if (activeCategory === 'all') {
      return sortMovies(allMovies);
    }
    return sortMovies(categoryMovies[activeCategory] || []);
  };

  const categories = [
    { id: 'all', name: 'All' },
    ...CATEGORIES.map(({ id, name }) => ({ id, name })),
  ];

  const displayMovies = getFilteredMovies();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen pt-20 sm:pt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Browse Movies
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-lighter border border-dark-border text-gray-300 text-sm rounded-lg
                         px-4 py-2.5 focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {activeCategory === 'all' ? (
          <>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="skeleton aspect-[2/3] rounded-lg bg-dark-lighter" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-gray-400 mb-4">{error}</p>
                <button onClick={fetchAll} className="btn-secondary">Try Again</button>
              </div>
            ) : displayMovies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No movies found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {displayMovies.map((movie, i) => (
                  <motion.div
                    key={movie._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => navigate(`/movie/${movie._id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="w-full">
                          <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                            <span>★ {movie.rating?.toFixed(1)}</span>
                            <span>{movie.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm text-gray-300 mt-2 truncate group-hover:text-white transition-colors">
                      {movie.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <MovieRow
            title=""
            movies={displayMovies}
            loading={categoryLoading[activeCategory]}
            error={categoryError[activeCategory]}
          />
        )}
      </div>

      <Footer />
      <ScrollToTopButton />
    </motion.div>
  );
};

export default Browse;
