import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiList, FiFilm, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ProfileDropdown = ({ onClose }) => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute right-0 mt-3 w-60 bg-dark-lighter border border-dark-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
    >
      <div className="px-4 py-3.5 border-b border-dark-border">
        <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
        <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
      </div>

      <div className="py-1.5">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <FiUser size={16} className="text-gray-500" />
          Profile
        </Link>
        <Link
          to="/mylist"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <FiList size={16} className="text-gray-500" />
          My List
        </Link>
        {isAdmin && (
          <Link
            to="/admin"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FiFilm size={16} className="text-gray-500" />
            Admin Panel
          </Link>
        )}
      </div>

      <div className="border-t border-dark-border py-1.5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <FiLogOut size={16} className="text-gray-500" />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;
