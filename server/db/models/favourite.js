const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Dashboard }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });

      this.belongsTo(Dashboard, {
        foreignKey: 'board_id',
      });
    }
  }
  Favourite.init(
    {
      user_id: DataTypes.INTEGER,
      board_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Favourite',
    }
  );
  return Favourite;
};
