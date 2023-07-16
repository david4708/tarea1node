const User = require('../models/user.model');
const generateJWT = require('../utils/jwt');

const bcrypt = require('bcryptjs');
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });
    return res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });

    const token = await generateJWT(user.id);

    return res.status(200).json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
    });
  }
};
exports.findUser = async (req, res) => {
  try {
    const { user } = req;
    // const { id } = req.params;
    // const user = await User.findOne({
    //   where: {
    //     id,
    //     status: 'available',
    //   },
    // });
    // if (!user) {
    //   return res.status(404).json({
    //     status: 'error',
    //     message: `User with id: ${id} not found`,
    //   });
    // }
    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
    });
  }
};
exports.update = async (req, res) => {
  try {
    const { user } = req;
    // const { id } = req.params;
    const { name, email } = req.body;
    // const user = await User.findOne({
    //   where: {
    //     id,
    //     status: 'available',
    //   },
    // });
    // if (!user) {
    //   return res.status(404).json({
    //     status: 'error',
    //     message: `User with id: ${id} not found`,
    //   });
    // }
    await user.update({ name, email });
    return res.status(200).json({
      status: 'success',
      message: 'user updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const { user } = req;
    // const { id } = req.params;
    // const user = await User.findOne({
    //   where: {

    //     id,
    //     status: 'available',
    //   },
    // });
    // if (!user) {
    //   return res.status(404).json({
    //     status: 'error',
    //     message: `User with id: ${id} not found`,
    //   });
    // }
    await user.update({ status: 'disabled' });
    return res.status(200).json({
      status: 'success',
      message: 'user deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong!',
    });
  }
};

exports.login = async (req, res, next) => {
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

    //todo: validar no  envio de la contraseña
    user: {
      name,
      email,
    },
  });
};
