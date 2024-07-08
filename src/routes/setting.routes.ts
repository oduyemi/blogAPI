import express from 'express';
import {
    createSetting,
    getAllSettings,
    getSettingById,
    updateSetting,
    deleteSetting
} from '../controllers/setting.controller';

const router = express.Router();

router.post('/settings', createSetting);
router.get('/', getAllSettings);
router.get('/:settingId', getSettingById);
router.put('/:settingId', updateSetting);
router.delete('/:settingId', deleteSetting);


export default router;





