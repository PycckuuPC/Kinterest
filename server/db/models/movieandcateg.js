const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieAndCateg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie, Category }) {
      this.belongsTo(Movie, {
        foreignKey: 'movie_id',
      });

      this.belongsTo(Category, {
        foreignKey: 'category_id',
      });
    }
  }
  MovieAndCateg.init(
    {
      movie_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'MovieAndCateg',
    }
  );
  return MovieAndCateg;
};
