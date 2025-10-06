import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Farmer-specific information
  farmName: {
    type: String,
    required: true,
    trim: true
  },
  
  farmLocation: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'India'
    },
    pincode: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Farm details
  farmSize: {
    type: Number, // in acres
    required: true
  },
  
  farmType: {
    type: String,
    enum: ['organic', 'conventional', 'mixed', 'hydroponic', 'greenhouse'],
    default: 'conventional'
  },
  
  certification: [{
    name: {
      type: String,
      enum: ['organic', 'fairtrade', 'rainforest-alliance', 'utp-certified', 'global-gap', 'other']
    },
    certificateId: String,
    issuingAuthority: String,
    validUntil: Date,
    certificateFile: String // URL to certificate file
  }],
  
  // Products they grow
  products: [{
    category: {
      type: String,
      enum: ['sugar', 'cashew', 'turmeric', 'banana', 'other']
    },
    varieties: [String],
    annualProduction: Number, // in kg
    harvestSeasons: [String] // ['jan-mar', 'apr-jun', etc.]
  }],
  
  // Blockchain integration
  walletAddress: {
    type: String,
    trim: true,
    sparse: true // Allows multiple nulls but unique for non-null
  },
  
  // Business information
  businessRegistration: {
    registrationNumber: String,
    registrationType: {
      type: String,
      enum: ['individual', 'partnership', 'llp', 'pvt-ltd', 'cooperative']
    },
    registrationDate: Date
  },
  
  // Bank details for payments
  bankDetails: {
    accountHolderName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String,
    branch: String
  },
  
  // Contact information
  contactPerson: {
    name: String,
    phone: String,
    email: String,
    designation: String
  },
  
  // Social and quality metrics
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    breakdown: {
      productQuality: { type: Number, default: 0 },
      deliveryTime: { type: Number, default: 0 },
      communication: { type: Number, default: 0 }
    }
  },
  
  // Verification status
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'suspended'],
    default: 'pending'
  },
  
  verificationDetails: {
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: Date,
    verificationNotes: String,
    documentsVerified: [{
      documentType: String,
      verified: Boolean,
      notes: String
    }]
  },
  
  // Statistics
  stats: {
    totalProductsListed: {
      type: Number,
      default: 0
    },
    totalProductsSold: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    successfulVerifications: {
      type: Number,
      default: 0
    },
    rejectionRate: {
      type: Number,
      default: 0
    },
    averageVerificationTime: {
      type: Number, // in hours
      default: 0
    }
  },
  
  // Subscription/Plan information
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    },
    expiresAt: Date,
    features: {
      maxProducts: { type: Number, default: 10 },
      analytics: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false },
      customBranding: { type: Boolean, default: false }
    }
  },
  
  // Preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    autoRenewSubscription: { type: Boolean, default: false },
    shareDataForAnalytics: { type: Boolean, default: true }
  },
  
  // Metadata
  isActive: {
    type: Boolean,
    default: true
  },
  
  lastActive: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

// Indexes for better performance
farmerSchema.index({ user: 1 });
farmerSchema.index({ 'farmLocation.state': 1 });
farmerSchema.index({ 'farmLocation.city': 1 });
farmerSchema.index({ verificationStatus: 1 });
farmerSchema.index({ rating: -1 });
farmerSchema.index({ 'products.category': 1 });

// Virtual for farmer's full address
farmerSchema.virtual('fullAddress').get(function() {
  const loc = this.farmLocation;
  return `${loc.address}, ${loc.city}, ${loc.state} - ${loc.pincode}, ${loc.country}`;
});

// Update stats when products are added/verified
farmerSchema.methods.updateStats = async function() {
  const Product = mongoose.model('Product');
  
  const stats = await Product.aggregate([
    { $match: { farmer: this.user } },
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        approvedProducts: { 
          $sum: { $cond: [{ $eq: ['$verificationStatus', 'approved'] }, 1, 0] } 
        },
        pendingProducts: { 
          $sum: { $cond: [{ $eq: ['$verificationStatus', 'pending'] }, 1, 0] } 
        },
        rejectedProducts: { 
          $sum: { $cond: [{ $eq: ['$verificationStatus', 'rejected'] }, 1, 0] } 
        }
      }
    }
  ]);

  if (stats.length > 0) {
    this.stats.totalProductsListed = stats[0].totalProducts;
    this.stats.successfulVerifications = stats[0].approvedProducts;
    this.stats.rejectionRate = stats[0].totalProducts > 0 ? 
      (stats[0].rejectedProducts / stats[0].totalProducts * 100) : 0;
    
    await this.save();
  }
};

// Pre-save middleware
farmerSchema.pre('save', function(next) {
  this.lastActive = new Date();
  next();
});

// Static method to find farmers by location
farmerSchema.statics.findByLocation = function(state, city = null) {
  const query = { 'farmLocation.state': state };
  if (city) {
    query['farmLocation.city'] = city;
  }
  return this.find(query).populate('user', 'name email phone');
};

// Static method to get top rated farmers
farmerSchema.statics.getTopRated = function(limit = 10) {
  return this.find({ 
    'stats.totalProductsListed': { $gt: 0 },
    'rating.average': { $gte: 4.0 }
  })
  .sort({ 'rating.average': -1, 'stats.totalProductsListed': -1 })
  .limit(limit)
  .populate('user', 'name email phone');
};

export default mongoose.model('Farmer', farmerSchema);