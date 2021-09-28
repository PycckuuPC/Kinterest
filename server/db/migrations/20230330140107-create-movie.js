/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      api_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      info: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.FLOAT,
      },
      img: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  },
};
