'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logdata.init({
    time: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING,
    temperature: DataTypes.STRING,
    name: DataTypes.STRING,
    deviceid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'logdata',
  });
  return logdata;
};