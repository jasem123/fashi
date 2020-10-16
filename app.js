var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var DashboardRouter = require("./routes/Dashboard");
var fashiIndexRouter = require("./routes/fashi/index");

// passport --> login username and password
var passport = require("passport");
var passportLocal = require("passport-local");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Data Base
var db = require('./helper/db');

var app = express();

// jwt 
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'app1'
},
function (jwtPayload, cb) {

  return cb(null, {username : "jasem"});

  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  // return UserModel.findOneById(jwtPayload.id)
  //     .then(user => {
  //         return cb(null, user);
  //     })
  //     .catch(err => {
  //         return cb(err);
  //     });
}
));

// passport
passport.use(
  new passportLocal(function (username, password, cb) {
  //   if (username == "jasem" && password == "123456") {
  //     cb(null, { username: "jasem" });
  //   } else {
  //     cb(null, false);
  //   }
  db.User.findOne({ username : username }, function (err, res) {
    if (res) {
      if (res.password == password) {
        cb(null, res);
      } else {
        cb(null, false);
      }
    } else {
      cb(null, false);
      
    }
    // console.log("res", res)
  });
  })
  );
passport.serializeUser(function (user, cb) {
  // cb(null, user.id);
  cb(null, user);
});

passport.deserializeUser(function (id, cb) {
  // db.users.findById(id, function (err, user) {
  //   if (err) {
  //     return cb(err);
  //   }
  //   cb(null, user);
  // });
  cb(null, {username : "jasem"});

});







// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "vash");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// passport
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// 
app.use(function(req , res , next) {
  res.locals.user = req.session.passport ? req.session.passport.user : null;
  console.log("req.session" , req.session);
  console.log("res.locals.user" , res.locals.user);
  next();
})


app.use("/",  usersRouter);
app.use("/", DashboardRouter);
// app.use("/", passport.authenticate('jwt', {session: false}) ,fashiIndexRouter);
app.use("/", fashiIndexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
