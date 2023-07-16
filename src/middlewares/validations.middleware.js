const { validationResult, body } = require('express-validator');
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};
exports.createLoginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be null')
    .isEmail()
    .withMessage('Email most be a correct format'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be null')
    .isLength({ min: 6 })
    .withMessage('la contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('la contraseña debe tener al menos un numero')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('la constraseña debe tener al menos un caracter especial'),
  this.validateFields,
];
// axios.post("endpoint",{email:"elemail",password:"lapassword"})

exports.createUserValidation = [
  body('name').notEmpty().withMessage('name cannot be null'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be null')
    .isEmail()
    .withMessage('Email most be a correct format'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be null')
    .isLength({ min: 6 })
    .withMessage('la contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('la contraseña debe tener al menos un numero')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('la constraseña debe tener al menos un caracter especial'),
  this.validateFields,
];

exports.createRepairValidation = [
  body('date').notEmpty().withMessage('Date cannot be null'),
  body('motornumber').notEmpty().withMessage('motornumber cannot be null'),
  body('description').notEmpty().withMessage('description cannot be null'),
  body('userId').notEmpty().withMessage('userId cannot be null'),
  this.validateFields,
];
