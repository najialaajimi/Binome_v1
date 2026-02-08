const Listing = require('../models/Listing');

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
exports.getListings = async (req, res) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Only show active listings for public
    reqQuery.status = 'active';

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Listing.find(JSON.parse(queryStr)).populate('owner', 'firstName lastName avatar');

    // Search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = query.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { 'address.city': searchRegex },
          { 'address.governorate': searchRegex }
        ]
      });
    }

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Listing.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const listings = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: listings.length,
      total,
      pagination,
      data: listings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('owner', 'firstName lastName avatar phone email');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Increment views
    listing.views += 1;
    await listing.save();

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

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private (Owner)
exports.createListing = async (req, res) => {
  try {
    // Add owner to req.body
    req.body.owner = req.user.id;

    const listing = await Listing.create(req.body);

    res.status(201).json({
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

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private (Owner)
exports.updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Make sure user is listing owner
    if (listing.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (Owner/Admin)
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Make sure user is listing owner
    if (listing.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await listing.deleteOne();

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

// @desc    Get listings within a radius
// @route   GET /api/listings/radius/:lat/:lng/:distance
// @access  Public
exports.getListingsInRadius = async (req, res) => {
  try {
    const { lat, lng, distance } = req.params;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 6,378 km
    const radius = distance / 6378;

    const listings = await Listing.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
      status: 'active'
    }).populate('owner', 'firstName lastName avatar');

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get featured listings
// @route   GET /api/listings/featured
// @access  Public
exports.getFeaturedListings = async (req, res) => {
  try {
    const listings = await Listing.find({ featured: true, status: 'active' })
      .populate('owner', 'firstName lastName avatar')
      .limit(6);

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get owner's listings
// @route   GET /api/listings/owner
// @access  Private (Owner)
exports.getOwnerListings = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id });

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
