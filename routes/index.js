const express = require('express');
const Wine = require('../models/Wine');
const router  = express.Router();
const { uploader, cloudinary } = require("../config/cloudinary.js");

const loginCheck = () => {
  return (req, res, next) => {
    // instead of if (req.session.user) - passport uses req.isAuthenticated()
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect('/auth/login');
    }
  };
};

/* GET home page */
router.get('/', (req, res, next) => {
  const user = req.user;
console.log(user)
  console.log('req.user:', req.user);
  res.render('index', { user: user});
});

router.get('/paola', loginCheck(), (req, res, next) => {
    const user = req.user;
    res.render('wines/show', { user: user});
});



module.exports = router;