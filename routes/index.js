var express = require('express');
var fs = require('fs')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Tinder Profile Explorer' });
});

router.post('/upload', function (req, res, next) {

  var file = req.files.data
  if (file.mimetype != "application/json") {
    return res.redirect("/")
  }

  var profile_details = JSON.parse(file.data.toString())
  req.session.profile_details = profile_details
  req.session.save(() => {
    res.redirect("/user")
  })
});

module.exports = router;
