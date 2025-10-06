import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  // Reference to the product being verified
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  
  // Reference to the farmer
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Admin who performed verification
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Verification process details
  verificationType: {
    type: String,
    enum: ['initial', 're-verification', 'batch', 'random-audit', 'complaint-based'],
    default: 'initial'
  },
  
  verificationStatus: {
    type: String,
    enum: ['pending', 'in-progress', 'approved', 'rejected', 'requires-more-info'],
    default: 'pending'
  },
  
  // Verification criteria and scores
  criteria: {
    documentation: {
      score: { type: Number, min: 0, max: 10 },
      weight: { type: Number, default: 0.3 },
      notes: String
    },
    quality: {
      score: { type: Number, min: 0, max: 10 },
      weight: { type: Number, default: 0.4 },
      notes: String
    },
    authenticity: {
      score: { type: Number, min: 0, max: 10 },
      weight: { type: Number, default: 0.3 },
      notes: String
    }
  },
  
  overallScore: {
    type: Number,
    min: 0,
    max: 10
  },
  
  // Verification details
  verificationNotes: {
    type: String,
    trim: true
  },
  
  rejectionReason: {
    type: String,
    trim: true
  },
  
  requiredActions: [{
    action: String,
    description: String,
    deadline: Date,
    status: {
      type: String,
      enum: ['pending', 'completed', 'overdue'],
      default: 'pending'
    }
  }],
  
  // Blockchain integration
  blockchainRecord: {
    transactionHash: {
      type: String,
      trim: true,
      sparse: true
    },
    blockNumber: Number,
    gasUsed: Number,
    timestamp: Date,
    smartContractAddress: String,
    verificationId: String // Unique ID on blockchain
  },
  
  // Documents and evidence
  supportingDocuments: [{
    documentType: {
      type: String,
      enum: ['lab-report', 'certificate', 'farm-photo', 'production-record', 'shipment-doc', 'other']
    },
    documentUrl: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: Date,
    description: String
  }],
  
  // Quality test results (product-specific)
  qualityTests: {
    // For Sugar
    sugar: {
      purity: { type: String }, // e.g., "99.8%"
      moistureContent: { type: String },
      color: { type: String },
      grainSize: { type: String }
    },
    
    // For Cashew
    cashew: {
      grade: { type: String }, // e.g., "W240"
      countPerPound: { type: Number },
      moisture: { type: String },
      brokenPieces: { type: String } // percentage
    },
    
    // For Turmeric
    turmeric: {
      curcuminContent: { type: String }, // e.g., "5.2%"
      colorIntensity: { type: String },
      foreignMatter: { type: String },
      essentialOil: { type: String }
    },
    
    // For Banana
    banana: {
      variety: { type: String },
      ripenessStage: { type: String }, // 1-7 scale
      brixLevel: { type: String }, // sugar content
      sizeGrade: { type: String }
    },
    
    // General tests
    general: {
      pesticideResidue: { type: String }, // e.g., "Within limits"
      heavyMetals: { type: String },
      microbialCount: { type: String },
      shelfLife: { type: String } // in days
    }
  },
  
  // Timeline
  timeline: [{
    stage: {
      type: String,
      enum: ['submitted', 'under-review', 'quality-testing', 'blockchain-recording', 'completed', 'rejected']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  }],
  
  // Audit trail
  auditLog: [{
    action: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    changes: mongoose.Schema.Types.Mixed,
    ipAddress: String,
    userAgent: String
  }],
  
  // SLA and performance metrics
  sla: {
    targetCompletionTime: { // in hours
      type: Number,
      default: 48
    },
    actualCompletionTime: Number,
    isWithinSLA: Boolean
  },
  
  // Re-verification schedule
  nextVerification: {
    scheduledDate: Date,
    reason: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    }
  },
  
  // Compliance and standards
  compliance: {
    standards: [{
      standard: String, // e.g., "FSSAI", "ISO-22000", "Organic"
      compliant: Boolean,
      certificateNumber: String,
      validUntil: Date
    }],
    regulatoryRequirements: [{
      requirement: String,
      met: Boolean,
      evidence: String
    }]
  }

}, {
  timestamps: true
});

