module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WebinarReview', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator_id: DataTypes.INTEGER,
    webinar_id: DataTypes.INTEGER,
    bundle_id: DataTypes.INTEGER,
    content_quality: DataTypes.INTEGER,
    instructor_skills: DataTypes.INTEGER,
    purchase_worth: DataTypes.INTEGER,
    support_quality: DataTypes.INTEGER,
    rates: DataTypes.CHAR(10),
    description: DataTypes.TEXT,
    created_at: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'active')
  }, {
    tableName: 'webinar_reviews',
    timestamps: false
  });
};