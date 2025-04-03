module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WebinarFilterOption', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    webinar_id: DataTypes.INTEGER,
    filter_option_id: DataTypes.INTEGER
  }, {
    tableName: 'webinar_filter_option',
    timestamps: false
  });
};