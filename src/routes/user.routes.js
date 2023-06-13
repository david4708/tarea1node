const express = require('express');
const userController = require('./../controllers/user.controller');
const router = express.Router();

//TODO: definir enpoints
router
  .route('/')
  .get(userController.findAllUsers)
  .post(userController.createUser);

router

  .route('/:id')
  .get(userController.findUser)
  .patch(userController.update)
  .delete(userController.delete);

module.exports = router;
