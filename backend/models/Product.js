import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['sugar', 'cashew', 'turmeric', 'banana'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'kg'
  },
  images: [{
    type: String // Array of image URLs
  }],
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmLocation: {
    type: String,
    required: true
  },
  harvestDate: {
    type: Date,
    required: true
  },
  // Blockchain verification fields
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  blockchainTransactionHash: {
    type: String,
    trim: true
  },
  verificationId: {
    type: String,
    unique: true
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  // Product-specific fields
  qualityParameters: {
    purity: { type: String }, // for sugar
    grade: { type: String }, // for cashew
    curcuminContent: { type: String }, // for turmeric
    ripenessStage: { type: String } // for banana
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate verification ID before saving
productSchema.pre('save', function(next) {
  if (this.isNew && !this.verificationId) {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 8);
    this.verificationId = `PA-${this.category.toUpperCase()}-${timestamp}-${random}`;
  }
  next();
});

// Make sure this is the default export
const Product = mongoose.model('Product', productSchema);
export default Product;