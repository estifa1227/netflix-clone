export const GENRES = [
  { id: 'action', name: 'Action' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'drama', name: 'Drama' },
  { id: 'horror', name: 'Horror' },
  { id: 'romance', name: 'Romance' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'documentary', name: 'Documentary' },
  { id: 'animation', name: 'Animation' },
];

export const CATEGORIES = [
  { id: "trending", name: "Trending Now", endpoint: "trending" },
  { id: "popular", name: "Popular on StreamFlix", endpoint: "popular" },
  { id: "top-rated", name: "Top Rated", endpoint: "top-rated" },

  { id: "action", name: "Action & Adventure", genreId: 28 },
  { id: "adventure", name: "Adventure", genreId: 12 },
  { id: "comedy", name: "Comedy", genreId: 35 },
  { id: "drama", name: "Drama", genreId: 18 },
  { id: "horror", name: "Horror", genreId: 27 },
  { id: "romance", name: "Romance", genreId: 10749 },
  { id: "sci-fi", name: "Sci-Fi", genreId: 878 },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'rating-asc', label: 'Lowest Rated' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
];

export const ITEMS_PER_PAGE = 20;

export const PLACEHOLDER_POSTER = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&q=80';
export const PLACEHOLDER_BANNER = 'https://images.unsplash.com/photo-1626814026160-223c0f7e4b6c?w=1200&q=80';
