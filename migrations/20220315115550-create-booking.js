'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tableid: {
        type: Sequelize.STRING
      },
      selecteddate: {
        type: Sequelize.STRING
      },
      todate: {
        type: Sequelize.STRING
      },
      tabledetails: {
        type: Sequelize.STRING
      },
      seatnumber: {
        type: Sequelize.STRING
      },
      employeeid: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      fromtime: {
        type: Sequelize.STRING
      },
      totime: {
        type: Sequelize.STRING
      },
      floor: {
        type: Sequelize.STRING
      },
      tablename: {
        type: Sequelize.STRING
      },
      members: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};