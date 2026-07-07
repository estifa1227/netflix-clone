import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiGrid, FiSearch, FiHeart, FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const MobileNav = ({ onClose }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/browse', label: 'Browse', icon: FiGrid },
    { path: '/search', label: 'Search', icon: FiSearch },
    ...(isAuthenticated
      ? [
          { path: '/mylist', label: 'My List', icon: FiHeart },
          { path: '/profile', label: 'Profile', icon: FiUser },
        ]
      : [
          { path: '/login', label: 'Sign In', icon: FiLogIn },
          { path: '/register', label: 'Sign Up', icon: FiUserPlus },
        ]),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 md:hidden"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-[280px] bg-dark-lighter border-l border-dark-border"
      >
        <div className="p-6 pt-20">
          <div className="text-2xl font-black mb-8">
            <span className="text-primary">Stream</span>
            <span className="text-white">Flix</span>
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={20} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileNav;
