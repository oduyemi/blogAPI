import { Request, Response } from "express";
import Notification, { INotification } from "../models/notification";




export const createNotification = async (req: Request, res: Response) => {
    try {
        const { userId, type, data } = req.body;
        const newNotification = new Notification({ userId, type, data });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ message: "Error creating notification", error });
    }
};

export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.userID;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        const notifications: INotification[] = await Notification.find({ userId });

        if (notifications.length === 0) {
            return res.status(404).json({ message: "Notifications not available" });
        } else {
            return res.json({ data: notifications });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getNotificationById = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.userID;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        const notificationId = req.params.notificationId;
        const notification: INotification | null = await Notification.findOne({ _id: notificationId, userId });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        } else {
            return res.json({ data: notification });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getNotificationByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        const notifications: INotification[] = await Notification.find({ userId });

        if (notifications.length === 0) {
            return res.status(404).json({ message: "Notifications not found for this user" });
        } else {
            return res.json({ data: notifications });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.userID;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        const notificationId = req.params.notificationId;
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, userId },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        } else {
            return res.json({ message: "Notification marked as read", data: notification });
        }
    } catch (error) {
        res.status(500).json({ message: "Error marking notification as read", error });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const userId = req.session.user?.userID;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        const notificationId = req.params.notificationId;
        const notification = await Notification.findOneAndDelete({ _id: notificationId, userId });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        } else {
            return res.status(200).json({ message: "Notification deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting notification", error });
    }
};
