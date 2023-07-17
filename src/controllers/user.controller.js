const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');

const bcrypt = require('bcryptjs');
exports.findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });
  return res.status(200).json({
    status: 'success',
    users,
  });
});
exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user,
  });
});
exports.findUser = catchAsync(async (req, res) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    user,
  });
});
exports.update = catchAsync(async (req, res) => {
  const { user } = req;
  // const { id } = req.params;
  const { name, email } = req.body;

  await user.update({ name, email });
  return res.status(200).json({
    status: 'success',
    message: 'user updated',
  });
});
exports.delete = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disabled' });
  return res.status(200).json({
    status: 'success',
    message: 'user deleted',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'incorrect email o password',
    });
  }

  const token = await generateJWT(user.id);
  const { name, email } = req.body;
  res.status(200).json({
    status: 'success',
    token,
    user: {
      name,
      email,
    },
  });
});
