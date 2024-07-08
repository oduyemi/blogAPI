import express from 'express';
import { createMedia } from '../controllers/media.controller';

const router = express.Router();

router.post('/media', createMedia);

// Add more routes like getAllMedia, getMediaById, deleteMedia if needed

export default router;
