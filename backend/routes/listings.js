const express = require('express');
const router = express.Router();
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getListingsInRadius,
  getFeaturedListings,
  getOwnerListings
} = require('../controllers/listingController');
const { protect, authorize } = require('../middleware/auth');

// Include review router
const reviewRouter = require('./reviews');
router.use('/:listingId/reviews', reviewRouter);

// Public routes
router.get('/', getListings);
router.get('/featured', getFeaturedListings);
router.get('/radius/:lat/:lng/:distance', getListingsInRadius);
router.get('/:id', getListing);

// Protected routes
router.get('/owner/my-listings', protect, authorize('owner', 'admin'), getOwnerListings);
router.post('/', protect, authorize('owner', 'admin'), createListing);
router.put('/:id', protect, authorize('owner', 'admin'), updateListing);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteListing);

module.exports = router;
