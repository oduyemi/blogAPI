import express from 'express';
import {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag
} from '../controllers/tag.controller';

const router = express.Router();

router.post('/', createTag);
router.get('/', getAllTags);
router.get('/:tagId', getTagById);
router.put('/:tagId', updateTag);
router.delete('/:tagId', deleteTag);

export default router;
