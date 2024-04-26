import express from 'express';
import Event from '../models/Events.js'; 
import Accept from '../models/Accept.js'; 
import User from "../models/Users.js"
const router = express.Router();



router.post('/', async (req, res) => {
    console.log(res.body);
    try {
        console.log('POST /events called');
        const eventData = req.body;
        const newEvent = new Event(eventData);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete("/delete/:id",  async (req, res) => {
  try {
      const event = await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Events Updated" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
  });

router.post('/accept/:id', async (req, res) => {
  console.log(res.body);
  try {
      console.log('POST /events called');
      const eventData = req.body;
      const newEvent = new Accept(eventData);
      const user = await User.findById(req.params.id);
      user.accepted.push(eventData.eventName);
      await user.save();
      // await newEvent.save();
      res.status(201).json(newEvent);
  } catch (error) {
      console.error('Error saving event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    // Fetch accepted event IDs of the user
    const acceptedEventIds = user.accepted;

    // Find events whose IDs are not in the acceptedEventIds array
    const events = await Event.find({ eventName: { $nin: acceptedEventIds } });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  router.get('/accept/:id', async (req, res) => {
    try {
      // const events = await Accept.find();
      const user = await User.findById(req.params.id)
      const eventNames = user.accepted;
      const events = await Event.find({ eventName: { $in: eventNames } });
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

export default router;
