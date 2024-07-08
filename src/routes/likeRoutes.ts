import express from 'express';
import { likePost, unlikePost } from '../controllers/likeController';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/like/:postId', protect, likePost);
router.delete('/unlike/:postId', protect, unlikePost);

export default router;