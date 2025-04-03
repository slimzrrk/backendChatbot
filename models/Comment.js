module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    review_id: DataTypes.INTEGER,
    webinar_id: DataTypes.INTEGER,
    bundle_id: DataTypes.INTEGER,
    blog_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_review_id: DataTypes.INTEGER,
    reply_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    status: DataTypes.ENUM('pending', 'active'),
    report: DataTypes.BOOLEAN,
    disabled: DataTypes.BOOLEAN,
    created_at: DataTypes.INTEGER,
    viewed_at: DataTypes.INTEGER
  }, {
    tableName: 'comments',
    timestamps: false
  });
};