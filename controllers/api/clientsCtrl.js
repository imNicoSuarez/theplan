var models = require('../../models/models');
// var ServiceEmail = require('../../lib/services/sendEmail');

var config = require('configure');

exports.getClients = function(req, res) {
  models.client.getClients(function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.json({ clients : results });
    }
  });
}

exports.getClient = function(req, res) {
  models.client.getClient(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ client : result });
    }
  });
}

exports.createClient = function(req, res) {
  var clientData = req.body || { }

  clientData.feedback = req.feedbackId;

  models.client.create(clientData, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ client : result });
    }
  });
}

exports.updateClient = function(req, res, next) {
  models.client.update(req.params.id, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ client : result });
    }
  });
}

exports.deleteClient = function(req, res) {
  models.client.destroy(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ client : result });
    }
  });
}

// exports.contactUs = function(res, res) {
//   models.client.getClient(req.params.id, function(err, client){
//     models.user.getUser(client.user_id, function(err, user){

//       /* TODO:
//          1 - Hacer que se guarde el contacto.
//          2 - Crear el modelo contanct.
//          3 - Notificar sobre el contacto en la plataforma.
//          4 - Validar la public_key enviada en el body.
//       */
//       var body = {fromEmail: 'nicolas.suarez@3coode.com',
//                   fromName: 'Nicolas Suarez',
//                   fromMessage: 'Hola esto es una prueba con datos harcodeados.' }

//       ServiceEmail.generateEmail(user, body, client, function(err, json){
//         if(err) {return  res.send(err);}
//         return res.json({ serviceEmail : json });
//       })

//     });
//   });

// }