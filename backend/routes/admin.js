import express from 'express';
import { 
  getPendingProducts, 
  verifyProduct, 
  getUsers, 
  getAdminStats 
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes protected for admins only
router.use(protect);
router.use(authorize('admin'));

router.get('/pending-products', getPendingProducts);
router.post('/verify-product', verifyProduct);
router.get('/users', getUsers);
router.get('/stats', getAdminStats);

export default router;