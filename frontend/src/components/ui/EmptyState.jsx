import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionPath,
  onAction,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {Icon && (
        <div className="w-20 h-20 rounded-full bg-dark-lighter flex items-center justify-center mb-6">
          <Icon className="text-gray-600" size={40} />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-300 mb-2 text-center">
        {title || 'Nothing here yet'}
      </h3>
      {description && (
        <p className="text-gray-500 text-sm text-center max-w-sm mb-8">
          {description}
        </p>
      )}
      {(actionLabel && (actionPath || onAction)) && (
        <button onClick={handleAction} className="btn-primary">
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
