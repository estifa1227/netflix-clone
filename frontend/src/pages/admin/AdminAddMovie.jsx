import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import MovieForm from '../../components/admin/MovieForm';

const AdminAddMovie = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await adminService.createMovie(formData);
      toast.success('Movie added successfully');
      navigate('/admin/movies');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Add Movie</h1>
      </div>

      <div className="bg-dark-lighter border border-dark-border rounded-xl p-6">
        <MovieForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </motion.div>
  );
};

export default AdminAddMovie;
