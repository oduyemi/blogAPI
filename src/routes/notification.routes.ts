import express from "express";
import { createNotification } from "../controllers/notification.controller";

const router = express.Router();

router.post("/notifications", createNotification);

// Add more routes like getAllNotifications, getNotificationById, markAsRead, deleteNotification if needed

export default router;
