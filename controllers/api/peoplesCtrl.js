var models = require('../../models/models');
// var ServiceEmail = require('../../lib/services/sendEmail');

var config = require('configure');

exports.getPeoples = function(req, res) {
  models.people.getPeoples({ user_id: req.userId }, function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.json({ peoples : results });
    }
  });
}

exports.getPeople = function(req, res) {
  models.people.getPeople(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ people : result });
    }
  });
}

exports.createPeople = function(req, res) {
  var peopleData = req.body || { }

  peopleData.feedback = req.feedbackId;

  models.people.create(peopleData, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ people : result });
    }
  });
}

exports.updatePeople = function(req, res, next) {
  models.people.update(req.params.id, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ people : result });
    }
  });
}

exports.deletePeople = function(req, res) {
  models.people.destroy(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ people : result });
    }
  });
}

// exports.contactUs = function(res, res) {
//   models.people.getPeople(req.params.id, function(err, people){
//     models.user.getUser(people.user_id, function(err, user){

//       /* TODO:
//          1 - Hacer que se guarde el contacto.
//          2 - Crear el modelo contanct.
//          3 - Notificar sobre el contacto en la plataforma.
//          4 - Validar la public_key enviada en el body.
//       */
//       var body = {fromEmail: 'nicolas.suarez@3coode.com',
//                   fromName: 'Nicolas Suarez',
//                   fromMessage: 'Hola esto es una prueba con datos harcodeados.' }

//       ServiceEmail.generateEmail(user, body, people, function(err, json){
//         if(err) {return  res.send(err);}
//         return res.json({ serviceEmail : json });
//       })

//     });
//   });

// }