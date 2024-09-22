const { Router } = require('express');
const { petTypesController } = require('../controllers');

const petTypesRouter = Router();

petTypesRouter.route('/').get(petTypesController.getPetTypes);

module.exports = petTypesRouter;
