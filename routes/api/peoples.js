var PeoplesCtrl = require('../../controllers/api/peoplesCtrl');

var express = require('express');
var peoples = express.Router();

peoples.route('/')
  .get(PeoplesCtrl.getPeoples)
  .post(PeoplesCtrl.createPeople);

peoples.route('/:id')
  .get(PeoplesCtrl.getPeople)
  .put(PeoplesCtrl.updatePeople)
  .delete(PeoplesCtrl.deletePeople);


module.exports = peoples;
