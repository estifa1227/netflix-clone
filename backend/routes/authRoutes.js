const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  addToMyList,
  removeFromMyList,
  getMyList,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/mylist', protect, getMyList);
router.post('/mylist/:id', protect, addToMyList);
router.delete('/mylist/:id', protect, removeFromMyList);

module.exports = router;
