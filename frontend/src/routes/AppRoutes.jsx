import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AdminRoute from '../components/admin/AdminRoute';
import AdminLayout from '../components/admin/AdminLayout';

import Home from '../pages/Home';
import Browse from '../pages/Browse';
import Search from '../pages/Search';
import MovieDetails from '../pages/MovieDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyList from '../pages/MyList';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminMovies from '../pages/admin/AdminMovies';
import AdminAddMovie from '../pages/admin/AdminAddMovie';
import AdminEditMovie from '../pages/admin/AdminEditMovie';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminStatistics from '../pages/admin/AdminStatistics';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<Browse />} />
          <Route path="search" element={<Search />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route
            path="mylist"
            element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="movies" element={<AdminMovies />} />
          <Route path="movies/add" element={<AdminAddMovie />} />
          <Route path="movies/edit/:id" element={<AdminEditMovie />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="statistics" element={<AdminStatistics />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
