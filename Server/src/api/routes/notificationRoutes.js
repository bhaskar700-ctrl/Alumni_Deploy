import express from 'express';
import NotificationController from '../controllers/notificationController.js'; // Adjust the path according to your project structure

const router = express.Router();

router.get('/user/:userId', NotificationController.getUserNotifications);
router.put('/mark-read/:notificationId', NotificationController.markNotificationAsRead);

export default router;
