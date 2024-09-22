const { Router } = require('express');
const { petsController } = require('../controllers');
const { upload, validate, paginate } = require('../middleware');

const petsRouter = Router();

petsRouter
  .route('/')
  .post(
    upload.uploadPetImage,
    validate.validatePetOnCreate,
    petsController.createPet
  )
  .get(paginate.paginatePets, petsController.getPets);

petsRouter
  .route('/:id')
  .get(petsController.getPetById)
  .patch(
    upload.uploadPetImage,
    validate.validatePetOnUpdate,
    petsController.updatePetById
  )
  .delete(petsController.deletePetById);

module.exports = petsRouter;
