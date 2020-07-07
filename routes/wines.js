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
  const { winery, name, type, year,  grape, country, region} = req.body;
  const newWine = new Wine ( { winery, name, type, year,  grape, country, region} )
  newWine.save()
  .then((wine) => {
    res.redirect('/wines')
  })  
  .catch((error) => {
    console.log(error);
  })
});

//Delete Wines
router.get('/wines/delete/:wineId', (req, res) => {
  Wine.deleteOne({ _id: req.params.wineId })
    .then(() => {
      res.redirect('/wines/show');
    })
    .catch(err => {
      console.log(err);
      // next(err)
    })
})


//HELP!
//See wine details
router.get('details/:id', (req, res, next) => {
  Wine.findById(req.params.id)
      .then(wine => {
          res.render('/details', { wine: id });
      })
      .catch(err => {
          next(err);
      });
});


//HELP!
//Update wine
router.get('details/:id/edit', (req, res, next) => {
  Wine.findById(req.params.id)
      .then(wine => {
          res.render('wines/edit', { wine });
      })
      .catch(err => {
          next(err);
      });
});

router.post('/:id', (req, res, next) => {
  const { winery, name, type, year,  grape, country, region } = req.body;
  Wine.findByIdAndUpdate(req.params.id, { winery, name, type, year,  grape, country, region })
      .then(() => {
          res.redirect('/wine');
      })
      .catch(err => {
          next(err);
      });
})



module.exports = router;