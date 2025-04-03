module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(64),
    caption: DataTypes.STRING(64),
    users_count: DataTypes.INTEGER,
    is_admin: DataTypes.BOOLEAN,
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'roles',
    timestamps: false
  });
};