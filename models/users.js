'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    firstname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: "employee",
    },
    designation: DataTypes.STRING,
    department: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    dob: DataTypes.DATE,
    imei: DataTypes.STRING,
    lastscanned: DataTypes.DATE,
    status: DataTypes.STRING,
    profilepic: DataTypes.STRING,
    facility: DataTypes.STRING,
    hotdesk:DataTypes.STRING,
    statuscode: DataTypes.STRING,
    last_active:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};