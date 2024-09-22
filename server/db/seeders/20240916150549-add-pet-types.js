'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'pet_types',
      [
        {
          type: 'cat',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: 'dog',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: 'parrot',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pet_types', null, {});
  },
};
