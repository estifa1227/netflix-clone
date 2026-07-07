export const formatRating = (rating) => {
  if (!rating && rating !== 0) return 'N/A';
  return Number(rating).toFixed(1);
};

export const formatYear = (year) => {
  if (!year) return '';
  return String(year);
};

export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text || '';
  return text.slice(0, maxLength).trimEnd() + '...';
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
