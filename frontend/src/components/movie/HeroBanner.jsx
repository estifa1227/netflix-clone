import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiInfo, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useMyList } from '../../context/MyListContext';
import { PLACEHOLDER_BANNER } from '../../utils/constants';

const HeroBanner = ({ movie }) => {
  const [imgError, setImgError] = useState(false);
  const [addingToList, setAddingToList] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInList, addMovie } = useMyList();

  if (!movie) return null;
  const movieId = movie.id || movie._id;

  const inList = isInList(movieId);

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
    <div className="relative w-full h-[80vh] sm:h-[85vh] min-h-[500px] md:min-h-[600px]">
      <div className="absolute inset-0">
        
  <img
  src={
    imgError
      ? PLACEHOLDER_BANNER
      : movie.banner.startsWith("http")
      ? movie.banner
      : `https://image.tmdb.org/t/p/original${movie.banner}`
  }
  alt={movie.title}
  className="w-full h-full object-cover"
  onError={() => setImgError(true)}
/>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-gradient-right" />
      </div>

      <div className="relative z-10 h-full flex items-end md:items-center pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/90 text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                Featured
              </span>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                  ★ {movie.rating?.toFixed(1)}
                </span>
                <span className="text-gray-300">{movie.year}</span>
                <span className="text-gray-300">{movie.duration}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-5">
              {(movie.genre || []).slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="text-xs font-medium bg-white/10 backdrop-blur-sm text-gray-200 px-3 py-1 rounded-full border border-white/10"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-sm sm:text-base text-gray-300 mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed max-w-xl">
              {movie.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
               onClick={() => navigate(`/movie/${movieId}`)}
                className="bg-white hover:bg-gray-200 text-dark font-bold px-6 sm:px-8 py-3 rounded-lg flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              >
                <FiPlay size={20} fill="currentColor" />
                Play
              </button>
              <button
                onClick={handleAddToList}
                disabled={addingToList}
                className={`font-semibold px-5 sm:px-6 py-3 rounded-lg flex items-center gap-2.5 transition-all duration-300 border ${
                  inList
                    ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {inList ? <FiCheck size={18} /> : <FiPlus size={18} />}
                {inList ? 'In Your List' : 'My List'}
              </button>
              <button
                onClick={() => navigate(`/movie/${movieId}`)}
                className="text-gray-300 hover:text-white font-medium px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300"
              >
                <FiInfo size={20} />
                <span className="hidden sm:inline">More Info</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
