import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['farmer', 'buyer', 'admin'], default: 'buyer' },
  phone: { type: String, trim: true },
  farmName: { type: String, trim: true },
  location: { type: String, trim: true },
  products: [{ type: String, trim: true }],
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  documents: [{ type: String }],
  rejectionReason: { type: String, trim: true },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  address: { type: String, trim: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'India' }
  },
  profileImage: { type: String },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  preferences: {
    notifications: { type: Boolean, default: true },
    emailUpdates: { type: Boolean, default: true }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const updateAdminPassword = async () => {
  try {
    console.log('\n🔧 Updating Admin Password...\n');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/proauthenticate';
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB successfully!\n');

    // Find admin user
    console.log('🔍 Finding admin user...');
    const admin = await User.findOne({ email: 'admin@proauthenticate.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('\nTry creating the admin user first with createAdmin.js\n');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('✅ Admin user found!');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log(`🎭 Role: ${admin.role}\n`);

    // Hash new password
    console.log('🔐 Hashing new password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Update password
    admin.password = hashedPassword;
    await admin.save();
    
    console.log('✅ Password updated successfully!\n');
    
    // Test the password
    console.log('🧪 Testing new password...');
    const isMatch = await bcrypt.compare('admin123', admin.password);
    
    if (isMatch) {
      console.log('✅ Password verification: SUCCESS\n');
      console.log('═══════════════════════════════════════');
      console.log('📧 Email:    admin@proauthenticate.com');
      console.log('🔑 Password: admin123');
      console.log('👤 Role:     admin');
      console.log('═══════════════════════════════════════');
      console.log('\n🎉 You can now login with these credentials!\n');
    } else {
      console.log('❌ Password verification: FAILED');
      console.log('Something went wrong. Please try again.\n');
    }
    
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error updating admin password:');
    console.error(error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
updateAdminPassword();