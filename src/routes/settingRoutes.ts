import express from 'express';
import { createSetting } from '../controllers/settingController';

const router = express.Router();

router.post('/settings', createSetting);

// Add more routes like getAllSettings, getSettingById, updateSetting, deleteSetting if needed

export default router;
