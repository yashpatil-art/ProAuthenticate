import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['farmer', 'buyer', 'admin'],
    default: 'buyer'
  },
  
  // Farmer-specific fields
  phone: {
    type: String,
    trim: true
  },
  farmName: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  products: [{
    type: String,
    trim: true
  }],
  
  // Farmer verification fields
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  documents: [{
    type: String // Array of document URLs
  }],
  rejectionReason: {
    type: String,
    trim: true
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  
  // Buyer-specific fields
  address: {
    type: String,
    trim: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  
  // Common fields
  profileImage: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    emailUpdates: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  // Auto-set profile completion based on role-specific fields
  if (this.role === 'farmer') {
    this.profileCompleted = !!(this.name && this.phone && this.farmName && this.location);
  } else if (this.role === 'buyer') {
    this.profileCompleted = !!(this.name && this.email && this.address);
  }
  
  next();
});

// Virtual for full address (for buyers)
userSchema.virtual('fullAddress').get(function() {
  if (this.shippingAddress && this.role === 'buyer') {
    const addr = this.shippingAddress;
    return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
  }
  return this.address || '';
});

// Method to check if user can submit products (for farmers)
userSchema.methods.canSubmitProducts = function() {
  return this.role === 'farmer' && 
         this.verificationStatus === 'approved' && 
         this.isActive === true;
};

// Method to get public profile (exclude password)
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Static method to get farmers by verification status
userSchema.statics.getFarmersByStatus = function(status) {
  return this.find({ 
    role: 'farmer', 
    verificationStatus: status 
  }).select('-password');
};

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1, verificationStatus: 1 });
userSchema.index({ 'shippingAddress.zipCode': 1 });

const User = mongoose.model('User', userSchema);

export default User;