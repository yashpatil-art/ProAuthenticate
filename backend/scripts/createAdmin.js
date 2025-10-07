import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// User Schema (inline for standalone script)
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

const createAdmin = async () => {
  try {
    console.log('\n🚀 Starting Admin User Creation...\n');

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/proauthenticate';
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB successfully!\n');

    // Check if admin already exists
    console.log('🔍 Checking if admin user already exists...');
    const existingAdmin = await User.findOne({ email: 'admin@proauthenticate.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('📧 Email: admin@proauthenticate.com');
      console.log('🔑 Password: admin123');
      console.log('\n✨ You can login with these credentials.\n');
      await mongoose.connection.close();
      process.exit(0);
    }

    console.log('📝 Creating new admin user...');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const admin = new User({
      name: 'System Administrator',
      email: 'admin@proauthenticate.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      preferences: {
        notifications: true,
        emailUpdates: true
      }
    });

    await admin.save();
    
    console.log('\n✅ Admin user created successfully!');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:    admin@proauthenticate.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role:     admin');
    console.log('═══════════════════════════════════════');
    console.log('\n🎉 You can now login to the admin panel!\n');
    
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error creating admin user:');
    console.error(error.message);
    
    if (error.code === 11000) {
      console.log('\n⚠️  This usually means the admin already exists.');
      console.log('Try logging in with: admin@proauthenticate.com / admin123\n');
    }
    
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the script
createAdmin();