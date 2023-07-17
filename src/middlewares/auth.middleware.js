const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // res.status(401).json({
    //   status: 'error',
    //   message: 'you are not logged in! please log in to get acces',
    // });
    return next(new AppError('you are not logged in! to get acces', 401));
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    // res.status(401).json({
    //   status: 'error',
    //   message: 'the owner of this token it not longer availablle',
    // });
    return next(
      new AppError('the owner of this token it not longer availablle', 401)
    );
  }

  (req.sessionUser = user), next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      // res.status(403).json({
      //   status: 'error',
      //   message: 'you do not have permission to perform this action!',
      // });

      return next(new AppError('You do not own this account.', 403));
    }
    next();
  };
};

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});
