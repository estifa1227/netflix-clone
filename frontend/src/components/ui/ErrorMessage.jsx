import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorMessage = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <FiAlertTriangle className="text-red-400" size={28} />
      </div>
      <p className="text-gray-400 text-sm text-center mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary text-sm">
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
