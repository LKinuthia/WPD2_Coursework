// routes/authRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventsController');
const { check, validationResult } = require('express-validator');


// Home page (login)
router.get('/login', (req, res) => {
    res.render('login');
});

// Home page (signup)
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Events page (Account)
router.get('/events', (req, res) => {
    res.render('events');
});


// call to require('express')
const signupValidation = [
    check('name').exists().isLength({ min: 5 }).trim().escape().withMessage('Name must have more than 5 characters'),
    check('classYear', 'Class Year should be a number').not().isEmpty().isInt(),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 }),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),

];

router.post('/createEvent', eventController.createEvent);
router.post('/updateEvent', eventController.editEvent);
router.post('/deleteEvent', eventController.deleteEvent);
router.post('/listEvents', eventController.getAllEvents);

router.post('/signup', signupValidation, userController.insertUsers);

router.post('/login', userController.findUsers);

module.exports = router;




// // Authentication routes
// router.post('/login', authController.login);
// router.post('/signup', authController.signup);

// // User dashboard
// router.get('/dashboard', (req, res) => {
//     res.render('dashboard');
// });
