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
    enum: ['user', 'admin', 'farmer', 'customer'],
    default: 'user'
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
  // Customer-specific fields (for future use)
  address: {
    type: String,
    trim: true
  },
  // Common fields
  isVerified: {
    type: Boolean,
    default: false
  },
  profileCompleted: {
    type: Boolean,
    default: false
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

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Auto-set profileCompleted based on role-specific fields
  if (this.role === 'farmer') {
    this.profileCompleted = !!(this.name && this.phone && this.farmName && this.location);
  } else if (this.role === 'customer') {
    this.profileCompleted = !!(this.name && this.email);
  }
  
  next();
});

// Method to get public profile (exclude password)
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;