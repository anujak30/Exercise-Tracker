const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    // Get list of all users from MongoDB Atlas DB
    User.find()                     
     .then(users => res.json(users))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // Extract data from request
    const username = req.body.username;
    
    // Create and save a new user instance to the DB
    const newUser = new User({username});

    newUser.save()
     .then(() => res.json('User added!'))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
     .then(user => res.json(user))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
     .then(() => res.json('User deleted.'))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
     .then(user => {
        user.username = req.body.username;

        user.save()
         .then(() => res.json('User updated.'))
         .catch(err => res.status(400).json('Error: ' + err));
     })
     .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;