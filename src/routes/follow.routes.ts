import express from 'express';
import { createFollow } from '../controllers/follow.controller';

const router = express.Router();

router.post('/follows', createFollow);

// Add more routes like getAllFollows, getFollowById, deleteFollow if needed

export default router;
