var models = require('../models/models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hoho Challenge', lastChallenge: [], tweets: [] });

  // models.challenge.getChallenges(function(err, results){
  //   var last =  results.pop();
  //   models.tweet.getTweets({challenge_id: last._id}, function(err, tweets){
  //     var lastSix = tweets.slice(-6);
  //     if (err) {
  //       res.render('index', { title: 'Hoho Challenge', lastChallenge: last, tweets: lastSix });
  //     } else {
  //       res.render('index', { title: 'Hoho Challenge', lastChallenge: last, tweets: lastSix });
  //     }
  //   });
   
  // });

});

module.exports = router;
