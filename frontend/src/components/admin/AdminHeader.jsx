import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ onToggle }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-dark-lighter/95 backdrop-blur-xl border-b border-dark-border">
      <div className="flex items-center justify-between h-full px-6">
        <button
          onClick={onToggle}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
