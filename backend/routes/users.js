const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @desc    Add listing to favorites
// @route   POST /api/users/favorites/:listingId
// @access  Private
router.post('/favorites/:listingId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if already in favorites
    if (user.favorites.includes(req.params.listingId)) {
      return res.status(400).json({
        success: false,
        message: 'Listing already in favorites'
      });
    }

    user.favorites.push(req.params.listingId);
    await user.save();

    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Remove listing from favorites
// @route   DELETE /api/users/favorites/:listingId
// @access  Private
router.delete('/favorites/:listingId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.listingId
    );
    await user.save();

    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
router.get('/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'favorites',
      populate: {
        path: 'owner',
        select: 'firstName lastName avatar'
      }
    });

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
