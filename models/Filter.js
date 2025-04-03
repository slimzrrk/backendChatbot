module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Filter', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: DataTypes.INTEGER
  }, {
    tableName: 'filters',
    timestamps: false
  });
};