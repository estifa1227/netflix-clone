const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getMovies,
  getMovieById,
  getFeaturedMovie,
  getMoviesByCategory,
  createMovie,
  updateMovie,
  deleteMovie,
  getSimilarMovies,
  getAllCategories,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  searchMovies,
  getMoviesByGenre, 
} = require("../controllers/movieController");

const { protect, admin } = require("../middleware/auth");

// ================= Multer =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;

    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// ================= GET ROUTES =================

// MongoDB
router.get("/", getMovies);
router.get("/categories", getAllCategories);
router.get("/featured", getFeaturedMovie);

// TMDB
router.get("/trending", getTrendingMovies);
router.get("/popular", getPopularMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/search", searchMovies);
router.get("/genre/:genreId", getMoviesByGenre);


// MongoDB Category
router.get("/category/:category", getMoviesByCategory);

// Similar Movies

router.get("/:id/similar", getSimilarMovies);

// Movie Details (keep LAST)

router.get("/:id", getMovieById);

// ================= ADMIN ROUTES =================

router.post(
  "/",
  protect,
  admin,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createMovie
);

router.put(
  "/:id",
  protect,
  admin,
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateMovie
);

router.delete("/:id", protect, admin, deleteMovie);

module.exports = router;