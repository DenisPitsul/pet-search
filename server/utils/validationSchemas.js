const yup = require('yup');
const { CITIES } = require('../constants');

module.exports.CREATE_PET_VALIDATION_SCHEMA = yup.object({
  name: yup.string().trim().min(1).max(32).required(),
  owner: yup.string().trim().min(1).max(64).required(),
  ownerContacts: yup
    .string()
    .length(13)
    .matches(/^\+\d{12}$/, 'Phone number must correspond +XX XXX XXX XX XX')
    .required(),
  description: yup.string().trim().min(1).max(255).required(),
  city: yup.string().oneOf(CITIES).required(),
  lostDate: yup.date().max(new Date()).required(),
  petTypeId: yup.number().min(1).required(),
});

module.exports.UPDATE_PET_VALIDATION_SCHEMA = yup.object({
  name: yup.string().trim().min(1).max(32),
  owner: yup.string().trim().min(1).max(64),
  ownerContacts: yup
    .string()
    .length(13)
    .matches(/^\+\d{12}$/, 'Phone number must correspond +XX XXX XXX XX XX'),
  description: yup.string().trim().min(1).max(255),
  city: yup.string().oneOf(CITIES),
  lostDate: yup.date().max(new Date()),
  isFound: yup.boolean(),
  petTypeId: yup.number().min(1),
});
