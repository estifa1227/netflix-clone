import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import MovieForm from '../../components/admin/MovieForm';
import { PageLoader } from '../../components/ui/Loader';

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await adminService.getMovieById(id);
        setMovie(data.movie || data);
      } catch {
        toast.error('Failed to load movie');
        navigate('/admin/movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await adminService.updateMovie(id, formData);
      toast.success('Movie updated successfully');
      navigate('/admin/movies');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update movie');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Edit Movie</h1>
      </div>

      <div className="bg-dark-lighter border border-dark-border rounded-xl p-6">
        <MovieForm initialData={movie} onSubmit={handleSubmit} loading={saving} />
      </div>
    </motion.div>
  );
};

export default AdminEditMovie;
