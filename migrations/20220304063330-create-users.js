'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      imei: {
        type: Sequelize.STRING
      },
      lastscanned: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      profilepic: {
        type: Sequelize.STRING
      },
      facility: {
        type: Sequelize.STRING
      },
      statuscode: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      hotdesk: {
        type: Sequelize.STRING
      },
      last_active: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};