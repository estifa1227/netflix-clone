import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-primary select-none pointer-events-none">
          404
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          className="text-8xl sm:text-9xl font-black text-primary mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          404
        </motion.h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Lost your way?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
        >
          <FiHome size={18} />
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
