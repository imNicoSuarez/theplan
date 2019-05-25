var PlanificationsCtrl = require('../../controllers/api/planificationsCtrl');

var express = require('express');
var planifications = express.Router();

planifications.route('/')
  // .get(PlanificationsCtrl.getPlanifications)
  .post(PlanificationsCtrl.createPlanification);

planifications.route('/:id/unsubscribe')
  .get(PlanificationsCtrl.deletePlanification);
  // .put(PlanificationsCtrl.updatePlanification)



module.exports = planifications;
