import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/movie/HeroBanner';
import MovieRow from '../components/movie/MovieRow';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { movieService } from '../services/movieService';
import { CATEGORIES } from '../utils/constants';

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [categoryMovies, setCategoryMovies] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [errorStates, setErrorStates] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
   const loadFeatured = async () => {
  try {
    const data = await movieService.getFeatured();

    setFeatured({
      ...data,
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      banner: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
      description: data.overview,
      year: data.release_date?.split("-")[0],
      rating: data.vote_average,
    });
  } catch {
    setFeatured(null);
  }
};
  loadFeatured();
  }, []);

  const loadCategory = useCallback(async (cat) => {
    const key = cat.id;
    setLoadingStates((prev) => ({ ...prev, [key]: true }));
    setErrorStates((prev) => ({ ...prev, [key]: null }));

try {
  let data = [];

  if (cat.endpoint === "trending") {
    data = await movieService.getTrending();
  } else if (cat.endpoint === "popular") {
    data = await movieService.getPopular();
  } else if (cat.endpoint === "top-rated") {
    data = await movieService.getTopRated();
  } else if (cat.genreId) {
    data = await movieService.getByGenre(cat.genreId);
  }
 const formatted = data.map((movie) => ({
    ...movie,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    banner: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
    description: movie.overview,
    year: movie.release_date?.split("-")[0],
    rating: movie.vote_average,
  }));

      setCategoryMovies((prev) => ({ ...prev, [key]: formatted }));
    } catch {
      setCategoryMovies((prev) => ({ ...prev, [key]: [] }));
      setErrorStates((prev) => ({ ...prev, [key]: 'Failed to load movies.' }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    }
  }, []);

  useEffect(() => {
    const loadAllCategories = async () => {
      setPageLoading(true);
      await Promise.all(CATEGORIES.map(loadCategory));
      setPageLoading(false);
    };
    loadAllCategories();
  }, [loadCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen"
    >
      <HeroBanner movie={featured} />

      <div className="relative z-10 -mt-20 sm:-mt-32 pb-8">
        {CATEGORIES.map((cat) => (
          <MovieRow
            key={cat.id}
            title={cat.name}
            movies={categoryMovies[cat.id]}
            loading={loadingStates[cat.id]}
            error={errorStates[cat.id]}
            onRetry={() => loadCategory(cat)}
          />
        ))}
      </div>

      <ScrollToTopButton />
    </motion.div>
  );
};

export default Home;
