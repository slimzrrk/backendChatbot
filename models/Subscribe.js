module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Subscribe', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usable_count: DataTypes.INTEGER,
    days: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    icon: DataTypes.STRING(255),
    is_popular: DataTypes.BOOLEAN,
    infinite_use: DataTypes.BOOLEAN,
    created_at: DataTypes.INTEGER,
    level_id: DataTypes.INTEGER
  }, {
    tableName: 'subscribes',
    timestamps: false
  });
};