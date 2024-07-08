import express from 'express';
import { createPostTag } from '../controllers/postTagController';

const router = express.Router();

router.post('/postTags', createPostTag);

// Add more routes like getAllPostTags, getPostTagById, deletePostTag if needed

export default router;
