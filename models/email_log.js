'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  email_log.init({
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'email_log',
  });
  return email_log;
};