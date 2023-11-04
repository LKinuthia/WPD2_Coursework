// index.js
const express = require('express');
const mustacheExpress = require('mustache-express');
// const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/authRoute');
const eventroutes = require('./routes/events');
const userroutes = require('./routes/users');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Configure Mustache as the view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/', routes);
app.use('/signup', userroutes);
app.use('/events', eventroutes);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;