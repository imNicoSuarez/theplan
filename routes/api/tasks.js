var TasksCtrl = require('../../controllers/api/tasksCtrl');

var express = require('express');
var tasks = express.Router();

tasks.route('/')
  .get(TasksCtrl.getTasks)
  // .post(TasksCtrl.createTask);

tasks.route('/:id')
  .get(TasksCtrl.getTask)
  // .put(TasksCtrl.updateTask)
  // .delete(TasksCtrl.deleteTask);


module.exports = tasks;
