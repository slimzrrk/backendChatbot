module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WebinarExtraDescription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator_id: DataTypes.INTEGER,
    webinar_id: DataTypes.INTEGER,
    type: DataTypes.ENUM('learning_materials', 'company_logos', 'requirements'),
    order: DataTypes.INTEGER,
    created_at: DataTypes.BIGINT
  }, {
    tableName: 'webinar_extra_descriptions',
    timestamps: false
  });
};