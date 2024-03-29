var mongoose = require("mongoose");
let User = require("../Model/User");

module.exports.profileRead = function (req, res, next) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile",
    });
  } else {
    // Otherwise continue
    User.findById(req.payload._id).exec(function (err, user) {
      res.status(200).json(user);
    });
  }
};
