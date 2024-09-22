const { Router } = require('express');
const petsRouter = require('./petsRouter');
const petTypesRouter = require('./petTypesRouter');

const router = Router();

router.use('/pets', petsRouter);
router.use('/petTypes', petTypesRouter);

module.exports = router;
