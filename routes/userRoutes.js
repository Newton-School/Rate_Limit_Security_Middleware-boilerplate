const express = require('express');

const {
  searchUser,
  getAllUsers,
  editProfile,
} = require('../controllers/userControllers');

const protectUserRoutes = require('../middlewares/protectUserRoute');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.get('/search', searchUser);
router.put('/edit', isLoggedIn, protectUserRoutes, editProfile);

// Restricted Routes:
router.get('/', getAllUsers);

module.exports = router;
