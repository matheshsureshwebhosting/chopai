'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('floorthirteens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tablenumber: {
        type: Sequelize.INTEGER
      },
      tablename: {
        type: Sequelize.STRING
      },
      seatcount: {
        type: Sequelize.INTEGER
      },
      occupied: {
        type: Sequelize.INTEGER
      },
      available: {
        type: Sequelize.INTEGER
      },
      seat1: {
        type: Sequelize.INTEGER
      },
      seat2: {
        type: Sequelize.INTEGER
      },
      seat3: {
        type: Sequelize.INTEGER
      },
      seat4: {
        type: Sequelize.INTEGER
      },
      seat5: {
        type: Sequelize.INTEGER
      },
      seat6: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('floorthirteens');
  }
};