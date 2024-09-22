const {
  CREATE_PET_VALIDATION_SCHEMA,
  UPDATE_PET_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validatePetOnCreate = async (req, res, next) => {
  const { body } = req;

  try {
    req.body = await CREATE_PET_VALIDATION_SCHEMA.validate(body);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validatePetOnUpdate = async (req, res, next) => {
  const { body } = req;

  try {
    req.body = await UPDATE_PET_VALIDATION_SCHEMA.validate(body);
    next();
  } catch (err) {
    next(err);
  }
};
