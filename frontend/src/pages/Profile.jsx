import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiSave, FiCamera } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { ProfileSkeleton } from '../components/ui/SkeletonLoader';

const Profile = () => {
  const { user, loading: authLoading, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (authLoading) return <ProfileSkeleton />;
  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);

    try {
      const updateData = { name, email };
      if (password.trim()) updateData.password = password;

      const updated = await authService.updateProfile(updateData);
      updateUser(updated);
      setMessage('Profile updated successfully');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen pt-20 sm:pt-24 pb-16"
    >
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">Profile</h1>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-dark-border">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <FiCamera size={20} className="text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
              {user.isAdmin && (
                <span className="inline-block mt-1.5 text-xs font-medium bg-primary/15 text-primary border border-primary/25 px-2.5 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </div>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {message}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="profile-name" className="text-sm text-gray-400 mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="profile-email" className="text-sm text-gray-400 mb-2 block">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="profile-password" className="text-sm text-gray-400 mb-2 block">
                New Password{' '}
                <span className="text-gray-600 font-normal">(leave blank to keep current)</span>
              </label>
              <input
                id="profile-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter new password"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiSave size={18} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
