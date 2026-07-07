import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color = 'text-primary', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-dark-lighter border border-dark-border rounded-xl p-5 hover:border-gray-700 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-dark ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
