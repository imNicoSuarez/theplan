var CilentsCtrl = require('../../controllers/api/clientsCtrl');

var express = require('express');
var clientsPublic = express.Router();
var clientsPrivate = express.Router();

clientsPublic.route('/')
  // .get(CilentsCtrl.getCilents);


clientsPublic.route('/:id')
  // .get(CilentsCtrl.getCilent);
  // .put(CilentsCtrl.updateCilent)
  // .delete(CilentsCtrl.deleteCilent);


clientsPrivate.route('/')
  // .post(CilentsCtrl.createCilent);


module.exports = {
  public:clientsPublic,
  private:clientsPrivate
};

