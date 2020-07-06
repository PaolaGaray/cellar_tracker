const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
  const user = req.user;

  console.log('req.user:', req.user);
  res.render('index', { user: user});
});


module.exports = router;