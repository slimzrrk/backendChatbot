module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Document', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(200),
    nombre_page: DataTypes.INTEGER,
    pdf: DataTypes.TEXT,
    manuel_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    "3d_path_teacher": DataTypes.STRING(255),
    "3d_path_enfant": DataTypes.STRING(255)
  }, {
    tableName: 'documents',
    timestamps: false
  });
};