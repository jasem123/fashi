var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken")

// passprot --> login username and password
var passport = require("passport");

// DataBase mongoDB
const db = require("../../helper/db");
// var Product = require("../../models/product");


/* GET home page. */
router.get("/fashi", function (req, res, next) {
  res.render("fashi/index");
});

/* GET shop page. */
router.get("/fashi/shop", function (req, res, next) {
  res.render("fashi/shop");
});

/* GET blog page. */
router.get("/fashi/blog", function (req, res, next) {
  res.render("fashi/blog");
});

/* GET contact page. */
router.get("/fashi/contact", function (req, res, next) {
  res.render("fashi/contact");
});
/* GET login page. */
router.get("/fashi/login", function (req, res, next) {
  res.render("fashi/login");
});
/* post login page. */
// router.post("/api/login", function (req, res, ) {
//   if (req.body.username == "jasem" && req.body.password == "10101210") {
//     var token = jwt.sign({username : "jasem" , password : "10101210" }, "app1")
//   res.json({token : token})
//   }else{
//     res.json("Not Found the account")
//   }
  
// });



/* POST login page. */
router.post(
  "/fashi/login",
  passport.authenticate("local", {
    successRedirect: "/fashi",
    failureRedirect: "/fashi/login",
    failureFlash: true,
  })
);

/* GET register page. */
router.get("/fashi/register", function (req, res, next) {
  res.render("fashi/register");
});

/* post register page. */
router.post("/fashi/register", function (req, res, next) {
  db.User.create(req.body).then(function(result) {
    // res.locals.user = result
    res.redirect('/fashi/login');
  });
  // res.send(req.body)
});

/* GET blog-details page. */
router.get("/fashi/blog-details", function (req, res, next) {
  res.render("fashi/blog-details");
});
/* GET shopping-cart page. */
router.get("/fashi/shopping-cart", function (req, res, next) {
  res.render("fashi/shopping-cart");
});
/* GET check-out page. */
router.get("/fashi/check-out", function (req, res, next) {
  res.render("fashi/check-out");
});
/* GET faq page. */
router.get("/fashi/faq", function (req, res, next) {
  res.render("fashi/faq");
});

/* GET home page. */
// router.get('/fashi/index', function(req, res, next) {
//   res.render('fashi/index');
// });

module.exports = router;
