const express = require('express');
const { route } = require('../app');
const repairController = require('./../controllers/repairs.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');

const repairMiddleware = require('./../middlewares/repair.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairController.findAllRepair)
  .post(validationMiddleware.createRepairValidation, repairController.create);

router
  .use('/:id', repairMiddleware.existRepair)
  .use(authMiddleware.restrictTo('employee'))
  .route('/:id')
  .get(repairController.findRepair)
  .patch(repairController.update)
  .delete(repairController.delete);

module.exports = router;
