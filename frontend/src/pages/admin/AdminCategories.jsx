import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFolder } from 'react-icons/fi';
import { adminService } from '../../services/adminService';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await adminService.getCategories();
        const list = res.categories || res || [];
        setCategories(Array.isArray(list) ? list : []);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-dark-lighter rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-white mb-6">Categories</h1>

      <div className="bg-dark-lighter border border-dark-border rounded-xl overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No categories found</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-border">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.slug || cat.name || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FiFolder className="text-primary" size={18} />
                  <span className="text-sm font-medium text-white capitalize">
                    {cat.name || cat.slug || 'Unknown'}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-dark px-2.5 py-1 rounded-full">
                  Read-only
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        Categories are managed server-side. This view is read-only.
      </p>
    </motion.div>
  );
};

export default AdminCategories;
