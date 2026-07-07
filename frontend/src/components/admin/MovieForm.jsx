import { useState, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { GENRES } from '../../utils/constants';
import { PLACEHOLDER_POSTER } from '../../utils/constants';

const CATEGORIES = [
  { value: 'trending', label: 'Trending' },
  { value: 'popular', label: 'Popular' },
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'horror', label: 'Horror' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'drama', label: 'Drama' },
  { value: 'romance', label: 'Romance' },
  { value: 'new', label: 'New Releases' },
];

const INITIAL_STATE = {
  title: '',
  description: '',
  year: '',
  duration: '',
  genre: [],
  category: '',
  rating: '',
  director: '',
  cast: [],
  trailer: '',
};

const MovieForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [poster, setPoster] = useState(null);
  const [banner, setBanner] = useState(null);
  const [posterPreview, setPosterPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [castInput, setCastInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        year: initialData.year?.toString() || '',
        duration: initialData.duration || '',
        genre: initialData.genre || [],
        category: initialData.category || '',
        rating: initialData.rating?.toString() || '',
        director: initialData.director || '',
        cast: initialData.cast || [],
        trailer: initialData.trailer || '',
      });
      setPosterPreview(initialData.poster || '');
      setBannerPreview(initialData.banner || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleGenreToggle = (genreId) => {
    setForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(genreId)
        ? prev.genre.filter((g) => g !== genreId)
        : [...prev.genre, genreId],
    }));
  };

  const handleAddCast = () => {
    const name = castInput.trim();
    if (!name) return;
    setForm((prev) => ({ ...prev, cast: [...prev.cast, { name, role: '' }] }));
    setCastInput('');
  };

  const handleRemoveCast = (index) => {
    setForm((prev) => ({
      ...prev,
      cast: prev.cast.filter((_, i) => i !== index),
    }));
  };

  const handleCastRoleChange = (index, role) => {
    setForm((prev) => ({
      ...prev,
      cast: prev.cast.map((c, i) => (i === index ? { ...c, role } : c)),
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.year) errs.year = 'Year is required';
    else if (isNaN(form.year) || form.year < 1800 || form.year > 2100) errs.year = 'Invalid year';
    if (!form.duration.trim()) errs.duration = 'Duration is required';
    if (form.genre.length === 0) errs.genre = 'Select at least one genre';
    if (!form.category) errs.category = 'Category is required';
    if (!form.rating) errs.rating = 'Rating is required';
    else if (isNaN(form.rating) || form.rating < 0 || form.rating > 10) errs.rating = 'Rating must be 0-10';
    if (!poster && !posterPreview) errs.poster = 'Poster image is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('title', form.title.trim());
    formData.append('description', form.description.trim());
    formData.append('year', form.year);
    formData.append('duration', form.duration.trim());
    form.genre.forEach((g) => formData.append('genre', g));
    formData.append('category', form.category);
    formData.append('rating', form.rating);
    formData.append('director', form.director.trim());
    formData.append('trailer', form.trailer.trim());
    form.cast.forEach((c, i) => {
      formData.append(`cast[${i}][name]`, c.name);
      formData.append(`cast[${i}][role]`, c.role);
    });

    if (poster) formData.append('poster', poster);
    if (banner) formData.append('banner', banner);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Poster Image</label>
            <div className="relative">
              {posterPreview ? (
                <div className="relative w-40 aspect-[2/3] rounded-lg overflow-hidden border border-dark-border">
                  <img src={posterPreview} alt="Poster" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setPoster(null); setPosterPreview(''); }}
                    className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-white hover:bg-black"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-40 aspect-[2/3] border-2 border-dashed border-dark-border rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-dark">
                  <FiUpload size={20} className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-500">Upload Poster</span>
                  <input type="file" accept="image/*" onChange={handlePosterChange} className="hidden" />
                </label>
              )}
            </div>
            {errors.poster && <p className="text-red-400 text-xs mt-1">{errors.poster}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Banner Image</label>
            <div className="relative">
              {bannerPreview ? (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-dark-border">
                  <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setBanner(null); setBannerPreview(''); }}
                    className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-white hover:bg-black"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-dark-border rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-dark">
                  <FiUpload size={20} className="text-gray-500 mb-1" />
                  <span className="text-xs text-gray-500">Upload Banner</span>
                  <input type="file" accept="image/*" onChange={handleBannerChange} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
              placeholder="Movie title"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Movie description"
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Year *</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="2024"
              />
              {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Duration *</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="2h 28m"
              />
              {errors.duration && <p className="text-red-400 text-xs mt-1">{errors.duration}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Rating *</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="8.5"
              />
              {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Director</label>
              <input
                type="text"
                name="director"
                value={form.director}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="Director name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Genres *</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <button
                  type="button"
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    form.genre.includes(genre.id)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-dark text-gray-400 border-dark-border hover:border-gray-500'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            {errors.genre && <p className="text-red-400 text-xs mt-1">{errors.genre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Trailer URL</label>
            <input
              type="text"
              name="trailer"
              value={form.trailer}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Cast</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCast(); } }}
                className="flex-1 px-3 py-2 bg-dark border border-dark-border rounded-lg text-white text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="Actor name"
              />
              <button
                type="button"
                onClick={handleAddCast}
                className="px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            {form.cast.length > 0 && (
              <div className="space-y-2">
                {form.cast.map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 w-32 truncate">{member.name}</span>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleCastRoleChange(index, e.target.value)}
                      className="flex-1 px-2 py-1 bg-dark border border-dark-border rounded text-white text-xs focus:border-primary focus:outline-none transition-colors"
                      placeholder="Role"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCast(index)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Movie' : 'Add Movie'}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
