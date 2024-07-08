import { Request, Response } from 'express';
import Notification from '../models/notification';

export const createNotification = async (req: Request, res: Response) => {
    try {
        const { userId, type, data } = req.body;
        const newNotification = new Notification({ userId, type, data });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error });
    }
};

// Add more functions like getAllNotifications, getNotificationById, markAsRead, deleteNotification if needed
