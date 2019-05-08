const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.find({'_user': req.user._id}).populate('_streetArt')
    .then(visits => {
      res.json({
        success: true,
        visits
      })
    })
    .catch(err => next(err))
});

router.post('/visits', isLoggedIn, (req, res, next) => {
  Visit.create({ _user: req.user._id, _streetArt: req.body._streetArt })
    .then(visit => {
      res.json({
        success: true,
        visit
      });
    })
    .catch(err => next(err))
})

router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
  Visit.find(req.params.visitId)
  .then(visit => {
    if(visit._user === req.user._id){
      Visit.findByIdAndDelete(req.params.visitId)
      .then(visit => { 
        if (visit) {
          res.json({ 
            success: true,
            message: `The visit with the id ${req.params.visitId} was deleted`
          })
        }
        else {
          next({
            status: 400,
            message: `There is no country with the id ${req.params.visitId}`
          })
        }})
        .catch(err => next(err))
    }
  })
  .catch(err => next(err))

})

module.exports = router;