// Indexes for performance
verificationSchema.index({ product: 1 });
verificationSchema.index({ farmer: 1 });
verificationSchema.index({ verifiedBy: 1 });
verificationSchema.index({ verificationStatus: 1 });
verificationSchema.index({ createdAt: -1 });
verificationSchema.index({ 'blockchainRecord.transactionHash': 1 }, { sparse: true });
verificationSchema.index({ overallScore: -1 });

// Pre-save middleware to calculate overall score
verificationSchema.pre('save', function(next) {
  if (this.criteria.documentation.score && this.criteria.quality.score && this.criteria.authenticity.score) {
    this.overallScore = (
      this.criteria.documentation.score * this.criteria.documentation.weight +
      this.criteria.quality.score * this.criteria.quality.weight +
      this.criteria.authenticity.score * this.criteria.authenticity.weight
    );
  }
  
  // Calculate SLA compliance
  if (this.verificationStatus === 'approved' || this.verificationStatus === 'rejected') {
    const completionTime = (new Date() - this.createdAt) / (1000 * 60 * 60); // hours
    this.sla.actualCompletionTime = completionTime;
    this.sla.isWithinSLA = completionTime <= this.sla.targetCompletionTime;
  }
  
  next();
});

// Method to add timeline entry
verificationSchema.methods.addTimelineEntry = function(stage, performedBy, notes = '') {
  this.timeline.push({
    stage,
    performedBy,
    notes,
    timestamp: new Date()
  });
};

// Method to add audit log entry
verificationSchema.methods.addAuditLog = function(action, performedBy, changes = {}, ipAddress = '', userAgent = '') {
  this.auditLog.push({
    action,
    performedBy,
    changes,
    ipAddress,
    userAgent,
    timestamp: new Date()
  });
};

// Static method to get verification statistics
verificationSchema.statics.getVerificationStats = async function(timeRange = '30d') {
  const timeFilter = {};
  const now = new Date();
  
  switch (timeRange) {
    case '7d':
      timeFilter.$gte = new Date(now.setDate(now.getDate() - 7));
      break;
    case '30d':
      timeFilter.$gte = new Date(now.setDate(now.getDate() - 30));
      break;
    case '90d':
      timeFilter.$gte = new Date(now.setDate(now.getDate() - 90));
      break;
    default:
      timeFilter.$gte = new Date(now.setDate(now.getDate() - 30));
  }
  
  const stats = await this.aggregate([
    { $match: { createdAt: timeFilter } },
    {
      $group: {
        _id: '$verificationStatus',
        count: { $sum: 1 },
        avgScore: { $avg: '$overallScore' },
        avgCompletionTime: { $avg: '$sla.actualCompletionTime' }
      }
    }
  ]);
  
  const total = await this.countDocuments({ createdAt: timeFilter });
  const slaCompliance = await this.countDocuments({ 
    createdAt: timeFilter,
    'sla.isWithinSLA': true 
  });
  
  return {
    timeRange,
    total,
    slaComplianceRate: total > 0 ? (slaCompliance / total * 100) : 0,
    breakdown: stats
  };
};

// Static method to find verifications needing re-verification
verificationSchema.statics.findDueForReverification = function() {
  return this.find({
    'nextVerification.scheduledDate': { $lte: new Date() },
    verificationStatus: 'approved'
  }).populate('product farmer');
};

// Virtual for verification duration
verificationSchema.virtual('verificationDuration').get(function() {
  if (this.verificationStatus === 'approved' || this.verificationStatus === 'rejected') {
    return (new Date() - this.createdAt) / (1000 * 60 * 60); // hours
  }
  return null;
});

// Export the model
export default mongoose.model('Verification', verificationSchema);