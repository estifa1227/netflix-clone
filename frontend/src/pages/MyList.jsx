import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiTrash2, FiStar } from 'react-icons/fi';
import { useMyList } from '../context/MyListContext';
import { MovieCardSkeleton } from '../components/ui/SkeletonLoader';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';

const MyList = () => {
  const { movies, loading, error, fetchList, removeMovie } = useMyList();
  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleRemove = async (e, id) => {
    e.stopPropagation();
    try {
      await removeMovie(id);
    } catch {
      // silently fail
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen pt-20 sm:pt-24 pb-16"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <FiHeart className="text-primary" size={20} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">My List</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchList} />
        ) : movies.length === 0 ? (
          <EmptyState
            icon={FiHeart}
            title="Your list is empty"
            description="Add movies and shows to watch later"
            actionLabel="Browse Movies"
            actionPath="/browse"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {movies.map((movie, i) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group cursor-pointer relative"
                onClick={() => navigate(`/movie/${movie._id}`)}
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
                        <span className="flex items-center gap-1">
                          <FiStar size={10} className="text-yellow-400" />
                          {movie.rating?.toFixed(1)}
                        </span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => handleRemove(e, movie._id)}
                  className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500/80 hover:scale-110"
                  aria-label="Remove from list"
                >
                  <FiTrash2 size={14} />
                </button>
                <h3 className="text-sm text-gray-300 mt-2 truncate group-hover:text-white transition-colors">
                  {movie.title}
                </h3>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyList;
