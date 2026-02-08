const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  addResponse
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getReviews)
  .post(protect, addReview);

router.route('/:id')
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.put('/:id/response', protect, authorize('owner'), addResponse);

module.exports = router;
