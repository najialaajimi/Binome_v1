const User = require('../models/User');
const Listing = require('../models/Listing');
const Booking = require('../models/Booking');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    let query = {};

    if (req.query.role) {
      query.role = req.query.role;
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex }
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get all listings (admin view with all statuses)
// @route   GET /api/admin/listings
// @access  Private (Admin)
exports.getAllListings = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    let query = {};

    if (req.query.status) {
      query.status = req.query.status;
    }

    const total = await Listing.countDocuments(query);
    const listings = await Listing.find(query)
      .populate('owner', 'firstName lastName email')
      .skip(startIndex)
      .limit(limit)
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: listings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: listings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update listing status
// @route   PUT /api/admin/listings/:id/status
// @access  Private (Admin)
exports.updateListingStatus = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    res.status(200).json({
      success: true,
      data: listing
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTenants = await User.countDocuments({ role: 'tenant' });
    const totalOwners = await User.countDocuments({ role: 'owner' });
    const totalListings = await Listing.countDocuments();
    const activeListings = await Listing.countDocuments({ status: 'active' });
    const pendingListings = await Listing.countDocuments({ status: 'pending' });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });

    // Get recent activity
    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(5)
      .select('firstName lastName email role createdAt');

    const recentListings = await Listing.find()
      .sort('-createdAt')
      .limit(5)
      .populate('owner', 'firstName lastName')
      .select('title status createdAt');

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          tenants: totalTenants,
          owners: totalOwners
        },
        listings: {
          total: totalListings,
          active: activeListings,
          pending: pendingListings
        },
        bookings: {
          total: totalBookings,
          pending: pendingBookings
        },
        recentUsers,
        recentListings
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
