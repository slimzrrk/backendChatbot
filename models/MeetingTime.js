module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MeetingTime', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    meeting_id: DataTypes.INTEGER,
    day_label: DataTypes.ENUM('saturday','sunday','monday','tuesday','wednesday','thursday','friday'),
    level_id: DataTypes.INTEGER,
    matiere_id: DataTypes.INTEGER,
    min_students: DataTypes.INTEGER,
    max_students: DataTypes.INTEGER,
    meet_date: DataTypes.BIGINT,
    created_at: DataTypes.BIGINT,
    start_time: DataTypes.INTEGER,
    end_time: DataTypes.INTEGER,
    submaterial_id: DataTypes.INTEGER
  }, {
    tableName: 'meeting_times',
    timestamps: false
  });
};