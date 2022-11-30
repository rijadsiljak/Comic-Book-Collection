var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passportConfig = require("../config/passport.js");

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res, next) {
  //Email
  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);
  user.group = "User";
  user.save(function (err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      token: token,
    });
  });
};

module.exports.login = function (req, res, next) {
  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate("local", function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.authentication = {
  ensureAuth: function (req, res, next) {
    if (req) {
      return next();
    } else {
      return res.send(401);
    }
  },

  ensureAdmin: function (req, res, next) {
    // ensure authenticated user exists with admin role,
    // otherwise send 401 response status
    if (req.user && req.user.group == "Admin") {
      return next();
    } else {
      return res.send(401);
    }
  },

  user: function (req, res) {
    console.log("Sending current-user", req.user);
    if (!req.user) {
      return res.json(200, { user: null });
    }
    //delete private data from user before sending
    var user = req.user;
    return res.json(200, User.filterUser(user));
  },
};

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "MY_SECRET";
opts.userProperty = "payload";
opts.algorithms = ["HS256"];

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
