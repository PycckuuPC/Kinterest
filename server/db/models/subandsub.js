const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubAndSub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'idol_id' });
      this.belongsTo(User, { foreignKey: 'following_id' });
    }
  }
  SubAndSub.init({
    idol_id: DataTypes.INTEGER,
    following_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SubAndSub',
  });
  return SubAndSub;
};
