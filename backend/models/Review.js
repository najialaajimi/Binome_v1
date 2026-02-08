const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating between 1 and 5'],
    min: 1,
    max: 5
  },
  title: {
    type: String,
    maxlength: 100
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
    maxlength: 1000
  },
  response: {
    content: String,
    respondedAt: Date
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from submitting more than one review per listing
ReviewSchema.index({ listing: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(listingId) {
  const obj = await this.aggregate([
    {
      $match: { listing: listingId }
    },
    {
      $group: {
        _id: '$listing',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Listing').findByIdAndUpdate(listingId, {
      averageRating: obj[0] ? obj[0].averageRating : undefined
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.listing);
});

// Call getAverageRating after remove
ReviewSchema.post('deleteOne', { document: true }, function() {
  this.constructor.getAverageRating(this.listing);
});

module.exports = mongoose.model('Review', ReviewSchema);
