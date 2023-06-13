const express = require('express');
const { route } = require('../app');
const repairController = require('./../controllers/repairs.controller');
const router = express.Router();

//TODO: DEFINIR ENDPOINTS

router
  .route('/')
  .get(repairController.findAllRepair)
  .post(repairController.create);

router
  .route('/:id')
  .get(repairController.findRepair)
  .patch(repairController.update)
  .delete(repairController.delete);

module.exports = router;
