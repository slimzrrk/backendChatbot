module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DiscountCourse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    discount_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'discount_courses',
    timestamps: false
  });
};