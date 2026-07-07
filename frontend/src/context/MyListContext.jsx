import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { myListService } from '../services/myListService';
import { useAuth } from './AuthContext';

const MyListContext = createContext(null);

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
};

export const MyListProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = useCallback(async () => {
    if (!isAuthenticated) {
      setMovies([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await myListService.getAll();
      setMovies(data || []);
    } catch (err) {
      setError('Failed to load your list');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const addMovie = useCallback(async (movieId) => {
    try {
      await myListService.add(movieId);
      await fetchList();
      return true;
    } catch {
      throw new Error('Failed to add movie');
    }
  }, [fetchList]);

  const removeMovie = useCallback(async (movieId) => {
    try {
      await myListService.remove(movieId);
      setMovies((prev) => prev.filter((m) => m._id !== movieId));
      return true;
    } catch {
      throw new Error('Failed to remove movie');
    }
  }, []);

  const isInList = useCallback(
    (movieId) => movies.some((m) => m._id === movieId),
    [movies]
  );

  const value = {
    movies,
    loading,
    error,
    fetchList,
    addMovie,
    removeMovie,
    isInList,
  };

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>;
};
