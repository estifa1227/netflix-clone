import { motion } from 'framer-motion';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            activeCategory === cat.id
              ? 'text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {activeCategory === cat.id && (
            <motion.div
              layoutId="category-bg"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
