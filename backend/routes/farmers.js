import express from 'express';
import { 
  getFarmerProducts, 
  getFarmerStats, 
  updateFarmerProfile 
} from '../controllers/farmerController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes protected for farmers only
router.use(protect);
router.use(authorize('farmer'));

router.get('/products', getFarmerProducts);
router.get('/stats', getFarmerStats);
router.put('/profile', updateFarmerProfile);

export default router;