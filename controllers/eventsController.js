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



// function editEvent(req, res) {
//   const eventId = req.body['event-id'];
//   const newEventName = req.body['new-event-name'];
//   const newEventDate = req.body['new-event-date'];

//   if (!eventId || !newEventName || !newEventDate) {
//     res.status(400).json({ error: 'Invalid input data.' });
//     return;
//   }

//   eventModel.updateEvent(eventId, newEventName, newEventDate, (err, updatedEvent) => {
//     if (err) {
//       console.error('Error updating event in the database:', err);
//       res.status(500).json({ error: 'Failed to update the event.' });
//     } else {
//       console.log('Event updated in the database:', updatedEvent);
      
//       res.redirect('/success.html'); // You can customize the response as needed
//     }
//   });
// }




// const eventController = {
//   // Create a new event
//   createEvent: (req, res) => {
//     // Extract event details from the form
//     const eventName = req.body['event-name'];
//     const eventDate = req.body['event-date'];

//     if (eventName && eventDate) {
//       const newEvent = {
//         name: eventName,
//         date: eventDate,
//       };

//       // Insert the event into the NeDB database
//         Event.insert(newEvent, (err, createdEvent) => {
//            if (err) {
//            return res.status(500).json({ error: 'Failed to create the event.' });
//           }
//         return res.status(201).json(createdEvent);
//       });
//     } else {
//       return res.status(400).json({ error: 'Invalid data provided.' });
//     }
//   },

//   // Get all events
//   getAllEvents: (req, res) => {
//     Event.getAll((err, events) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to retrieve events.' });
//       }
//       return res.status(200).json(events);
//     });
//   },
// };

// module.exports = eventController;


// exports.createEvent = function (req, res) {
//   const newEvent = {
//     title: req.body.title,
//     date: req.body.date,
//     description: req.body.description,
//     // Add other event properties as needed
//   };

//   // Insert the event into the NeDB database
//   Event.create(newEvent, (err, createdEvent) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to create the event.' });
//     }
//     return res.status(201).json(createdEvent);
//   });
// };











// const db = require('../database');

// // Create a new event
// function createEvent(req, res) {
//   const eventName = req.body.title;
//   const eventDate = req.body.date;

//   if (eventName && eventDate) {
//     db.insert({ title: eventName, date: eventDate }, (err, newEvent) => {
//       if (err) {
//         console.error('Error creating event:', err);
//         return res.status(500).json({ error: 'Failed to create the event.' });
//       }

//       // The event was created, and `newEvent` contains the inserted event
//       return res.status(201).json(newEvent);
//     });
//   } else {
//     return res.status(400).json({ error: 'Invalid input data.' });
//   }
// }

// // Get all events
// function getAllEvents(req, res) {
//   db.find({}, (err, events) => {
//     if (err) {
//       console.error('Error retrieving events:', err);
//       return res.status(500).json({ error: 'Failed to retrieve events.' });
//     }
//     return res.status(200).json(events);
//   });
// }

// module.exports = {
//   createEvent,
//   getAllEvents,
// };


// // const Event = require('../models/eventModel');

// const eventController = {
//   createEvent: (req, res) => {
//     const newEvent = {
//       title: req.body.title,
//       date: req.body.date,
//       description: req.body.description,
//       // Add other event properties as needed
//     };

//     // Insert the event into the NeDB database
//     db.insert(newEvent, (err, createdEvent) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to create the event.' });
//       }
//       return res.status(201).json(createdEvent);
//     });
//   },
// };

// module.exports = eventController;





// const Event = require('../models/eventModel');

// const eventController = {
//   // Create a new event
//   createEvent: (req, res) => {
//     const newEvent = {
//       title: req.body.title,
//       date: req.body.date,
//       description: req.body.description,
//       // Add other event properties as needed
//     };

//     Event.create(newEvent, (err, createdEvent) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to create the event.' });
//       }
//       return res.status(201).json(createdEvent);
//     });
//   },

//   // Get all events
//   getAllEvents: (req, res) => {
//     Event.findAll((err, allEvents) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to retrieve events.' });
//       }
//       return res.status(200).json(allEvents);
//     });
//   },

//   // Get a specific event by ID
//   getEventById: (req, res) => {
//     const eventId = req.params.id;

//     Event.findById(eventId, (err, foundEvent) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to retrieve the event.' });
//       }
//       if (!foundEvent) {
//         return res.status(404).json({ error: 'Event not found.' });
//       }
//       return res.status(200).json(foundEvent);
//     });
//   },

//   // Update an event by ID
//   updateEvent: (req, res) => {
//     const eventId = req.params.id;
//     const updatedEvent = {
//       title: req.body.title,
//       date: req.body.date,
//       description: req.body.description,
//       // Add other event properties as needed
//     };

//     Event.update(eventId, updatedEvent, (err, numUpdated) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to update the event.' });
//       }
//       if (numUpdated === 0) {
//         return res.status(404).json({ error: 'Event not found.' });
//       }
//       return res.status(200).json({ message: 'Event updated successfully.' });
//     });
//   },

//   // Delete an event by ID
//   deleteEvent: (req, res) => {
//     const eventId = req.params.id;

//     Event.remove(eventId, (err, numRemoved) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to delete the event.' });
//       }
//       if (numRemoved === 0) {
//         return res.status(404).json({ error: 'Event not found.' });
//       }
//       return res.status(200).json({ message: 'Event deleted successfully.' });
//     });
//   },
// };

// module.exports = eventController;



// const db = new Event();
// db.init();

// Specify the path to the database file
// const dbFilePath = path.join(__dirname, 'data', 'events.db');

// Initialize the NeDB database
// const db = new Datastore({ filename: dbFilePath, autoload: true });

// Define the Event schema

// const Event = {
//   create: function (event, callback) {
//     db.insert(event, callback);
//   },

//   findById: function (eventId, callback) {
//     db.findOne({ _id: eventId }, callback);
//   },

//   findAll: function (callback) {
//     db.find({}, callback);
//   },

//   update: function (eventId, updatedEvent, callback) {
//     db.update({ _id: eventId }, { $set: updatedEvent }, {}, callback);
//   },

//   remove: function (eventId, callback) {
//     db.remove({ _id: eventId }, {}, callback);
//   },
// };

// class Events {
//   constructor(dbFilePath) {
//     if (dbFilePath) {
//       this.db = new Datastore({ filename: dbFilePath, autoload: true});
//       console.log('DB connected to ' + dbFilePath);
//         } else {
//             this.db = new Datastore();
//     }
//   }

//   init() {
//     this.db.insert({
//       title: req.body.title,
//       date: req.body.date,
//       description: req.body.description,
//     });
//     //for later debugging
//     console.log(db);
// }
// }

// module.exports = Events;