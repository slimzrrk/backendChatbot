module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Discount', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator_id: DataTypes.INTEGER,
    title: DataTypes.STRING(255),
    discount_type: DataTypes.ENUM('percentage', 'fixed_amount'),
    source: DataTypes.ENUM('all', 'course', 'category', 'meeting', 'product'),
    code: DataTypes.STRING(64),
    percent: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    max_amount: DataTypes.INTEGER,
    minimum_order: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    user_type: DataTypes.ENUM('all_users', 'special_users'),
    product_type: DataTypes.ENUM('all', 'physical', 'virtual'),
    for_first_purchase: DataTypes.BOOLEAN,
    status: DataTypes.ENUM('active', 'disable'),
    expired_at: DataTypes.INTEGER,
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'discounts',
    timestamps: false
  });
};