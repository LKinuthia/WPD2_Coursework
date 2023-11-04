const Datastore = require('nedb');
const path = require('path');

const dbFilePath = path.join(__dirname, 'data', 'events.db');

const db = new Datastore({ filename: dbFilePath, autoload: true});

// Function to create a new event
function createEvent(eventData, callback) {
  db.insert(eventData, callback);
}


function updateEvent(eventId, updatedEvent, callback) {
    db.update({id: eventId }, { $set: updatedEvent }, {}, callback);
}



function deleteEvent(eventId, callback) {
      db.remove({ id: eventId }, {}, callback);
    }

// Function to retrieve all events
function getEvents(callback) {
  db.find({}, callback);
}

module.exports = { createEvent, getEvents, updateEvent, deleteEvent};




// function updateEvent(eventId, newEventName, newEventDate, callback) {
//   db.update(
//     { id: eventId, name: newEventName }, // Assuming eventId is the unique identifier of the event
//     { $set: { date: newEventDate } },
//     {},
//     (err, numUpdated) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         if (numUpdated === 1) {
//           // The update was successful
//           callback(null, { id: eventId, name: newEventName, date: newEventDate });
//         } else {
//           // The event with the provided eventId was not found
//           callback('Event not found', null);
//         }
//       }
//     }
//   );
// }



// const Event = { 
//   insert: function (event, callback) {
//     db.insert(event, callback);
//   },

//   // Get all events from the NEDB
//   getAll: function (callback) {
//     db.find({}, callback);
//   },
// };

// module.exports = Event;




// class GuestBook {
//     constructor(dbFilePath) {
//         if (dbFilePath) {
//             this.db = new Datastore({ filename: dbFilePath, autoload: true });
//             console.log('DB connected to ' + dbFilePath);
//         } else {
//             this.db = new Datastore();
//         }
//     }

//     // init() {
//     //     this.db.insert({
//     //       title: req.body.title,
//     //       date: req.body.date,
//     //       description: req.body.description,
//     //     });
//     //     //for later debugging
//     //     console.log();
//     // }

//     //a function to return all entries from the database
//     getAllEntries() {
//         //return a Promise object, which can be resolved or rejected
//         return new Promise((resolve, reject) => {
//             //use the find() function of the database to get the data,
//             //error first callback function, err for error, entries for data
//             this.db.find({}, function (err, entries) {
//                 //if error occurs reject Promise
//                 if (err) {
//                     reject(err);
//                     //if no error resolve the promise & return the data
//                 } else {
//                     resolve(entries);
//                     //to see what the returned data looks like
//                     console.log(entries);
//                 }
//             })
//         })
//     }
  
// }
// module.exports = GuestBook;




















// // Initialize the NeDB database
// const db = require('../database');

// // Define the Event schema
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

// module.exports = Event;


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