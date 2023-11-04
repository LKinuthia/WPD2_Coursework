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


