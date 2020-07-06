const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wine = require("../models/Wine");


//List wines
router.get('/', (req, res) => {
  Wine.find()
    .then(allTheWinesFromDB => {
      res.render('wines/show', { wines: allTheWinesFromDB });
    }) 
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
    })
});


//Create wines
router.get('/new', (req, res) => {
  res.render('wines/new')
});

router.post('/add-wines-form', (req, res) => {
  const { winery, name, type, year,  grape, Country, Region} = req.body;
  const newWine = new Wine ( { winery, name, type, year,  grape, Country, Region} )
  newWine.save()
  .then((wine) => {
    res.redirect('/wines')
  })  
  .catch((error) => {
    console.log(error);
  })
});


//See wine details

module.exports = router;