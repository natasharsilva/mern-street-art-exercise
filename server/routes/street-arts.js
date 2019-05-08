const express = require('express');
const StreetArt = require('../models/StreetArt')
const uploader = require('../configs/cloudinary')
const router = express.Router();

// Route to get all street arts
router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(streetArt => {
      res.json(streetArt);
    })
    .catch(err => next(err))
});

router.get('/:streetArtId', (req, res, next) => {
  StreetArt.findById(req.params.streetArtId)
  .then(streetArt => {
    res.json({
      success: true,
      streetArt});
  })
  .catch(err => next(err))
})

// Route to create a street art
// `uploader.single('picture')` parses the data sent with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url
  StreetArt.create({ lat, lng, pictureUrl })
    .then(streetArt => {
      res.json({
        success: true,
        streetArt
      })
    })
    .catch(err => next(err))
});

module.exports = router;
