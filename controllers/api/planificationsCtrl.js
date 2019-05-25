var models = require('../../models/models');
var mail = require('../../lib/services/sendEmail');
var async = require('async');
// var ServiceEmail = require('../../lib/services/sendEmail');

var config = require('configure');

exports.getPlanifications = function(req, res) {
  models.planification.getPlanifications({ user_id: req.userId }, function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.json({ planifications : results });
    }
  });
}

exports.getPlanification = function(req, res) {
  models.planification.getPlanification(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ planification : result });
    }
  });
}

exports.createPlanification = function(req, res) {
  var planificationData = req.body || { }

  models.planification.create(planificationData, function(err, result){
    if (err) {
      res.send(err);
    } else {
      async.nextTick(function() {
        mail.subscribeEmail(result, function(err, json){
          console.log(json)
        }); 
      });
      
      res.json({ planification : result });
    }
  });
}

exports.updatePlanification = function(req, res, next) {
  models.planification.update(req.params.id, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ planification : result });
    }
  });
}

exports.deletePlanification = function(req, res) {
  models.planification.destroy(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.redirect('/');
      // res.json({ planification : result });
    }
  });
}