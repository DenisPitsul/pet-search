'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetType extends Model {
    static associate (models) {
      PetType.hasMany(models.Pet, {
        foreignKey: 'petTypeId',
      });
    }
  }
  PetType.init(
    {
      type: DataTypes.STRING(64),
    },
    {
      sequelize,
      modelName: 'PetType',
      underscored: true,
    }
  );
  return PetType;
};
