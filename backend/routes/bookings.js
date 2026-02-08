const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBooking)
  .put(updateBooking)
  .delete(deleteBooking);

module.exports = router;
