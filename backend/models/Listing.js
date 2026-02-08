const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  propertyType: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: ['apartment', 'studio', 'house', 'room', 'shared']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  priceType: {
    type: String,
    enum: ['monthly', 'weekly', 'daily'],
    default: 'monthly'
  },
  address: {
    street: String,
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    governorate: {
      type: String,
      required: [true, 'Please add a governorate']
    },
    postalCode: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  images: [{
    url: String,
    caption: String
  }],
  virtualTour: {
    type: String
  },
  amenities: [{
    type: String,
    enum: [
      'wifi', 'parking', 'ac', 'heating', 'washer', 'dryer',
      'kitchen', 'tv', 'elevator', 'security', 'balcony',
      'furnished', 'utilities_included', 'pet_friendly'
    ]
  }],
  bedrooms: {
    type: Number,
    default: 1
  },
  bathrooms: {
    type: Number,
    default: 1
  },
  area: {
    type: Number // in square meters
  },
  nearbyUniversities: [{
    name: String,
    distance: Number // in km
  }],
  nearbyTransport: [{
    type: {
      type: String,
      enum: ['metro', 'bus', 'train', 'tram']
    },
    name: String,
    distance: Number
  }],
  availability: {
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    minDuration: {
      type: Number,
      default: 1 // minimum months
    },
    maxDuration: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'rented', 'suspended', 'deleted'],
    default: 'pending'
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for geospatial queries
ListingSchema.index({ location: '2dsphere' });

// Update the updatedAt field on save
ListingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Listing', ListingSchema);
