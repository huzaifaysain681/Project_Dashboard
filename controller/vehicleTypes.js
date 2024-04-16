const { vehicleTypesModel } = require("../models");

exports.create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const vehicleType = await vehicleTypesModel.create({ name });
    res.json({ success: true, vehicleType });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const { name, _id } = req.body;
  try {
    var update = {};
    if (name) update.name = name;
    const vehicleType = await vehicleTypesModel.updateOne({ _id }, update);
    res.json({ success: true, vehicleType });
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  const { _id } = req.body;
  try {
    await vehicleTypesModel.updateOne({ _id }, { deleted: true });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const { q } = req.query;
    var query = { deleted: false };
    if (q) query.name = { $regex: q, $options: "i" };
    var data = await vehicleTypesModel.find(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
