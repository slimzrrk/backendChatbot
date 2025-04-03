module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Manuel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(200),
    material_id: DataTypes.INTEGER,
    logo: DataTypes.STRING(64),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    opt_id: DataTypes.INTEGER
  }, {
    tableName: 'manuels',
    timestamps: false
  });
};