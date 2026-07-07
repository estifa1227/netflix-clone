import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiChevronDown, FiLogOut, FiUser, FiFilm, FiList, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useScroll } from '../../hooks/useScroll';
import ProfileDropdown from './ProfileDropdown';
import MobileNav from './MobileNav';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/browse', label: 'Browse' },
];

const Navbar = () => {
  const { scrolled } = useScroll(60);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    setShowDropdown(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  if (isAuthPage) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            <div className="flex items-center gap-10">
              <Link to="/" className="flex-shrink-0 group">
                <span className="text-2xl sm:text-3xl font-black tracking-tight">
                  <span className="text-primary group-hover:text-red-400 transition-colors duration-300">Stream</span>
                  <span className="text-white">Flix</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/mylist"
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      location.pathname === '/mylist'
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    My List
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/search')}
                className="p-2.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <FiChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${
                        showDropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {showDropdown && <ProfileDropdown onClose={() => setShowDropdown(false)} />}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link to="/login" className="btn-ghost text-sm">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-sm !px-4 !py-2">
                    Get Started
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
