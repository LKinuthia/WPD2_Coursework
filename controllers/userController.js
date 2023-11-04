const userModel = require('../models/userModel');

// Controller function to handle event creation
function insertUsers(req, res) {
  const name = req.body['name'];
  const classYear = req.body['classYear'];
  const email = req.body['email'];
  const password = req.body['password'];
  const confirmPassword = req.body['confirmPassword'];
  
  console.log('Received Event name:', name);
  console.log('Received Event classYear:', classYear);
  console.log('Received Event email:', email);
  console.log('Received Event password:', password);
  console.log('Received Event confirmPassword:', confirmPassword);

  if (name && classYear && email && password && confirmPassword) {
    const userData = { name: name, classYear: classYear, email: email, password:password, confirmPassword: confirmPassword };
    
    console.log('The user data: ', userData);

    userModel.insertUser(userData, (err, newUser) => {
      if (err) {
        console.error('Error inserting event into the database:', err);
        res.status(500).json({ error: 'Failed to create the event.' });
      } else {
        console.log('User inserted into the database:', newUser);
        res.redirect('/events');
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid input data.' });
  }
}



function findUsers(req, res) {
    const nameTocheck = req.body['name'];

    console.log(nameTocheck);

    userModel.findUser(nameTocheck, (err, user) => {
        if(err){
            console.error('Error querying the database:', err);
            res.status(500).json({error: 'Database query error'});
        } else if (user) {
            res.redirect('/events');
        } else {
            const alertScript = "<script>alert('Invalid name'); window.location.href = '/signup';</script>";
            res.send(alertScript);
        }
    });

}


module.exports = {insertUsers, findUsers};