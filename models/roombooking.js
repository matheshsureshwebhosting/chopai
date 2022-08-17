'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RoomBooking.init({
    roomid: DataTypes.STRING,
    selecteddate: DataTypes.STRING,
    todate: DataTypes.STRING,
    fromtime: DataTypes.STRING,
    totime: DataTypes.STRING,
    employeeid: DataTypes.STRING,
    status: DataTypes.STRING,
    packs: DataTypes.INTEGER,
    floor: DataTypes.STRING,
    members: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'RoomBooking',
  });
  return RoomBooking;
};