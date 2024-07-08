import express from "express";
import * as notificationController from "../controllers/notification.controller";

const router = express.Router();


router.post("/", notificationController.createNotification);
router.get("/", notificationController.getAllNotifications);
router.get("/:notificationId", notificationController.getNotificationById);
router.get('/user/:userId', notificationController.getNotificationByUserId);
router.put("/:notificationId/mark-as-read", notificationController.markAsRead);
router.delete("/:notificationId", notificationController.deleteNotification);

export default router;
