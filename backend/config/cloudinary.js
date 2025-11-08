import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Cloudinary storage engine for Multer
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'proauthenticate/products',
    format: async (req, file) => {
      // Return the file format
      return file.mimetype.split('/')[1] || 'png';
    },
    public_id: (req, file) => {
      // Generate unique filename
      return `product-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    },
    transformation: [
      { width: 800, height: 600, crop: "limit" },
      { quality: "auto" },
      { format: "webp" } // Convert to webp for better performance
    ]
  },
});

export default cloudinary;