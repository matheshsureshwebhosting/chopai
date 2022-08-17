'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class floorthirteenrooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  floorthirteenrooms.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    deviceid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'floorthirteenrooms',
  });
  return floorthirteenrooms;
};