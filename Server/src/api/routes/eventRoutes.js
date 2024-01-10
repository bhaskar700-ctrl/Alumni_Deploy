// routes/eventRoutes.js
import express from 'express';
import eventController from '../controllers/eventController.js';
import authenticate from '../../middleware/authenticate.js';

const router = express.Router();

router.post('/create', authenticate, eventController.createEvent);
router.get('/all', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);
router.put('/update/:eventId', authenticate, eventController.updateEvent);
router.delete('/delete/:eventId', authenticate, eventController.deleteEvent);

export default router;
