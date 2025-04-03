module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Material', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(200),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    section_id: DataTypes.INTEGER
  }, {
    tableName: 'materials',
    timestamps: false
  });
};