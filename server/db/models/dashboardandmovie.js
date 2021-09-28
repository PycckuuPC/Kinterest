const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DashboardAndMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Dashboard }) {
      this.belongsTo(Dashboard, {
        foreignKey: 'board_id',
      });
    }
  }
  DashboardAndMovie.init(
    {
      board_id: DataTypes.INTEGER,
      movie_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DashboardAndMovie',
    }
  );
  return DashboardAndMovie;
};
