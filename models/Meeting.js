module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Meeting', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teacher_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    group_meeting: DataTypes.BOOLEAN,
    online_group_min_student: DataTypes.INTEGER,
    online_group_max_student: DataTypes.INTEGER,
    online_group_amount: DataTypes.INTEGER,
    disabled: DataTypes.BOOLEAN,
    created_at: DataTypes.INTEGER,
    discount_start_date: DataTypes.BIGINT,
    discount_end_date: DataTypes.BIGINT
  }, {
    tableName: 'meetings',
    timestamps: false
  });
};