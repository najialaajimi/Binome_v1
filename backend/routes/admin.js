const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllListings,
  updateListingStatus,
  getStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard stats
router.get('/stats', getStats);

// User management
router.route('/users')
  .get(getUsers);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// Listing management
router.get('/listings', getAllListings);
router.put('/listings/:id/status', updateListingStatus);

module.exports = router;
