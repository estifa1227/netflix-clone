import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiCheck, FiStar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useMyList } from '../../context/MyListContext';
import { PLACEHOLDER_POSTER } from '../../utils/constants';

const MovieCard = ({ movie, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [addingToList, setAddingToList] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInList, addMovie } = useMyList();
  const timeoutRef = useRef(null);

  const movieId = movie.id || movie._id;
  const inList = isInList(movieId);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsHovered(true), 400);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  const handleAddToList = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/login');
    setAddingToList(true);
    try {
      await addMovie(movieId);
    } catch {
      // silently fail
    } finally {
      setAddingToList(false);
    }
  };

  return (
    <motion.div
      className="relative flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/movie/${movieId}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <div
        className={`relative overflow-hidden rounded-lg transition-all duration-500 ease-out ${
          isHovered
            ? 'scale-[1.15] shadow-2xl shadow-black/60 z-30 -mx-2'
            : 'shadow-lg shadow-black/30'
        }`}
      >
        <div className="aspect-[2/3]">
          <img
            src={imgError ? PLACEHOLDER_POSTER : (movie.poster || PLACEHOLDER_POSTER)}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movieId}`); }}
                className="bg-primary hover:bg-primary-hover text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-lg shadow-primary/30"
                aria-label="Play"
              >
                <FiPlay size={16} fill="currentColor" />
              </button>
              <button
                onClick={handleAddToList}
                disabled={addingToList}
                className={`p-2 rounded-full transition-all duration-200 border ${
                  inList
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
                aria-label={inList ? 'Remove from list' : 'Add to list'}
              >
                {inList ? <FiCheck size={14} /> : <FiPlus size={14} />}
              </button>
            </div>
            <h3 className="text-white font-bold text-sm truncate leading-tight">
              {movie.title}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-300">
              <span className="flex items-center gap-1">
                <FiStar size={10} className="text-yellow-400" />
                {movie.rating?.toFixed(1)}
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2.5 px-0.5">
        <h3 className="text-sm font-medium text-gray-300 truncate">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
          <span className="flex items-center gap-1">
            <FiStar size={10} className="text-yellow-400" />
            {movie.rating?.toFixed(1)}
          </span>
          <span>{movie.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
