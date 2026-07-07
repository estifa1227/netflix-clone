import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch as FiSearchIcon, FiStar } from 'react-icons/fi';
import SearchBar from '../components/search/SearchBar';
import { SearchSkeleton } from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import { movieService } from '../services/movieService';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await movieService.search(query);
      setResults(data || []);
    } catch {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setResults([]);
    setSearched(false);
    setError(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen pt-20 sm:pt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
            Search Movies & Shows
          </h1>
          <SearchBar onSearch={handleSearch} onClear={handleClear} autoFocus />
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SearchSkeleton />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-gray-400">{error}</p>
            </motion.div>
          )}

          {searched && !loading && !error && results.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                icon={FiSearchIcon}
                title="No results found"
                description="Try adjusting your search terms or browse our categories"
              />
            </motion.div>
          )}

          {!loading && results.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-gray-500 mb-6">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {results.map((movie, i) => (
                  <motion.div
                    key={movie._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => navigate(`/movie/${movie._id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden relative">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div>
                          <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                            <span className="flex items-center gap-1">
                              <FiStar size={10} className="text-yellow-400" />
                              {movie.rating?.toFixed(1)}
                            </span>
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
            </motion.div>
          )}

          {!searched && !loading && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <FiSearchIcon size={48} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500">Start typing to search movies and shows</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Search;
