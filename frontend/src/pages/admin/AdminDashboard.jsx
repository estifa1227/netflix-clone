import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilm, FiUsers, FiFolder, FiStar, FiTrendingUp } from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import StatsCard from '../../components/admin/StatsCard';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalCategories: 0,
    latestMovies: [],
    latestUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [moviesRes, usersRes, categoriesRes] = await Promise.allSettled([
          adminService.getMovies({ limit: 5 }),
          adminService.getUsers(),
          adminService.getCategories(),
        ]);

        const movies = moviesRes.status === 'fulfilled' ? (moviesRes.value.movies || moviesRes.value || []) : [];
        const users = usersRes.status === 'fulfilled' ? (usersRes.value.users || usersRes.value || []) : [];
        const categories = categoriesRes.status === 'fulfilled' ? (categoriesRes.value || []) : [];

        const movieList = Array.isArray(movies) ? movies : [];
        const userList = Array.isArray(users) ? users : [];

        setStats({
          totalMovies: movieList.length,
          totalUsers: userList.length,
          totalCategories: categories.length,
          latestMovies: movieList.slice(0, 5),
          latestUsers: userList.slice(0, 5),
        });
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-dark-lighter rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Movies" value={stats.totalMovies} icon={FiFilm} color="text-primary" delay={0} />
        <StatsCard title="Total Users" value={stats.totalUsers} icon={FiUsers} color="text-blue-400" delay={0.1} />
        <StatsCard title="Categories" value={stats.totalCategories} icon={FiFolder} color="text-green-400" delay={0.2} />
        <StatsCard title="Avg Rating" value="—" icon={FiStar} color="text-yellow-400" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-lighter border border-dark-border rounded-xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-primary" />
            Latest Movies
          </h2>
          {stats.latestMovies.length === 0 ? (
            <p className="text-gray-500 text-sm">No movies found</p>
          ) : (
            <div className="space-y-3">
              {stats.latestMovies.map((movie, i) => (
                <div key={movie._id || i} className="flex items-center gap-3">
                  <div className="w-10 h-14 rounded overflow-hidden bg-dark flex-shrink-0">
                    <img
                      src={movie.poster || ''}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{movie.title}</p>
                    <p className="text-xs text-gray-500">{movie.year} {movie.rating ? `· ${movie.rating}` : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-lighter border border-dark-border rounded-xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FiUsers className="text-blue-400" />
            Latest Users
          </h2>
          {stats.latestUsers.length === 0 ? (
            <p className="text-gray-500 text-sm">No users found</p>
          ) : (
            <div className="space-y-3">
              {stats.latestUsers.map((user, i) => (
                <div key={user._id || i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${user.isAdmin ? 'bg-yellow-400/10 text-yellow-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
