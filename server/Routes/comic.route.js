const express = require('express');
const app = express();
const comicRoute = express.Router();

// comic model
let Comic = require('../Model/Comic');
let User = require('../Model/User');


// Get All Users
comicRoute.route('/user-list').get((req, res,next) => {
  User.find((error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})


// Add user
comicRoute.route('/create-user').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Delete comic
comicRoute.route('/delete-user/:id').delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})



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
    pageSize  = parseInt(req.query.pageSize);
    pageIndex  = parseInt(req.query.pageIndex);
    if(pageSize==null || pageSize<0)
    {
      pageSize=9;
    }
    if(pageIndex==null || pageIndex<0)
    {
      pageIndex=0;
    }
  Comic.find().limit(pageSize).skip(pageSize*pageIndex).sort({dateIssued: -1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        Comic.count().exec((error, data2) => {
          if (error) {
            return next(error)
          } else {
            responseData = {};
            responseData.items=data;
            responseData.lenght=data2;
            res.json(responseData)
          }});
     
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

// Update comic
comicRoute.route('/wish/:id').put((req, res, next) => {
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