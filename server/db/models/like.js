'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Dashboard }) {
      this.belongsTo(Dashboard, {
        foreignKey: 'user_id',
      });

      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
    }
  }
  Like.init(
    {
      board_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
