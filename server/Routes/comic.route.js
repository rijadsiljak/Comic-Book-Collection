const express = require('express');
const app = express();
const comicRoute = express.Router();

// comic model
let Comic = require('../Model/Comic');

// Add comic
comicRoute.route('/create').post((req, res, next) => {
  Comic.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Comics
comicRoute.route('/').get((req, res,next) => {
    Comic.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

comicRoute.route('/owned').get((req, res,next) => {
  Comic.find({"own": true},(error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

// Get single comic
comicRoute.route('/read/:id').get((req, res,next) => {
    Comic.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update comic
comicRoute.route('/update/:id').put((req, res, next) => {
    Comic.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete comic
comicRoute.route('/delete/:id').delete((req, res, next) => {
  Comic.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = comicRoute;