var express = require('express');
var fs = require('fs')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var profile_details = JSON.parse(fs.readFileSync("data.json"))

  res.render('index', { title: 'Tinder Profile Explorer', username: profile_details.User.name });
});

module.exports = router;
