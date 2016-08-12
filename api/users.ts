import express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Model
let User = mongoose.model('User', {
  email: String,
  password: String,
  date_created: Date,
  date_deleted: {
    type: Date,
    default: null
  }
})

//Create user
router.post('/users', (req, res, next) => {
  let new_user = new User ({
    email: req.body.email,
    password: req.body.password,
    date_created: new Date()
  });

  new_user.save((err, user) => {
    if(err) {
      console.log(err);
    } else {
      console.log(user);
    }
    res.send(user);
  })
})

export = router;
