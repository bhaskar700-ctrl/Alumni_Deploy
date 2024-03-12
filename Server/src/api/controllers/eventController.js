// controllers/eventController.js
import Event from '../models/Event.js';
import User from '../models/User.js'; // Import the User model to fetch users for notifications
import NotificationController from './NotificationController.js';

const eventController = {
    createEvent: async (req, res) => {
        try {
            const { title, description, location, startDate, endDate, organizer, image } = req.body;
            const newEvent = new Event({ title, description, location, startDate, endDate, organizer, image });
            await newEvent.save();

            // Notify all users about the new event
            const users = await User.find({});
            users.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'New Event',
                    `New event created: ${title}`,
                    `/events/${newEvent._id}`
                );
            });

            res.status(201).json(newEvent);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },


    getAllEvents: async (req, res) => {
        try {
            const events = await Event.find().populate('organizer', 'name');
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getEventById: async (req, res) => {
        try {
            const event = await Event.findById(req.params.eventId).populate('organizer', 'name');
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const { image } = req.body;
            const updatedEventData = { ...req.body };
            if (image) {
                updatedEventData.image = image; // If image is provided, update the image field
            }

            const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, updatedEventData, { new: true });
            if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Notify all users about the event update
            const users = await User.find({});
            users.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'Event Update',
                    `Event updated: ${updatedEvent.title}`,
                    `/events/${updatedEvent._id}`
                );
            });

            res.status(200).json(updatedEvent);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const event = await Event.findById(req.params.eventId);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            const title = event.title; // Store the title before deletion
    
            await event.remove();
    
            // Notify users about the event cancellation
            const users = await User.find({});
            users.forEach(user => {
                NotificationController.createNotification(
                    user._id,
                    'Event Cancellation',
                    `Event canceled: ${title}`,
                    `/events`
                );
            });
    
            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Additional functions can be added here, like RSVP to an event
};

export default eventController;
