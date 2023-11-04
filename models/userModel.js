const Datastore = require('nedb');
const path = require('path');

const dbFilePath = path.join(__dirname, 'data', 'users.db');

const db = new Datastore({ filename: dbFilePath, autoload: true});


// Function to add a new user 
function insertUser(userData, callback) {
  db.insert(userData, callback);
}

function findUser(name, callback) {
    db.findOne({name}, callback);
}

module.exports = {insertUser, findUser};
