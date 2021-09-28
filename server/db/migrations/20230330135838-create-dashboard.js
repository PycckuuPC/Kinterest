/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dashboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      board_name: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.TEXT,
      },
      movies: {
        type: Sequelize.TEXT,
      },
      private: {
        type: Sequelize.BOOLEAN,
      },
      count_likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      count_fav: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Dashboards');
  },
};
