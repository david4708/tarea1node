const express = require('express');
const userController = require('./../controllers/user.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const router = express.Router();

router
  .route('/')
  .get(authMiddleware.protect, userController.findAllUsers)
  .post(validationMiddleware.createUserValidation, userController.createUser);

router.post('/login', userMiddleware.existUserEmail, userController.login);

router.use(authMiddleware.protect);
router
  .use(userMiddleware.existUser)
  .route('/:id')
  .get(userController.findUser)
  .patch(authMiddleware.protectAccountOwner, userController.update)
  .delete(authMiddleware.protectAccountOwner, userController.delete);

module.exports = router;
