const path = require('path');

const CONSTANTS = {
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
  CITIES: ['Kyiv', 'Dnipro', 'New Your'],
};

module.exports = CONSTANTS;
