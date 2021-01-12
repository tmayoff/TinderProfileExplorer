var express = require('express');
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

  // Save uploaded JSON into a session
  var profile_details = JSON.parse(file.data.toString())
  req.session.profile_details = profile_details
  req.session.save(() => {
    res.redirect("/user")
  })
});

module.exports = router;
