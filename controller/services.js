const { servicesModel } = require("../models");

exports.create = async (req, res, next) => {
  const { name, type } = req.body;
  try {
    const service = await servicesModel.create({ name, type });
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const { name, _id, type } = req.body;
  try {
    var update = {};
    if (name) update.name = name;
    if (type) update.type = type;
    const service = await servicesModel.updateOne({ _id }, update);
    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  const { _id } = req.body;
  try {
    await servicesModel.updateOne({ _id }, { deleted: true });
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
    var data = await servicesModel.find(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
