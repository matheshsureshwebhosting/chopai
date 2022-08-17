'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    tableid: DataTypes.STRING,
    seatnumber: DataTypes.STRING,
    employeeid: DataTypes.STRING,
    status: DataTypes.STRING,
    selecteddate: DataTypes.STRING,
    todate: DataTypes.STRING,
    tabledetails: DataTypes.STRING,
    fromtime: DataTypes.STRING,
    totime: DataTypes.STRING,
    floor: DataTypes.STRING,
    tablename: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};