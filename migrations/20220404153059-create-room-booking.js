'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RoomBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomid: {
        type: Sequelize.STRING
      },
      selecteddate: {
        type: Sequelize.STRING
      },
      todate: {
        type: Sequelize.STRING
      },
      fromtime: {
        type: Sequelize.STRING
      },
      totime: {
        type: Sequelize.STRING
      },
      employeeid: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      packs: {
        type: Sequelize.INTEGER
      },
      floor: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('RoomBookings');
  }
};