import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import DataTable from '../../components/admin/DataTable';
import DeleteModal from '../../components/admin/DeleteModal';
import Pagination from '../../components/admin/Pagination';
import { PLACEHOLDER_POSTER } from '../../utils/constants';

const ITEMS_PER_PAGE = 10;

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: ITEMS_PER_PAGE, sort };
      if (search.trim()) params.search = search.trim();
      const res = await adminService.getMovies(params);
      const movieList = res.movies || res.data || res || [];
      setMovies(Array.isArray(movieList) ? movieList : []);
      setTotalPages(res.totalPages || Math.ceil((res.total || movieList.length) / ITEMS_PER_PAGE) || 1);
    } catch {
      toast.error('Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [page, sort, search]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteMovie(deleteTarget._id);
      toast.success('Movie deleted successfully');
      setDeleteTarget(null);
      fetchMovies();
    } catch {
      toast.error('Failed to delete movie');
    } finally {
      setDeleting(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const columns = [
    {
      key: 'poster',
      label: 'Poster',
      render: (row) => (
        <div className="w-10 h-14 rounded overflow-hidden bg-dark">
          <img
            src={row.poster || PLACEHOLDER_POSTER}
            alt={row.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = PLACEHOLDER_POSTER; }}
          />
        </div>
      ),
    },
    { key: 'title', label: 'Title', render: (row) => <span className="font-medium text-white">{row.title}</span> },
    { key: 'category', label: 'Category', render: (row) => <span className="capitalize">{row.category || '—'}</span> },
    {
      key: 'genre',
      label: 'Genre',
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {(row.genre || []).slice(0, 2).map((g) => (
            <span key={g} className="text-xs px-1.5 py-0.5 bg-dark rounded text-gray-400">{g}</span>
          ))}
          {(row.genre || []).length > 2 && (
            <span className="text-xs text-gray-500">+{row.genre.length - 2}</span>
          )}
        </div>
      ),
    },
    { key: 'rating', label: 'Rating', render: (row) => <span>{row.rating?.toFixed(1) || '—'}</span> },
    { key: 'year', label: 'Year' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Movies</h1>
        <button
          onClick={() => navigate('/admin/movies/add')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
        >
          <FiPlus size={16} />
          Add Movie
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search movies..."
            className="w-full pl-9 pr-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="rating-asc">Lowest Rated</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>

      <div className="bg-dark-lighter border border-dark-border rounded-xl overflow-hidden">
        <DataTable
          columns={columns}
          data={movies}
          loading={loading}
          emptyMessage="No movies found"
          onEdit={(row) => navigate(`/admin/movies/edit/${row._id}`)}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Movie"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </motion.div>
  );
};

export default AdminMovies;
