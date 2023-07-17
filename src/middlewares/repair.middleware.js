const Repair = require('../models/repair.model');

const catchAsync = require('../utils/catchAsync');
exports.existRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return next(new AppError(`Repair with id: ${id} not found`));
  }

  req.repair = repair;
  next();
});
