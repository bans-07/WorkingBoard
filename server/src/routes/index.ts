import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes); // Public
router.use('/api', authenticateToken, apiRoutes); // ✅ Protected

export default router;

// import { Router } from 'express';
// import authRoutes from './auth-routes.js';
// import apiRoutes from './api/index.js';
// import { authenticateToken } from '../middleware/auth.js';

// const router = Router();

// router.use('/auth', authRoutes);
// // TODO: Add authentication to the API routes
// router.use('/api', apiRoutes);

// export default router;
