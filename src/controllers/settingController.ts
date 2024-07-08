import { Request, Response } from 'express';
import Setting from '../models/setting';

export const createSetting = async (req: Request, res: Response) => {
    try {
        const { key, value } = req.body;
        const newSetting = new Setting({ key, value });
        await newSetting.save();
        res.status(201).json(newSetting);
    } catch (error) {
        res.status(500).json({ message: 'Error creating setting', error });
    }
};

// Add more functions like getAllSettings, getSettingById, updateSetting, deleteSetting if needed
