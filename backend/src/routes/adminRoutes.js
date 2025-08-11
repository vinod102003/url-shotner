import { Router } from 'express';
import { adminDeleteUrl, adminListUrls, adminLogin } from '../controllers/urlController.js';
import { authMiddleware, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/login', adminLogin);
router.get('/urls', authMiddleware, requireAdmin, adminListUrls);
router.delete('/urls/:id', authMiddleware, requireAdmin, adminDeleteUrl);

export default router;