const express = require("express");
var app = express();
const comicRoute = express.Router();
var jwt = require("express-jwt");

var auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload",
  algorithms: ["HS256"],
});

var ctrlProfile = require("../controllers/profile");
var ctrlAuth = require("../controllers/authentication");

// comic model
let Comic = require("../Model/Comic");
let User = require("../Model/User");

// profile
comicRoute.get("/profile", auth, ctrlProfile.profileRead);

// authentication
comicRoute.post("/register", ctrlAuth.register);

comicRoute.post("/login", ctrlAuth.login);

// Get All Users
comicRoute.route("/user-list").get((req, res, next) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All Comics
comicRoute.route("/list").get((req, res, next) => {
  Comic.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

/*

    {$lookup:
        {
            from: "Comic",
            localField: "_id",
            foreignField: "comics_own",
            as: "books"
        }}
        */
comicRoute.route("/collect").get(async (req, res, next) => {
  try {
    let comics = await User.aggregate([
      {
        $lookup: {
          from: "comics",
          localField: "id",
          foreignField: "comics_own.comic_id",
          as: "comics_owned",
        },
      },
    ]);

    res.status(200).json(comics);
  } catch (err) {
    res.status(404).json({ success: false, msg: "Comics are not found" });
  }
});

comicRoute.route("/collection/:id").get(async (req, res, next) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      var ids = [];
      data.comics_own.forEach((element) => {
        ids.push(element.comic_id);
      });
      Comic.find()
        .where("_id")
        .in(ids)
        .exec((err, records) => {
          res.json(records);
        });
    }
  });
});

// Delete comic
comicRoute.route("/delete-user/:id").delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Add comic
comicRoute.route("/create").post((req, res, next) => {
  Comic.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get All Comics
comicRoute.route("/").get((req, res, next) => {
  pageSize = parseInt(req.query.pageSize);
  pageIndex = parseInt(req.query.pageIndex);
  if (pageSize == null || pageSize < 0) {
    pageSize = 9;
  }
  if (pageIndex == null || pageIndex < 0) {
    pageIndex = 0;
  }

  Comic.find()
    .limit(pageSize)
    .skip(pageSize * pageIndex)
    .sort({ dateIssued: -1 })
    .exec((error, data) => {
      if (error) {
        return next(error);
      } else {
        Comic.count().exec((error, data2) => {
          if (error) {
            return next(error);
          } else {
            responseData = {};
            responseData.items = data;
            responseData.lenght = data2;
            res.json(responseData);
          }
        });
      }
    });
});

comicRoute.route("/owned").get((req, res, next) => {
  Comic.find({ own: true }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single comic
comicRoute.route("/read/:id").get((req, res, next) => {
  Comic.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single user
comicRoute.route("/user-read/:id").get((req, res, next) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update comic
comicRoute.route("/update/:id").put((req, res, next) => {
  Comic.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

// Update User
comicRoute.route("/user-update/:id").put((req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("User updated successfully");
      }
    }
  );
});

// Update comic own status
comicRoute.route("/wish/:id").put((req, res, next) => {
  Comic.findByIdAndUpdate(
    req.params.id,
    {
      own: true,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

// Update comic own status
comicRoute.route("/own/:id").put((req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comics_own: { comic_id: req.body.data } },
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

// Delete comic
comicRoute.route("/delete/:id").delete((req, res, next) => {
  Comic.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = comicRoute;
