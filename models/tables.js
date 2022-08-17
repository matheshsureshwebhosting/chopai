'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tables.init({
    tablenumber: DataTypes.INTEGER,
    seatcount: DataTypes.INTEGER,
    floor: DataTypes.STRING,
    seat1: DataTypes.INTEGER,
    seat2: DataTypes.INTEGER,
    seat3: DataTypes.INTEGER,
    seat4: DataTypes.INTEGER,
    seat5: DataTypes.INTEGER,
    seat6: DataTypes.INTEGER,
    seat: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tables',
  });
  return tables;
};