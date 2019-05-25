var models = require('../../models/models');
// var ServiceEmail = require('../../lib/services/sendEmail');

var config = require('configure');

exports.getTasks = function(req, res) {
  models.task.getTasks({ user_id: req.userId }, function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.json({ tasks : results });
    }
  });
}

exports.getTask = function(req, res) {
  models.task.getTask(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ task : result });
    }
  });
}

exports.createTask = function(req, res) {
  var taskData = req.body || { }

  taskData.feedback = req.feedbackId;

  models.task.create(taskData, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ task : result });
    }
  });
}

exports.updateTask = function(req, res, next) {
  models.task.update(req.params.id, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ task : result });
    }
  });
}

exports.deleteTask = function(req, res) {
  models.task.destroy(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ task : result });
    }
  });
}

// exports.contactUs = function(res, res) {
//   models.task.getTask(req.params.id, function(err, task){
//     models.user.getUser(task.user_id, function(err, user){

//       /* TODO:
//          1 - Hacer que se guarde el contacto.
//          2 - Crear el modelo contanct.
//          3 - Notificar sobre el contacto en la plataforma.
//          4 - Validar la public_key enviada en el body.
//       */
//       var body = {fromEmail: 'nicolas.suarez@3coode.com',
//                   fromName: 'Nicolas Suarez',
//                   fromMessage: 'Hola esto es una prueba con datos harcodeados.' }

//       ServiceEmail.generateEmail(user, body, task, function(err, json){
//         if(err) {return  res.send(err);}
//         return res.json({ serviceEmail : json });
//       })

//     });
//   });

// }