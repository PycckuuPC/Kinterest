const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dashboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie, User, Comment }) {
      this.belongsToMany(Movie, {
        through: 'DashboardAndMovie',
        foreignKey: 'board_id',
      });
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(User, {
        through: 'Favourite',
        foreignKey: 'board_id',
      });
      this.hasMany(Comment, {
        foreignKey: 'board_id',
      });
    }
  }
  Dashboard.init({
    board_name: DataTypes.STRING,
    about: DataTypes.TEXT,
    movies: DataTypes.TEXT,
    private: DataTypes.BOOLEAN,
    count_likes: DataTypes.INTEGER,
    count_fav: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Dashboard',
  });
  return Dashboard;
};
