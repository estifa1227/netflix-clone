import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiFilm, FiPlus, FiEdit, FiTrash2, FiUsers, FiFolder, FiBarChart2, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const SIDEBAR_LINKS = [
  { path: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { path: '/admin/movies', label: 'Movies', icon: FiFilm },
  { path: '/admin/movies/add', label: 'Add Movie', icon: FiPlus },
  { path: '/admin/users', label: 'Manage Users', icon: FiUsers },
  { path: '/admin/categories', label: 'Categories', icon: FiFolder },
  { path: '/admin/statistics', label: 'Statistics', icon: FiBarChart2 },
];

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path, end) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-dark-lighter border-r border-dark-border z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="flex items-center h-16 px-4 border-b border-dark-border">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight">
            <span className="text-primary">S</span>
            <span className="text-white">F</span>
          </span>
          {!isCollapsed && (
            <span className="text-sm font-semibold text-gray-400">Admin Panel</span>
          )}
        </Link>
      </div>

      <nav className="py-4">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path, link.end);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{link.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
        >
          <FiLogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
