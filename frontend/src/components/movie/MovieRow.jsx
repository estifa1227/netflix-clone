// import { useRef, useState, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import MovieCard from './MovieCard';
// import { MovieCardSkeleton } from '../ui/SkeletonLoader';
// import ErrorMessage from '../ui/ErrorMessage';

// const MovieRow = ({ title, movies, loading, error, onRetry }) => {
//   const rowRef = useRef(null);
//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(true);
//   const [isScrolling, setIsScrolling] = useState(false);

//   const updateArrows = useCallback(() => {
//     const el = rowRef.current;
//     if (!el) return;
//     setShowLeft(el.scrollLeft > 10);
//     setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
//   }, []);

//   const scroll = (direction) => {
//     const el = rowRef.current;
//     if (!el || isScrolling) return;
//     setIsScrolling(true);

//     const scrollAmount = el.clientWidth * 0.75;
//     el.scrollBy({
//       left: direction === 'left' ? -scrollAmount : scrollAmount,
//       behavior: 'smooth',
//     });

//     setTimeout(() => {
//       updateArrows();
//       setIsScrolling(false);
//     }, 400);
//   };

//   const handleScroll = useCallback(() => {
//     if (!isScrolling) updateArrows();
//   }, [isScrolling, updateArrows]);

//   return (
//     <motion.div
//       className="mb-8 sm:mb-10 group/row"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true, margin: '-100px' }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-center justify-between mb-4 px-4 sm:px-8 lg:px-16">
//         <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{title}</h2>
//         {movies?.length > 0 && (
//           <span className="text-xs text-gray-500 hidden sm:block">{movies.length} titles</span>
//         )}
//       </div>

//       <div className="relative px-4 sm:px-8 lg:px-16">
//         {showLeft && (
//           <button
//             onClick={() => scroll('left')}
//             className="absolute left-0 sm:left-4 lg:left-8 top-0 bottom-0 z-20 w-12 md:w-16
//                        bg-black/60 hover:bg-black/80 transition-all duration-300
//                        flex items-center justify-center
//                        opacity-0 group-hover/row:opacity-100 focus:opacity-100"
//             aria-label="Scroll left"
//           >
//             <FiChevronLeft size={30} className="text-white" />
//           </button>
//         )}

//         {loading ? (
//           <div className="flex gap-2 overflow-hidden">
//             {Array.from({ length: 7 }).map((_, i) => (
//               <MovieCardSkeleton key={i} />
//             ))}
//           </div>
//         ) : error ? (
//           <ErrorMessage message={error} onRetry={onRetry} />
//         ) : movies?.length === 0 ? (
//           <p className="text-gray-500 text-sm py-8 text-center">
//             No movies available in this category yet.
//           </p>
//         ) : (
//           <div
//             ref={rowRef}
//             onScroll={handleScroll}
//             className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 scroll-smooth"
//           >
//             {movies && movies.map((movie, index) => (
//               <MovieCard key={movie._id} movie={movie} index={index} />
//             ))}
//           </div>
//         )}

//         {showRight && movies?.length > 0 && !loading && (
//           <button
//             onClick={() => scroll('right')}
//             className="absolute right-0 sm:right-4 lg:right-8 top-0 bottom-0 z-20 w-12 md:w-16
//                        bg-black/60 hover:bg-black/80 transition-all duration-300
//                        flex items-center justify-center
//                        opacity-0 group-hover/row:opacity-100 focus:opacity-100"
//             aria-label="Scroll right"
//           >
//             <FiChevronRight size={30} className="text-white" />
//           </button>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default MovieRow;
import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from './MovieCard';
import { MovieCardSkeleton } from '../ui/SkeletonLoader';
import ErrorMessage from '../ui/ErrorMessage';

const MovieRow = ({ title, movies, loading, error, onRetry }) => {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (direction) => {
    const el = rowRef.current;
    if (!el || isScrolling) return;
    setIsScrolling(true);

    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      updateArrows();
      setIsScrolling(false);
    }, 400);
  };

  const handleScroll = useCallback(() => {
    if (!isScrolling) updateArrows();
  }, [isScrolling, updateArrows]);

  return (
    <motion.div
      className="mb-8 sm:mb-10 group/row"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4 px-4 sm:px-8 lg:px-16">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{title}</h2>
        {movies?.length > 0 && (
          <span className="text-xs text-gray-500 hidden sm:block">{movies.length} titles</span>
        )}
      </div>

      <div className="relative px-4 sm:px-8 lg:px-16">
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 sm:left-4 lg:left-8 top-0 bottom-0 z-20 w-12 md:w-16
                       bg-black/60 hover:bg-black/80 transition-all duration-300
                       flex items-center justify-center
                       opacity-0 group-hover/row:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={30} className="text-white" />
          </button>
        )}

        {loading ? (
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={onRetry} />
        ) : !movies || movies.length === 0 ? (
          <p className="text-gray-500 text-sm py-8 text-center">
            No movies available in this category yet.
          </p>
        ) : (
          <div
            ref={rowRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 scroll-smooth"
          >
            {movies.map((movie, index) => (
              <MovieCard key={movie.id || movie._id} movie={movie} index={index} />
            ))}
          </div>
        )}

        {showRight && movies && movies.length > 0 && !loading && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 sm:right-4 lg:right-8 top-0 bottom-0 z-20 w-12 md:w-16
                       bg-black/60 hover:bg-black/80 transition-all duration-300
                       flex items-center justify-center
                       opacity-0 group-hover/row:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <FiChevronRight size={30} className="text-white" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MovieRow;
