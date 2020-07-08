const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Wine = require("../models/Wine");
const { uploader, cloudinary } = require("../config/cloudinary.js");


//List wines
router.get('/', (req, res) => {

  User.findById(req.user._id).populate("wineIds")
    .then(userDocument => {
console.log(userDocument)
      res.render('wines/show', { wines: userDocument.wineIds });
    }) 
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
    })
});


router.get(`/wines`, (req, res) => {
  res.render(`wines/show`);
});


//Create wines
router.get('/new', (req, res) => {
  const types = ["red", "white", "rose", "sparkling", "fortified" ];
 
  res.render('wines/new', { types: types});

});

router.post('/add-wines-form', uploader.single('photo'), (req, res) => {
  const { winery, name, type, year,  grape, country, region} = req.body;


  //console.log(req.file);
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const imgPublicId = req.file.public_id;


  const newWine = new Wine ( { winery, name, type, year,  grape, country, region, imgName, imgPublicId, imgPath} )
  newWine.save()
  .then((wine) => {
    User.findByIdAndUpdate(req.user._id, { $push: { wineIds: wine._id }}).then(() => res.redirect('/wines'))
    //res.redirect('/wines')
  })  
  .catch((error) => {
    console.log(error);
  })
});


//Delete wine
router.post('/details/:id/delete', (req, res) => {
  Wine.findByIdAndRemove(req.params.id)
    .then( wine => {

       // if movie has an image then we also want to delete the img on cloudinary
       if (wine.imgPath) {
        // delete the img on cloudinary - we need the so called public id
        cloudinary.uploader.destroy(wine.imgPublicId);
      }

      res.redirect('/wines');
    })
    .catch(err => {
      console.log(err);
      // next(err)
    })
})


//See wine details
router.get('/details/:id', (req, res, next) => {
  //console.log(req.params.id)
  Wine.findById(req.params.id)
      .then(wine => {
        //console.log(wine)
          res.render('wines/details', { wine });
      })
      .catch(err => {
          next(err);
      });
});


//Edit wine
router.get('/details/:id/edit', (req, res, next) => {
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
          res.redirect('/wines');
      })
      .catch(err => {
          next(err);
      });
})

module.exports = router;