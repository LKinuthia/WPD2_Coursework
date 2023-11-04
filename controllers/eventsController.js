const eventModel = require('../models/eventModel');

// Controller function to handle event creation
function createEvent(req, res) {
  const eventId = req.body['event-id'];
  const eventCategory = req.body['event-category'];
  const eventName = req.body['event-name'];
  const eventLocation = req.body['event-location'];
  const eventDate = req.body['event-date'];
  
  console.log('Received Event Id:', eventId);
  console.log('Received Event Id:', eventCategory);
  console.log('Received Event Name:', eventName);
  console.log('Received Event Id:', eventLocation);
  console.log('Received Event Date:', eventDate);

  if (eventId && eventName && eventDate && eventLocation && eventCategory) {
  console.log('Received Event Id:', eventId);
    const eventData = { id: eventId, category: eventCategory, name: eventName, location:eventLocation, date: eventDate };
    

    eventModel.createEvent(eventData, (err, newEvent) => {
      if (err) {
        console.error('Error inserting event into the database:', err);
        res.status(500).json({ error: 'Failed to create the event.' });
      } else {
        console.log('Event inserted into the database:', newEvent);
        return res.status(200).json({ message: 'Event created successfully.' });
        //res.redirect('/success.html'); // You can customize the response as needed
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid input data.' });
  }
}


  // Update an event by ID
 function editEvent (req, res) {
    const eventId = req.body['event-id']
    const updatedEvent = {
      category: req.body['new-event-category'],
      name: req.body['new-event-name'],
      location: req.body['new-event-location'],
      date: req.body['new-event-date']
    };

    eventModel.updateEvent(eventId, updatedEvent, (err, numUpdated) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update the event.' });
      }
      if (numUpdated === 0) {
        return res.status(404).json({ error: 'Event not found.' });
      }
      return res.status(200).json({ message: 'Event updated successfully.' });
    });
  }


  // Delete an event by ID
  function deleteEvent (req, res) {
    const eventId = req.body['event-id'];

    eventModel.deleteEvent(eventId, (err, numRemoved) => {
      console.log(eventId)
      if (err) {
        return res.status(500).json({ error: 'Failed to delete the event.' });
      }
      if (numRemoved === 0) {
        return res.status(404).json({ error: 'Event not found.' });
      }
      return res.status(200).json({ message: 'Event deleted successfully.' });
    });
  };

  


// Controller function to retrieve all events
function getAllEvents(req, res) {
  eventModel.getEvents((err, events) => {
    console.log('The events are: ', events);
    if (err) {
      console.error('Error retrieving events:', err);
      res.status(500).json({ error: 'Failed to retrieve events.' });
    } else {
      // res.status(200).json(events);
      res.render('events', {events});
    }
  });
}

module.exports = { createEvent, getAllEvents , editEvent, deleteEvent};



