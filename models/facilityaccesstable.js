'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facilityaccesstable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Facilityaccesstable.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    deviceid: DataTypes.STRING,
    features: DataTypes.STRING,
    noofpax: DataTypes.STRING,
    floor: DataTypes.STRING,
    purpose: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Facilityaccesstable',
  });
  return Facilityaccesstable;
};