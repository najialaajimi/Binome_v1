const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

// @desc    Get all bookings for tenant
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'admin') {
      query = Booking.find();
    } else if (req.user.role === 'owner') {
      query = Booking.find({ owner: req.user.id });
    } else {
      query = Booking.find({ tenant: req.user.id });
    }

    const bookings = await query
      .populate('listing', 'title images price address')
      .populate('tenant', 'firstName lastName email avatar')
      .populate('owner', 'firstName lastName email');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('listing', 'title images price address')
      .populate('tenant', 'firstName lastName email avatar phone')
      .populate('owner', 'firstName lastName email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user is booking tenant or owner
    if (
      booking.tenant._id.toString() !== req.user.id &&
      booking.owner._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create booking (visit request or reservation)
// @route   POST /api/bookings
// @access  Private (Tenant)
exports.createBooking = async (req, res) => {
  try {
    const listing = await Listing.findById(req.body.listing);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Add tenant and owner to booking
    req.body.tenant = req.user.id;
    req.body.owner = listing.owner;

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user is authorized
    if (
      booking.tenant.toString() !== req.user.id &&
      booking.owner.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user is authorized
    if (
      booking.tenant.toString() !== req.user.id &&
      booking.owner.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this booking'
      });
    }

    await booking.deleteOne();

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
