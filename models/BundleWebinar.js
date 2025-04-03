module.exports = (sequelize, DataTypes) => {
  return sequelize.define('BundleWebinar', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator_id: DataTypes.INTEGER,
    bundle_id: DataTypes.INTEGER,
    webinar_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    tableName: 'bundle_webinars',
    timestamps: false
  });
};