import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilm, FiUsers, FiStar, FiFolder } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { adminService } from '../../services/adminService';
import StatsCard from '../../components/admin/StatsCard';
import { GENRES } from '../../utils/constants';

const COLORS = ['#E50914', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1'];

const AdminStatistics = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.allSettled([
          adminService.getMovies({ limit: 200 }),
          adminService.getUsers(),
        ]);

        const movieList = moviesRes.status === 'fulfilled'
          ? (moviesRes.value.movies || moviesRes.value.data || moviesRes.value || [])
          : [];
        const userList = usersRes.status === 'fulfilled'
          ? (usersRes.value.users || usersRes.value || [])
          : [];

        setMovies(Array.isArray(movieList) ? movieList : []);
        setUsers(Array.isArray(userList) ? userList : []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const moviesByCategory = {};
  (movies || []).forEach((m) => {
    const cat = m.category || 'uncategorized';
    moviesByCategory[cat] = (moviesByCategory[cat] || 0) + 1;
  });
  const categoryChartData = Object.entries(moviesByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const moviesByGenre = {};
  (movies || []).forEach((m) => {
    (m.genre || []).forEach((g) => {
      moviesByGenre[g] = (moviesByGenre[g] || 0) + 1;
    });
  });
  const genreChartData = Object.entries(moviesByGenre).map(([name, value]) => ({
    name: GENRES.find((g) => g.id === name)?.name || name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const monthlyData = {};
  (movies || []).forEach((m) => {
    if (m.createdAt) {
      const date = new Date(m.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[key] = (monthlyData[key] || 0) + 1;
    }
  });
  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([name, value]) => ({ name, value }));

  const avgRating = movies.length > 0
    ? (movies.reduce((sum, m) => sum + (m.rating || 0), 0) / movies.length).toFixed(1)
    : '—';

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
      <h1 className="text-2xl font-bold text-white mb-6">Statistics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Movies" value={movies.length} icon={FiFilm} color="text-primary" delay={0} />
        <StatsCard title="Total Users" value={users.length} icon={FiUsers} color="text-blue-400" delay={0.1} />
        <StatsCard title="Categories" value={Object.keys(moviesByCategory).length} icon={FiFolder} color="text-green-400" delay={0.2} />
        <StatsCard title="Average Rating" value={avgRating} icon={FiStar} color="text-yellow-400" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-lighter border border-dark-border rounded-xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-4">Movies per Category</h2>
          {categoryChartData.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-lighter border border-dark-border rounded-xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-4">Movies per Genre</h2>
          {genreChartData.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genreChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} stroke="#333" />
                <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} stroke="#333" width={90} />
                <Tooltip
                  contentStyle={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#E50914" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-dark-lighter border border-dark-border rounded-xl p-5"
      >
        <h2 className="text-lg font-bold text-white mb-4">Monthly Added Movies</h2>
        {monthlyChartData.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} stroke="#333" />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} stroke="#333" />
              <Tooltip
                contentStyle={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminStatistics;
