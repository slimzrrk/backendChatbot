module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SchoolLevel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(255),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'school_levels',
    timestamps: false
  });
};