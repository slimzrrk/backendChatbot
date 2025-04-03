module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MeetingFile', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    meeting_id: DataTypes.INTEGER,
    file_path: DataTypes.STRING(255),
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT
  }, {
    tableName: 'meeting_files',
    timestamps: false
  });
};