import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiCheck, FiStar, FiClock, FiCalendar, FiArrowLeft, FiYoutube } from 'react-icons/fi';
import { movieService } from '../services/movieService';
import { useAuth } from '../context/AuthContext';
import { useMyList } from '../context/MyListContext';
import MovieCard from '../components/movie/MovieCard';
import VideoModal from '../components/ui/VideoModal';
import { MovieDetailSkeleton } from '../components/ui/SkeletonLoader';
import ErrorMessage from '../components/ui/ErrorMessage';
import { PLACEHOLDER_BANNER } from '../utils/constants';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInList, addMovie, removeMovie } = useMyList();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [addingToList, setAddingToList] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setImgError(false);
      try {
        const [movieData, similarData] = await Promise.all([
          movieService.getById(id),
          movieService.getSimilar(id),
        ]);
        setMovie(movieData);
        setSimilar(similarData || []);
      } catch {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const inList = movie ? isInList(movie._id) : false;

  const handleToggleList = async () => {
    if (!isAuthenticated) return navigate('/login');
    setAddingToList(true);
    try {
      if (inList) {
        await removeMovie(movie._id);
      } else {
        await addMovie(movie._id);
      }
    } catch {
      // silently fail
    } finally {
      setAddingToList(false);
    }
  };

  if (loading) return <MovieDetailSkeleton />;
  if (error) {
    return (
      <div className="bg-dark min-h-screen pt-24 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }
  if (!movie) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen"
    >
      <div className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh]">
        <img
          src={imgError ? PLACEHOLDER_BANNER : movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 sm:top-24 left-4 sm:left-8 lg:left-16 z-10 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm group-hover:bg-black/60 transition-colors">
            <FiArrowLeft size={20} />
          </div>
          <span className="text-sm font-medium hidden sm:block">Back</span>
        </button>
      </div>

      <div className="relative z-10 -mt-32 sm:-mt-48 md:-mt-56">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="w-40 sm:w-48 md:w-56 lg:w-64 flex-shrink-0 mx-auto md:mx-0">
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl shadow-black/50"
              />
            </div>

            <div className="flex-1 pt-2 md:pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {(movie.genre || []).map((g) => (
                    <span
                      key={g}
                      className="text-xs font-medium bg-primary/15 text-primary border border-primary/25 px-3 py-1 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <FiStar size={16} className="text-yellow-400" />
                    <span className="text-yellow-400 font-bold">{movie.rating?.toFixed(1)}</span>
                    <span className="text-gray-600">/10</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={14} />
                    {movie.year}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock size={14} />
                    {movie.duration}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 max-w-3xl">
                  {movie.description}
                </p>

                {movie.director && (
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="text-gray-500">Director:</span>{' '}
                    <span className="text-gray-300">{movie.director}</span>
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-6 mb-8">
                  <button
                    onClick={() => setTrailerOpen(true)}
                    className="bg-white hover:bg-gray-200 text-dark font-bold px-6 sm:px-8 py-3 rounded-lg flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                  >
                    <FiPlay size={20} fill="currentColor" />
                    Play
                  </button>
                  <button
                    onClick={handleToggleList}
                    disabled={addingToList}
                    className={`font-semibold px-5 sm:px-6 py-3 rounded-lg flex items-center gap-2.5 transition-all duration-300 border ${
                      inList
                        ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {inList ? <FiCheck size={18} /> : <FiPlus size={18} />}
                    {inList ? 'In Your List' : 'Add to List'}
                  </button>
                  {movie.trailer && (
                    <button
                      onClick={() => setTrailerOpen(true)}
                      className="btn-ghost flex items-center gap-2"
                    >
                      <FiYoutube size={18} />
                      Trailer
                    </button>
                  )}
                </div>

                {movie.cast?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-4">Cast</h3>
                    <div className="flex flex-wrap gap-3">
                      {movie.cast.map((actor, i) => (
                        <div
                          key={i}
                          className="glass rounded-xl px-4 py-2.5 text-sm"
                        >
                          <p className="text-white font-medium">{actor.name}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{actor.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {similar.length > 0 && (
            <motion.div
              className="mt-12 pb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">More Like This</h2>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4">
                {similar.map((m) => (
                  <MovieCard key={m._id} movie={m} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <VideoModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerUrl={movie.trailer}
      />
    </motion.div>
  );
};

export default MovieDetails;
