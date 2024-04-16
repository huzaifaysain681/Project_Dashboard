const { vehiclesModel } = require("../models");

exports.create = async (req, res, next) => {
  const { color, type, plateNo, make, model, year } = req.body;
  try {
    const vehicle = await vehiclesModel.create({
      color,
      type,
      plateNo,
      make,
      model,
      year,
    });
    res.json({ success: true, vehicle });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const { color, _id, type, plateNo, make, model, year } = req.body;
  try {
    var update = {};
    if (color) update.color = color;
    if (type) update.type = type;
    if (plateNo) update.plateNo = plateNo;
    if (make) update.make = make;
    if (model) update.model = model;
    if (year) update.year = year;
    const vehicle = await vehiclesModel.updateOne({ _id }, update);
    res.json({ success: true, vehicle });
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  const { _id } = req.body;
  try {
    await vehiclesModel.updateOne({ _id }, { deleted: true });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    var { q, page, limit, type } = req.query;
    var query = { deleted: false };
    if (q) query.color = { $regex: q, $options: "i" };
    if (type) query.type = type;
    page = Number(page);
    limit = Number(limit);
    if (!limit) limit = 10;
    if (!page) page = 1;
    Promise.all([
      vehiclesModel.find(query).count(),
      vehiclesModel
        .find(query)
        .populate("type")
        .skip((page - 1) * limit)
        .limit(limit),
    ])
      .then(([total, products]) => {
        var totalPages = Math.ceil(total / limit);
        res.json({
          success: true,
          total,
          totalPages,
          currentPage: page,
          data: products,
        });
      })
      .catch((e) => {
        next(e);
      });
  } catch (error) {
    next(error);
  }
};
