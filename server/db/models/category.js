const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie }) {
      this.belongsToMany(Movie, {
        through: 'MovieAndCateg',
        foreignKey: 'category_id',
      });
    }
  }
  Category.init({
    cat_name: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
