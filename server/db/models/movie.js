const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Dashboard }) {
      this.belongsToMany(Category, {
        through: 'MovieAndCateg',
        foreignKey: 'movie_id',
      });
      this.belongsToMany(Dashboard, {
        through: 'DashboardAndMovie',
        foreignKey: 'movie_id',
      });
    }
  }
  Movie.init(
    {
      api_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      info: DataTypes.TEXT,
      date: DataTypes.STRING,
      rate: DataTypes.FLOAT,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );
  return Movie;
};
