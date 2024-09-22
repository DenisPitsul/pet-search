const { PetType } = require('../db/models');

module.exports.getPetTypes = async (req, res, next) => {
  try {
    const foundTypes = await PetType.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundTypes });
  } catch (err) {
    next(err);
  }
};
