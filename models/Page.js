module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Page', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    link: DataTypes.STRING(255),
    name: DataTypes.STRING(255),
    robot: DataTypes.BOOLEAN,
    status: DataTypes.ENUM('publish', 'draft'),
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'pages',
    timestamps: false
  });
};