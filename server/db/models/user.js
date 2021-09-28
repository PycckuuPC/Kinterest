const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Dashboard, Comment }) {
      this.belongsToMany(Dashboard, {
        through: 'Favourite',
        foreignKey: 'user_id',
      });
      this.hasMany(Dashboard, { foreignKey: 'user_id' });
      this.hasMany(Comment, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(this, { through: 'SubAndSubs', as: 'idol', foreignKey: 'idol_id' });
      this.belongsToMany(this, { through: 'SubAndSubs', as: 'following', foreignKey: 'following_id' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      img: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
