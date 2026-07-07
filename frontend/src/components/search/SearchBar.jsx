import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from '../../hooks/useDebounce';
import { useAuth } from '../../context/AuthContext';

const SearchBar = ({ onSearch, onClear, autoFocus = false }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch?.(debouncedQuery.trim());
    } else {
      onClear?.();
    }
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <FiSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={22}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, genre, or actor..."
        className="w-full bg-dark-lighter border border-dark-border rounded-xl pl-12 pr-12 py-4
                   text-white placeholder-gray-500 text-base sm:text-lg
                   transition-all duration-300
                   focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                   hover:border-gray-600"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white
                     transition-colors p-1 rounded-full hover:bg-white/5"
          aria-label="Clear search"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
