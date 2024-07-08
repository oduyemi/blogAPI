import express from 'express';
import { createTag, getAllTags } from '../controllers/tagController';

const router = express.Router();

router.post('/tags', createTag);
router.get('/tags', getAllTags);

// Add more routes like getTagById, updateTag, deleteTag if needed

export default router;
